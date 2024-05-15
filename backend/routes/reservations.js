const express = require("express");
const verifyJwtToken = require("../middlewares/authMiddleware");
const {
  newReservation,
  getAuthorReservations,
  getAllReservations,
  getStripePublishableKey,
  createPaymentIntent,
  getUsersBooking,
} = require("../controllers/reservationController");

const router = express.Router();

// Configure the stripe payment gateway key
router.get("/config-stripe", getStripePublishableKey);

// Booking of the room
router.post("/book-room", verifyJwtToken, newReservation);

// Get author reservations
router.post("/get-author-reservations", verifyJwtToken, getAuthorReservations);

// Get all reservations
router.post("/get-reservations", getAllReservations);

// Create the payment Intent
router.post("/create-payment-intent", createPaymentIntent);

// Get the booking list for the user -> student and bachlor's
router.post("/bookings", verifyJwtToken, getUsersBooking);

module.exports = router;
