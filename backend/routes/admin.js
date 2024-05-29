const express = require("express");
const verifyJwtToken = require("../middlewares/authMiddleware");
const verifyAdmin = require("../middlewares/verifyAdmin");
const { get } = require("mongoose");
const {
  getUnverifiedDocuments,
  verifyDocuments,
} = require("../controllers/adminController");
const router = express.Router();

router.post(
  "/unverified-documents",
  verifyJwtToken,
  verifyAdmin,
  getUnverifiedDocuments
);

router.post(
  "/verify-document/:userId",
  verifyJwtToken,
  verifyAdmin,
  verifyDocuments
);

module.exports = router;
