const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema(
  {
    listingId: {
      type: String,
    },
    authorId: {
      type: String,
    },
    checkIn: {
      type: String,
    },
    checkOut: {
      type: String,
    },
    nightStaying: {
      type: Number,
    },
    guestNumber: {
      type: Number,
    },
    basePrice: {
      type: Number,
    },
    taxes: {
      type: Number,
    },
    authorEarnedPrice: {
      type: Number,
    },
    orderId: {
      type: Number,
    },
  },
  {
    timestamps: { createAt: "created_at", updatedAt: "updated_at" },
  }
);

const reservation = mongoose.model("reservation", reservationSchema);

module.exports = reservation;
