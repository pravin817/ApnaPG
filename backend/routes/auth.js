const express = require("express");
const {
  signup,
  login,
  refreshToken,
  checkEmail,
  postUser,
  logOutUser,
  getUserDetails,
  uploadProfileImage,
  userToHost,
  userProfileDetails,
  userProfileAbout,
  verifyGovernmentId,
  verifyEmail,
  verifyPhoneNumber,
  generateOtpCodeForMobile,
  generateOtpCodeForEmail,
} = require("../controllers/authController");
const verifyJwtToken = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/sign-up", signup);
router.post("/log-in", login);
router.post("/logout", verifyJwtToken, logOutUser);
router.post("/verify-government-document", verifyJwtToken, verifyGovernmentId);
router.post("/verify-email", verifyJwtToken, verifyEmail);
router.post("/verify-phone", verifyJwtToken, verifyPhoneNumber);
router.post("/get-user-details", verifyJwtToken, getUserDetails);
router.post("/post", verifyJwtToken, postUser);
router.post("/uploadImage", verifyJwtToken, uploadProfileImage);
router.post("/become-a-host", verifyJwtToken, userToHost);

// Security - User Account verification
router.post(
  "/mobile/generate-otp-code",
  verifyJwtToken,
  generateOtpCodeForMobile
);

router.post("/mobile/verify-otp-code", verifyJwtToken, verifyPhoneNumber);

router.post(
  "/email/generate-otp-code",
  verifyJwtToken,
  generateOtpCodeForEmail
);

router.post("/email/verify-otp-code", verifyJwtToken, verifyEmail);

router.post("/refresh-token", refreshToken);
router.post("/check-email", checkEmail);
router.post("/profile-details", verifyJwtToken, userProfileDetails);
router.post("/profile-details-about", verifyJwtToken, userProfileAbout);
module.exports = router;
