const User = require("../models/user.model");
const {
  governmentDocumentVerificationStatus,
} = require("../utils/mail/Documents/governmentDocumentVerificationStatus");
// const { governmentDocumentVerificationStatus } = require("../utils/mail/Documents/documentVerificationStatus");

const getUnverifiedDocuments = async (req, res) => {
  try {
    const users = await User.find({
      "governmentDocumentVerification.verified": false,
    });

    if (!users) {
      return res.status(404).json({
        message: "No unverified documents found",
        success: false,
      });
    }

    res.status(200).json({
      message: "Unverified documents found",
      success: true,
      users,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: err.message,
    });
  }
};

const verifyDocuments = async (req, res) => {
  try {
    const { userId } = req.params;
    const { verified } = req.body;

    console.log(req.params);

    console.log(userId);

    if (!userId) {
      return res.status(400).json({
        message: "Please provide the userId",
        success: false,
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    if (verified) {
      message = "Document verified successfully";
      user.governmentDocumentVerification.verified = true;
      await user.save();
      governmentDocumentVerificationStatus(user, "verified");
    } else {
      message = "Document rejected";
      user.governmentDocumentVerification.verified = false;
      await user.save();
      governmentDocumentVerificationStatus(
        user,
        "rejected. please upload the clear document again.for the verification, once the verification is done you will be notified."
      );
    }

    res.status(200).json({
      message: message,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};

module.exports = {
  getUnverifiedDocuments,
  verifyDocuments,
};
