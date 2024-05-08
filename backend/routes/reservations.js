const express = require("express");
const verifyJwtToken = require("../middlewares/authMiddleware");
const {
  newReservation,
  getAuthorReservations,
  getAllReservations,
  getStripePublishableKey,
  createPaymentIntent,
} = require("../controllers/reservationController");

const router = express.Router();

// Configure the stripe payment gateway key
router.get("/config-stripe", getStripePublishableKey);

// Booking of the room
router.post("/book-room", verifyJwtToken, newReservation);

// Get author reservations
router.get("/get-author-reservations", verifyJwtToken, getAuthorReservations);

// Get all reservations
router.get("/get-reservations", getAllReservations);

// Create the payment Intent
router.post("/create-payment-intent", createPaymentIntent);

module.exports = router;
