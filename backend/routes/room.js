const express = require("express");
const {
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
  saveSecurity,
  publishRoom,
  savePrices,
  addToWishlist,
  removeFromWishlist,
} = require("../controllers/roomController");

const verifyJwtToken = require("../middlewares/authMiddleware");

const router = express.Router();

// Common User Routes
// Get the list of all rooms || GET
router.get("/get-all-listing", getAllListing);

// Get the single room || POST
router.post("/room-details", getOneListing);

// Get the listing of rooms based on category || POST
router.post("/get-listing-by-cat", getListingDataByCat);

// Routes for the Room Owner

// Get Room details || POST
router.post("/get-room-details", verifyJwtToken, getRoomDetails);

// Save the room structure || POST
router.post("/save-structure", verifyJwtToken, saveRoomStructure);

// Save the privacyType || POST
router.post("/save-privacy-type", verifyJwtToken, savePrivacyType);

// Save the room location || POST
router.post("/save-room-location", verifyJwtToken, saveRoomLocation);

// Save the room floor plan || POST
router.post("/save-floor-plan", verifyJwtToken, saveFloorPlan);

// Save the room amenities || POST
router.post("/save-amenities", verifyJwtToken, saveAmenities);

// Save the room photos || POST
router.post("/save-photos", verifyJwtToken, savePhotos);

// Save the title of the Room || POST
router.post("/save-title", verifyJwtToken, saveTitle);

// Save the description of the Room || POST
router.post("/save-description", verifyJwtToken, saveDescription);

// Save the highlight of the room || POST
router.post("/save-highlight", verifyJwtToken, saveHighlight);

// Save the guest type for the room || POST
router.post("/save-guest-type", verifyJwtToken, saveGuestType);

// Save the base price for the room || POST
router.post("/save-prices", verifyJwtToken, savePrices);

// Save the additional security for the room || POST
router.post("/save-security", verifyJwtToken, saveSecurity);

// Publish the room || POST
router.post("/publish-room", verifyJwtToken, publishRoom);

// Add room to wishlist
router.post("/add-to-wishlist", verifyJwtToken, addToWishlist);

// Remove the room from the wishlist
router.post("/remove-from-wishlist", verifyJwtToken, removeFromWishlist);

module.exports = router;
