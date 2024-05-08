const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const morgan = require("morgan");

const auth = require("./routes/auth");
const room = require("./routes/room");
const reservations = require("./routes/reservations");

const app = express();

// configure the dotenv
dotenv.config();

// MongoDB connection
connectDB();

//parse the data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

// routes
app.use("/api/v1/auth", auth);
app.use("/api/v1/room", room);
app.use("/api/v1/reservations", reservations);

// get the PORT
const PORT = process.env.PORT || 8080;

// listen
app.listen(PORT, () => {
  console.log(`The server is running of the PORT : ${PORT}`);
});
