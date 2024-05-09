const mongoose = require("mongoose");
const Room = require("../models/room.model");
const User = require("../models/user.model");

// Get the list of all Listings
const getAllListing = async (req, res) => {
  console.log("Get all listing hit");
  try {
    const data = await Room.find({});

    // Send only the required data
    const allListingData = data.filter((listing) => {
      return listing.status === "Complete" && listing.photos.length !== 0;
    });

    // check if the listing is empty
    if (allListingData.length === 0) {
      return res.status(404).json({
        message: "No listings found",
        success: true,
      });
    }

    res.status(200).json({
      message: "All listing fetched successfully",
      success: true,
      allListingData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error while getting the list of all listings",
      success: false,
      error,
    });
  }
};

// Get the single room details || POST
const getOneListing = async (req, res) => {
  console.log("Get one listing hit");
  try {
    const payload = req.body;
    const listingId = payload.id;

    // console.log("The listing id", listingId);

    const findCriteria = {
      _id: new mongoose.Types.ObjectId(listingId),
    };

    const listingData = await Room.findById(findCriteria);

    if (!listingData) {
      return res.status(404).json({
        message: "No listing found",
        success: true,
      });
    }

    const findAuthorCriteria = {
      _id: new mongoose.Types.ObjectId(listingData.author),
    };

    const authorDetails = await User.findById(findAuthorCriteria);

    if (!authorDetails) {
      return res.status(404).json({
        message: "No author found",
        success: true,
      });
    }

    res.status(200).json({
      message: "Single listing fetched successfully",
      success: true,
      listing: listingData,
      listingAuthor: authorDetails,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error while getting the single listing",
      success: false,
      error,
    });
  }
};

// Get the listing of rooms based on category || POST
const getListingDataByCat = async (req, res) => {
  console.log("Get listing by category hit");
  try {
    const payload = req.body;
    const category = payload.category;
    console.log("The category", category);

    const catBasedListing = await Room.find({
      roomType: {
        $eq: category,
      },
    });

    if (catBasedListing.length === 0) {
      return res.status(404).json({
        message: "No listing found based on category",
        success: true,
      });
    }

    res.status(200).json({
      message: "Listing fetched based on category",
      success: true,
      catBasedListing,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error while getting the list of listings by category",
      success: false,
      error,
    });
  }
};

// Controller for the User (Room Owner)

// Get the details of the room || POST
const getRoomDetails = async (req, res) => {
  console.log("Get room details hit");
  try {
    console.log("The user from the get Room Details", req.user);
    console.log(req.body);
    const payload = req.body;
    const roomId = payload.roomId;

    if (!roomId) {
      return res.status(400).json({
        message: "Room Id is required",
        success: false,
      });
    }

    const findCriteria = {
      _id: new mongoose.Types.ObjectId(roomId),
    };

    const roomDetails = await Room.findById(findCriteria);

    if (!roomDetails) {
      return res.status(404).json({
        message: "Room not found",
        success: false,
      });
    }

    res.status(200).json({
      message: "Room details fetched successfully",
      success: true,
      roomDetails,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error while getting the room details for Room Owner",
      success: false,
      error,
    });
  }
};

// Save the room structure || POST
const saveRoomStructure = async (req, res) => {
  console.log("Save room structure hit");
  try {
    const userId = req.user;
    const payload = req.body;
    const roomId = payload.roomId;
    const roomType = payload.roomType;

    // Find the user
    const findUserCriteria = {
      _id: new mongoose.Types.ObjectId(userId),
    };

    const userDetails = await User.findById(findUserCriteria);

    // Check if the user is host
    if (userDetails.role !== "host") {
      return res.status(403).json({
        message: "You are not authorized to save the room structure",
        success: false,
      });
    }

    // Find the room and update the structure
    const findRoomCriteria = {
      _id: new mongoose.Types.ObjectId(roomId),
    };

    if (roomType !== undefined) {
      const roomDetails = await Room.findOneAndUpdate(
        findRoomCriteria,
        { roomType },
        { new: true }
      );

      res.status(200).json({
        message: "Room structure saved successfully",
        success: true,
        roomDetails,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error while saving the room structure",
      success: false,
      error,
    });
  }
};

// Save the room privacy Type || POST
const savePrivacyType = async (req, res) => {
  console.log("Save privacy type hit");
  try {
    const userId = req.user;
    const payload = req.body;
    const roomId = payload.roomId;
    const privacyType = payload.privacyType;

    // Find the room and update the privacy type
    const findRoomCriteria = {
      _id: new mongoose.Types.ObjectId(roomId),
    };

    if (privacyType !== undefined) {
      const roomDetails = await Room.findOneAndUpdate(
        findRoomCriteria,
        { privacyType },
        { new: true }
      );

      res.status(200).json({
        message: "Room privacy type saved successfully",
        success: true,
        roomDetails,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error while updating the room privacy type",
      success: false,
      error,
    });
  }
};

// Save the room Location || POST
const saveRoomLocation = async (req, res) => {
  console.log("Save room location hit");
  try {
    const payload = req.body;
    const roomId = payload.roomId;
    const location = payload.location;

    const findRoomCriteria = {
      _id: new mongoose.Types.ObjectId(roomId),
    };

    if (location !== undefined) {
      const roomDetails = await Room.findOneAndUpdate(
        findRoomCriteria,
        { location },
        { new: true }
      );

      res.status(200).json({
        message: "Room location saved successfully",
        success: true,
        roomDetails,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error while saving the room location",
      success: false,
      error,
    });
  }
};

// Save the room floor plan || POST
const saveFloorPlan = async (req, res) => {
  console.log("Save floor plan hit");
  try {
    const payload = req.body;
    const roomId = payload.roomId;
    const floorPlan = payload.floorPlan;

    console.log("The floor plan", payload);

    // define the room finding criteria
    const findRoomCriteria = {
      _id: new mongoose.Types.ObjectId(roomId),
    };

    // Update the room and save the floor plan
    if (floorPlan !== undefined) {
      const roomDetails = await Room.findOneAndUpdate(
        findRoomCriteria,
        { floorPlan },
        { new: true }
      );

      res.status(200).json({
        message: "Room floor plan saved successfully",
        success: true,
        roomDetails,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error while saving the room floor plan",
      success: false,
      error,
    });
  }
};

// Save the room amenities || POST
const saveAmenities = async (req, res) => {
  console.log("Save amenities hit");
  try {
    const payload = req.body;
    const roomId = payload.roomId;
    const amenitiesData = payload.amenities;

    console.log("The amenities", payload);

    const findRoomCriteria = {
      _id: new mongoose.Types.ObjectId(roomId),
    };

    const updateCriteria = {
      amenities: amenitiesData,
    };

    // Update the room and save the amenities
    if (amenitiesData !== undefined) {
      console.log("The amenities data inside", amenitiesData);
      const roomDetails = await Room.findOneAndUpdate(
        findRoomCriteria,
        updateCriteria,
        { new: true }
      );
      res.status(200).json({
        message: "Room amenities saved successfully",
        success: true,
        roomDetails,
      });
    } else {
      return res
        .status(400)
        .json({ message: "Amenities are required", success: false });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error while saving the room amenities",
      success: false,
      error,
    });
  }
};

// Save the room photos || POST
const savePhotos = async (req, res) => {
  console.log("Save photos hit");
  try {
    const payload = req.body;
    const roomId = payload.roomId;
    const photos = payload.photos;

    const findCriteria = {
      _id: new mongoose.Types.ObjectId(roomId),
    };

    // Update the room and photos
    const roomDetails = await Room.findOneAndUpdate(
      findCriteria,
      { photos },
      { new: true }
    );

    res.status(200).json({
      message: "Room photos saved successfully",
      success: true,
      roomDetails,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error while saving the room photos",
      success: false,
      error,
    });
  }
};

// Save the title for the room || POST
const saveTitle = async (req, res) => {
  console.log("Save title hit");
  try {
    const payload = req.body;
    const roomId = payload.roomId;
    const title = payload.title;

    if (!title) {
      return res.status(400).json({
        message: "Title is required",
        success: false,
      });
    }

    const findCriteria = {
      _id: new mongoose.Types.ObjectId(roomId),
    };

    // update the room and save the title
    const roomDetails = await Room.findOneAndUpdate(
      findCriteria,
      { title },
      { new: true }
    );

    res.status(200).json({
      message: "Room title saved successfully",
      success: true,
      roomDetails,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error while saving the room title",
      success: false,
      error,
    });
  }
};

// Save the description for the room || POST
const saveDescription = async (req, res) => {
  console.log("Save description hit");
  try {
    console.log("The description", req.body);
    const payload = req.body;
    const roomId = payload.roomId;
    const description = payload.description;

    if (!description) {
      return res.status(400).json({
        message: "Description is required",
        success: false,
      });
    }

    const findCriteria = {
      _id: new mongoose.Types.ObjectId(roomId),
    };

    // Update the room and save the description
    const roomDetails = await Room.findOneAndUpdate(
      findCriteria,
      { description },
      { new: true }
    );

    res.status(200).json({
      message: "Room description saved successfully",
      success: true,
      roomDetails,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error while saving the room description",
      success: false,
      error,
    });
  }
};

// Save the room highlight || POST
const saveHighlight = async (req, res) => {
  console.log("Save highlight hit");
  try {
    const payload = req.body;
    const roomId = payload.roomId;
    const highlightData = payload.highlight;
    console.log("The highlight", payload);

    const findCriteria = {
      _id: new mongoose.Types.ObjectId(roomId),
    };

    const updateCriteria = {
      highlight: highlightData,
    };

    // Update the room and save the amenities
    if (highlightData !== undefined) {
      console.log("The highlight data inside", highlightData);
      const roomDetails = await Room.findOneAndUpdate(
        findCriteria,
        updateCriteria,
        { new: true }
      );
      res.status(200).json({
        message: "Room highlight saved successfully",
        success: true,
        roomDetails,
      });
    } else {
      return res.status(400).json({
        message: "Room highlight are required",
        success: false,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error while saving the room highlight",
      success: false,
      error,
    });
  }
};

// Save the guest type for the room || POST
const saveGuestType = async (req, res) => {
  console.log("Save guest type hit");
  try {
    const payload = req.body;
    const roomId = payload.roomId;
    const guestType = payload.guestType;

    const findCriteria = {
      _id: new mongoose.Types.ObjectId(roomId),
    };

    // Update the room and save the guest type
    const roomDetails = await Room.findOneAndUpdate(
      findCriteria,
      {
        guestType,
      },
      {
        new: true,
      }
    );

    res.status(200).json({
      message: "Room guest type saved successfully",
      success: true,
      roomDetails,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error while saving the guest type",
      success: false,
      error,
    });
  }
};

// Save the base price for the room || POST
const savePrices = async (req, res) => {
  console.log("Save prices hit");
  try {
    const payload = req.body;
    const roomId = payload.roomId;
    const basePrice = payload.basePrice;
    const priceBeforeTaxes = payload.priceBeforeTaxes;
    const authorEarnedPrice = payload.authorEarnedPrice;

    if (!basePrice) {
      return res.status(400).json({
        message: "Base price for the room is required",
        success: false,
      });
    }

    const findCriteria = {
      _id: new mongoose.Types.ObjectId(roomId),
    };

    // Update the room and save the base price
    const roomDetails = await Room.findOneAndUpdate(
      findCriteria,
      { basePrice, priceBeforeTaxes, authorEarnedPrice },
      { new: true }
    );

    res.status(200).json({
      message: "Room base price saved successfully",
      success: true,
      roomDetails,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error while saving the base price",
      success: false,
      error,
    });
  }
};

// Save the additional security for the room || POST
const saveSecurity = async (req, res) => {
  console.log("Save security hit");
  try {
    const payload = req.body;
    const roomId = payload.roomId;
    const security = payload.security;

    const findCriteria = {
      _id: new mongoose.Types.ObjectId(roomId),
    };

    // Update the room and save the room additional security
    const roomDetails = await Room.findOneAndUpdate(
      findCriteria,
      { security },
      { new: true }
    );

    res.status(200).json({
      message: "Room security saved successfully",
      success: true,
      roomDetails,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error while saving the security",
      success: false,
      error,
    });
  }
};

// Publish the room || POST
const publishRoom = async (req, res) => {
  console.log("Publish room hit");
  try {
    const payload = req.body;
    const roomId = payload.roomId;

    const findCriteria = {
      _id: new mongoose.Types.ObjectId(roomId),
    };

    // Update the status of thr room from the "pending" to the "complete"
    const roomDetails = await Room.findOneAndUpdate(
      findCriteria,
      { status: "Complete" },
      { new: true }
    );

    res.status(200).json({
      message: "Room published successfully",
      success: true,
      roomDetails,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error while publishing the room",
      success: false,
      error,
    });
  }
};

module.exports = {
  getAllListing,
  getOneListing,
  getListingDataByCat,
  getRoomDetails,
  saveRoomStructure,
  savePrivacyType,
  saveRoomLocation,
  saveFloorPlan,
  saveAmenities,
  savePhotos,
  saveTitle,
  saveDescription,
  saveHighlight,
  saveGuestType,
  savePrices,
  saveSecurity,
  publishRoom,
};
