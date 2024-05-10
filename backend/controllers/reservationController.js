require("dotenv").config();
const mongoose = require("mongoose");
const reservation = require("../models/reservation.model");
const Room = require("../models/room.model");
const {
  sendRoomBookingInvoice,
} = require("../utils/mail/sendRoomBookingInvoice");
const User = require("../models/user.model");

// stripe controller & payment process
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Get the stripe publishable key
const getStripePublishableKey = async (req, res) => {
  res.send({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  });
};

// Create the payment Intent
const createPaymentIntent = async (req, res) => {
  try {
    console.log("hit, payment");
    const payload = req.body;
    console.log(payload);
    const paymentIntent = await stripe.paymentIntents.create({
      currency: "USD",
      amount: 1999,
      automatic_payment_methods: { enabled: true },
    });

    // Send publishable key and PaymentIntent details to client
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (e) {
    return res.status(400).send({
      error: {
        message: e.message,
      },
    });
  }
};

// Book the new room
const newReservation = async (req, res) => {
  try {
    const payload = req.body;
    const userId = req.user;

    const listingId = payload.listingId;
    const authorId = payload.authorId;
    const guestNumber = payload.guestNumber;
    const checkIn = payload.checkIn;
    const checkOut = payload.checkOut;
    const nightStaying = payload.nightStaying;
    const orderId = payload.orderId;

    // find the user
    const user = await User.findById(userId);

    if (!user) {
      res.status(404).json({
        message: "User not found",
        status: false,
      });
    }

    // console.log("The user is: ", user);

    // Find the listing details
    const findCriteria = {
      _id: new mongoose.Types.ObjectId(listingId),
    };

    const listingDetails = await Room.findById(findCriteria);

    const basePrice = parseInt(listingDetails.basePrice);
    const tax = Math.round((parseInt(basePrice) * 14) / 100);
    const authorEarnedPrice =
      basePrice - Math.round((parseInt(basePrice) * 3) / 100);

    // save the reservation
    let newReservation = {
      listingId: listingId,
      authorId: authorId,
      guestNumber: parseInt(guestNumber),
      checkIn: checkIn,
      checkOut: checkOut,
      nightStaying: parseInt(nightStaying),
      basePrice: basePrice,
      taxes: tax,
      authorEarnedPrice: authorEarnedPrice,
      orderId: orderId,
    };

    const findSavedLisingReservation = await reservation.find({
      listingId: listingId,
    });

    const listing = findSavedLisingReservation.map((reservation, i) => {
      return reservation.checkIn === checkIn;
    });

    if (!listing.includes(true)) {
      const saveReservation = new reservation(newReservation).save();

      console.log("The room details is: ", listingDetails);
      console.table([guestNumber, checkIn, checkOut, nightStaying, orderId,tax]);
      await sendRoomBookingInvoice(
        user,
        listingDetails,
        guestNumber,
        checkIn,
        checkOut,
        nightStaying,
        orderId,
        basePrice,
        tax,
      );
      res.status(200).json({
        message: "Payment confirmed.",
        success: true,
        data: saveReservation,
      });
    } else {
      res.status(404).send("Something went wrong try again later.");
    }
  } catch (error) {
    console.log(error);
    res.status(200).json({
      message: "Error in booking the room",
      error: error,
      status: false,
    });
  }
};

// Get the author reservations
const getAuthorReservations = async (req, res) => {
  try {
    // From the middleware
    const userId = req.user;

    const findCriteria = {
      authorId: userId,
    };

    // Get the list of the Author reservations
    const authorReservation = await reservation.find(findCriteria);

    if (!authorReservation) {
      res.status(404).json({
        message: "No reservations found for the author",
        status: false,
      });
    }

    res.status(200).json({
      message: "Author reservations list",
      data: authorReservation,
      status: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error in getting the author reservations",
      error: error,
      status: false,
    });
  }
};

// Get all reservations
const getAllReservations = async (req, res) => {
  try {
    const payload = req.body;
    const listingId = payload.id;

    console.log("The req body from the get-reservations: ", req.body);

    const findCriteria = {
      listingId: listingId,
    };

    const reservations = await reservation.find(findCriteria);

    console.log("The reservations are: ", reservations);

    if (!reservations) {
      res.status(404).json({
        message: "No reservations found",
        status: false,
      });
    }

    res.status(200).json({
      message: "All reservations list",
      data: reservations,
      status: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error while getting all reservations",
      error: error,
      status: false,
    });
  }
};

module.exports = {
  getStripePublishableKey,
  createPaymentIntent,
  newReservation,
  getAuthorReservations,
  getAllReservations,
};
