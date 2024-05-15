const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema(
  {
    listingId: {
      type: String,
    },
    authorId: {
      type: String,
    },
    bookBy: {
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
    totalBase: {
      type: Number,
    },
    totalTax: {
      type: Number,
    },
    totalPaid: {
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

const Reservation = mongoose.model("reservation", reservationSchema);

module.exports = Reservation;
