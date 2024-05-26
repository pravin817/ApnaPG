require("dotenv").config();
const mongoose = require("mongoose");
const reservation = require("../models/reservation.model");
const Room = require("../models/room.model");
const {
  sendRoomBookingInvoice,
} = require("../utils/mail/sendRoomBookingInvoice");
const User = require("../models/user.model");
const Reservation = require("../models/reservation.model");

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

// Book a room
const newReservation = async (req, res) => {
  try {
    const payload = req.body;
    const userId = req.user;

    const {
      listingId,
      authorId,
      guestNumber,
      checkIn,
      checkOut,
      nightStaying,
      orderId,
    } = payload;

    // Find the user
    const user = await User.findById(userId);

    if (!user) {
      return res.status(200).json({
        message: "User not found",
        success: false,
      });
    }

    // If the author and the user are the same
    if (userId === authorId) {
      return res.status(200).json({
        message: "You can't book your own listing",
        success: false,
      });
    }
    // Find the listing details
    const listingDetails = await Room.findById(listingId);
    if (!listingDetails) {
      return res.status(404).json({
        message: "Listing details not found",
        success: false,
      });
    }

    const basePrice = parseInt(listingDetails.basePrice);
    const tax = Math.round((basePrice * 14) / 100);
    const authorEarnedPrice = basePrice - Math.round((basePrice * 3) / 100);

    const totalBase = basePrice * guestNumber * nightStaying;
    const totalTax = (totalBase * 14) / 100;
    const totalPaid = totalBase + totalTax;

    // Save the reservation
    const existingReservation = await Reservation.findOne({
      listingId: listingId,
      checkIn: checkIn,
    });

    if (existingReservation) {
      return res.status(400).json({
        message: "Reservation for this date already exists",
        success: false,
      });
    }

    const newReservation = new Reservation({
      listingId,
      authorId,
      bookBy: userId,
      guestNumber: parseInt(guestNumber),
      checkIn,
      checkOut,
      nightStaying: parseInt(nightStaying),
      basePrice,
      taxes: tax,
      totalBase,
      totalTax,
      totalPaid,
      authorEarnedPrice,
      orderId,
    });

    const savedReservation = await newReservation.save();

    const returnReservation = await Reservation.find({});

    console.log("Reservation successfully saved:", savedReservation);
    // Send booking invoice
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
      totalPaid,
      totalBase,
      totalTax
    );

    res.status(200).json({
      message: "Reservation successfully created.",
      success: true,
      data: savedReservation,
    });
  } catch (error) {
    console.error("Error in booking the room:", error);
    res.status(500).json({
      message: "Error in booking the room",
      error: error.message,
      success: false,
    });
  }
};

// cancel reservation
const cancelReservation = async (req, res) => {
  try {
    const userId = req.user;
    const payload = req.body;
    const reservationId = payload.id;

    console.log("The reservation id is: ", reservationId);

    const reservation = await Reservation.findById(reservationId);
    console.log("The reservation is: ", reservation);

    if (!reservation) {
      return res.status(404).json({
        message: "Reservation not found",
        success: false,
      });
    }

    if (reservation.bookBy !== userId) {
      return res.status(401).json({
        message: "You are not authorized to cancel this reservation",
        success: false,
      });
    }

    const reservationTime = reservation.reservationTime;
    const currentTime = new Date();
    const timeDiff = Math.abs(currentTime - reservationTime);

    if (timeDiff > 21600000) {
      return res.status(400).json({
        message: "You can't cancel booking after 6 hours of reservation",
        success: false,
      });
    }

    reservation.status = "cancelled";
    await reservation.save();

    res.status(200).json({
      message: "Reservation successfully canceled",
      success: true,
    });
  } catch (error) {
    console.error("Error in canceling the reservation:", error);
    res.status(500).json({
      message: "Error in canceling the reservation",
      error: error.message,
      success: false,
    });
  }
};

// Get the author reservations
const getAuthorReservations = async (req, res) => {
  try {
    // From the middleware
    const userId = req.user;

    console.log("The user id from the get-author-reservations: ", userId);

    const findCriteria = {
      authorId: userId,
    };

    // Get the list of the Author reservations
    const authorReservation = await Reservation.find(findCriteria);

    console.log("The author reservations are: ", authorReservation);
    if (!authorReservation) {
      res.status(404).json({
        message: "No reservations found for the author",
        success: false,
      });
    }

    res.status(200).json({
      message: "Author reservations list",
      data: authorReservation,
      success: true,
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
    const userId = req.user;
    const listingId = payload.id;

    const findCriteria = {
      listingId: listingId,
    };

    const reservations = await Reservation.find(findCriteria);

    console.log("The reservations are: ", reservations);

    if (!reservations) {
      res.status(404).json({
        message: "No reservations found",
        success: false,
      });
    }

    res.status(200).json({
      message: "All reservations list",
      reservations,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error while getting all reservations",
      error: error,
      success: false,
    });
  }
};

// Route to get bookings by user
const getUsersBooking = async (req, res) => {
  try {
    const userId = req.user;

    // Find bookings by user ID
    const bookings = await Reservation.find({ bookBy: userId });

    console.log("The bookings are: ", bookings);

    const bookingData = [];

    // If there are no bookings, return 404
    if (!bookings || bookings.length === 0) {
      return res.status(200).json({
        message: "Bookings not found",
        success: false,
      });
    }

    const len = bookings.length;
    console.log("The length of the bookings is: ", len);

    for (let i = 0; i < len; i++) {
      const listingId = bookings[i].listingId;
      const listingDetails = await Room.findById(listingId);

      console.log("The listing details are: ", listingDetails);

      const roomAuthor = bookings[i].authorId;
      const authorDetails = await User.findById(roomAuthor);

      bookingData.push({
        _id: bookings[i]._id.toString(),
        id: listingDetails._id.toString(),
        title: listingDetails.title,
        photos: listingDetails.photos[0],
        description: listingDetails.description,
        location: listingDetails.location,
        hostedBy:
          authorDetails.name.firstName + " " + authorDetails.name.lastName,
        hostMobileNo: "+91 " + authorDetails.mobileNo,
        hostEmail: authorDetails.emailId,
        checkIn: bookings[i].checkIn,
        checkOut: bookings[i].checkOut,
        nightStaying: bookings[i].nightStaying,
        guestNumber: bookings[i].guestNumber,
        basePrice: bookings[i].basePrice,
        taxes: bookings[i].taxes,
        totalPrice: bookings[i].basePrice + bookings[i].taxes,
        totalBase: bookings[i].totalBase,
        totalTax: bookings[i].totalTax,
        totalPaid: bookings[i].totalPaid,
        status: bookings[i].status,
      });
    }

    console.log("The booking data is: ", bookingData);

    // Return the list of bookings and user details
    res.status(200).json({
      message: "Booking data fetched successfully",
      success: true,
      booking: bookingData,
    });
  } catch (error) {
    console.error("Error getting bookings:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getStripePublishableKey,
  createPaymentIntent,
  newReservation,
  cancelReservation,
  getAuthorReservations,
  getAllReservations,
  getUsersBooking,
};
