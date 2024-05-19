const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema(
  {
    author: {
      type: String,
      // required: [true, "Author is required"],
    },
    status: {
      type: String,
      default: "In Progress",
    },
    showStatus: {
      type: String,
      default: "show",
    },
    roomType: {
      type: String,
      // required: [true, "Room type is required"],
    },
    privacyType: {
      type: String,
    },
    location: {
      addressLineOne: {
        type: String,
      },
      addressLineTwo: {
        type: String,
      },
      city: {
        type: {},
      },
      state: {
        type: {},
      },
      postCode: {
        type: String,
      },
      country: {
        type: {},
      },
    },
    floorPlan: {
      guests: {
        type: Number,
      },
      bedrooms: {
        type: Number,
      },
      beds: {
        type: Number,
      },
      bathRoomsNumber: {
        type: Number,
      },
    },
    amenities: {
      type: Array,
    },
    photos: {
      type: Array,
      // required: [true, "Photos are required"],
    },
    title: {
      type: String,
      // required: [true, "Title is required"],
    },
    description: {
      type: String,
      // required: [true, "Description is required"],
    },
    highlight: {
      type: Array,
    },
    visiblity: {
      type: String,
    },
    guestType: {
      type: String,
    },
    basePrice: {
      type: Number,
      // required: [true, "Base price is required"],
    },
    priceAfterTaxes: {
      type: Number,
    },
    authorEarnedPrice: {
      type: Number,
    },
    security: {
      type: Array,
    },
    ratings: {
      type: Number,
      default: null,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const Room = mongoose.model("Room", RoomSchema);

module.exports = Room;
