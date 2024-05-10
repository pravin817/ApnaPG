require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../models/user.model");
const Room = require("../models/room.model");
const { sendSMS } = require("../utils/SMS/sendSMS");
const { sendVerificationOTPEmail } = require("../utils/mail/sendOTPVerificationEmail");

const saltRounds = 10;
const daysToSeconds = 1 * 60 * 60; //   days * hours *  minutes *  seconds
const expirationTimeInSeconds = Math.floor(Date.now() / 1000) + daysToSeconds;

// Signup the user
const signup = async (req, res) => {
  try {
    const payload = req.body;
    console.log(payload);

    if (!payload.name) {
      return res.status(400).json({
        message: "Please provide the name",
        success: false,
      });
    }

    if (!payload.emailId) {
      return res.status(400).json({
        message: "Please provide the email address",
        success: false,
      });
    }

    if (!payload.mobileNo) {
      return res.status(400).json({
        message: "Please provide the mobile number",
        success: false,
      });
    }

    if (!payload.birthDate) {
      return res.status(400).json({
        message: "Please provide the birth date",
        success: false,
      });
    }

    // check if the mobile number is registered on the platform or not
    const userByMobileNumber = await User.findOne({
      mobileNo: payload.mobileNo,
    });

    if (userByMobileNumber) {
      return res.status(404).json({
        message: "Mobile number already exist",
        success: false,
      });
    }

    // Hashed the password before storing to the database
    const hashedPasword = await bcrypt.hash(payload.password, saltRounds);

    const userObj = {
      name: {
        firstName: payload.name.firstName,
        lastName: payload.name.lastName,
      },
      emailId: payload.emailId,
      mobileNo: payload.mobileNo,
      birthDate: payload.birthDate,
      password: hashedPasword,
    };

    const user = await User(userObj).save();

    const findCriteria = {
      emailId: payload.emailId,
    };

    const userDetails = await User.find(findCriteria);

    const accessToken = jwt.sign(
      {
        _id: userDetails[0]._id,
        role: userDetails[0].role,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: expirationTimeInSeconds }
    );
    const refreshToken = jwt.sign(
      { _id: userDetails[0]._id, role: userDetails[0].role },
      process.env.REFRESH_TOKEN_SECRET
    );

    const updatedUser = await User.findOneAndUpdate(
      findCriteria,
      { accessToken: accessToken, refreshToken: refreshToken },
      { new: true }
    );

    res.status(200).json({
      message: "Welcome to the ApanaPG.",
      success: true,
      accessToken: accessToken,
      refreshToken: refreshToken,
      user_details: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to signup the user. Please try again later.",
      success: false,
      error,
    });
  }
};

// login user
const login = async (req, res) => {
  const payload = req.body;
  const email = payload.email;
  const password = payload.password;

  console.log("login : ", payload);

  // define the finding criteria
  const findCriteria = {
    emailId: email,
  };

  // get the userDetails
  const userDetails = await User.find(findCriteria).limit(1).exec();

  try {
    const isMatched = await bcrypt.compare(password, userDetails[0].password);

    if (isMatched) {
      // generate the access token
      const accessToken = jwt.sign(
        {
          _id: userDetails[0]._id,
          role: userDetails[0].role,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: expirationTimeInSeconds }
      );

      // generate the refresh token
      const refreshToken = jwt.sign(
        { _id: userDetails[0]._id, role: userDetails[0].role },
        process.env.REFRESH_TOKEN_SECRET
      );

      const updatedUser = await User.findOneAndUpdate(
        findCriteria,
        { accessToken: accessToken, refreshToken: refreshToken },
        { new: true }
      );

      // Hide the password from the user details
      updatedUser.password = undefined;
      res.status(200).json({
        message: "User logged in successfully",
        success: true,
        accessToken: accessToken,
        refreshToken: refreshToken,
        user_details: updatedUser,
      });
    } else if (!isMatched) {
      res.status(401).json({
        message: "Invalid credentials",
        success: false,
      });
    } else {
      res.send("Not Allowed!!!");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to login the user. Please try again later.",
      success: false,
      error,
    });
  }
};

// generate the refresh token
const refreshToken = async (req, res) => {
  const refreshToken = req.body.refreshToken;

  // console.log(refreshToken);

  if (!refreshToken) {
    res.status(404).json({
      message: "Please log In",
      success: 0,
    });
  } else {
    // verify the refreshtoken
    try {
      let decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
      console.log(decoded);

      // Get the userId
      const userId = decoded._id;

      const findCriteria = {
        _id: new mongoose.Types.ObjectId(userId),
      };

      const userDetails = await User.findById(findCriteria);
      // console.log(userDetails.refreshToken, userDetails, "LINE 161");
      if (userDetails.refreshToken !== refreshToken) {
        return res.sendStatus(403);
      }

      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (error, user) => {
          if (error) {
            return res.sendStatus(401);
          }

          const accessToken = jwt.sign(
            {
              _id: userDetails._id,
              role: userDetails.role,
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "1hr" }
          );
          console.log(accessToken, "AccessToken");
          res.json({ accessToken: accessToken });
        }
      );
    } catch (error) {
      res.status(401).json({
        message: "Invalid refresh token",
        success: 0,
        error,
      });
    }
  }
};

// check email is already registered or not
const checkEmail = async (req, res) => {
  try {
    const payload = req.body;
    console.log(payload);

    const findCriteria = {
      emailId: payload.email,
    };

    const isEmailExist = await User.find(findCriteria);

    // console.log(isEmailExist);
    // console.log(typeof isEmailExist);

    if (isEmailExist.length !== 0) {
      res.status(200).json({
        message: "user Exist",
        success: true,
      });
    } else {
      res.status(200).json({
        message: "User Email not exist",
        success: false,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error while searching for the user",
      success: false,
      error,
    });
  }
};

// post route
const postUser = async (req, res) => {
  res.send(req.user);
};

// Logout the user
const logOutUser = async (req, res) => {
  const userId = req.user;
  console.log(userId);
  try {
    const userDetails = await User.updateOne(
      {
        _id: userId,
      },
      {
        $unset: {
          accessToken: "",
          refreshToken: "",
        },
      }
    );
    res.send("User logout successfully");
  } catch (error) {
    console.log("User logout Error :-> ", error);
    res.status(500).json({
      message: "Failed to logout the user. Please try again later.",
      success: false,
      error,
    });
  }
};

// Get the user Details
const getUserDetails = async (req, res) => {
  try {
    const userId = req.user;
    const findCriteria = {
      _id: new mongoose.Types.ObjectId(userId),
    };

    const userDetails = await User.findById(findCriteria);

    // return the list of the rooms that are hosted by the user (Room Owner)
    const roomsData = await Room.find({
      author: userId,
    });

    res.status(200).json({
      message: "User details found successfully",
      success: true,
      user_details: userDetails,
      room_data: roomsData,
    });
  } catch (error) {
    console.log("Error while getting the user details :-> ", error);
  }
};

// Verify the user government ID
const verifyGovernmentId = async (req, res) => {
  console.log("Hit the verify government ID route", req.body);
  try {
    const payload = req.body;
    const userId = payload.user;

    const findCriteria = {
      _id: new mongoose.Types.ObjectId(userId),
    };

    const userDetails = await User.findByIdAndUpdate(
      findCriteria,
      {
        isGovernmentIdVerified: true,
      },
      {
        new: true,
      }
    );
    res.status(200).json({
      message: "User Government ID verified successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// generate the OTP
function generateOTP() {
  const digits = "0123456789";
  let otp = "";
  for (let i = 0; i < 6; i++) {
    otp += digits[Math.floor(Math.random() * 10)];
  }
  return otp;
}

const generateOtpCodeForMobile = async (req, res) => {
  try {
    // get the userId
    const payload = req.body;
    const userId = req.user;
    let isUpdated = false;

    console.log(
      "The payload from the generate OTP code for mobile is ",
      payload
    );

    const mobileNo = payload.mobileNo;

    if (!mobileNo) {
      return res.status(400).send({
        message: "Please provide the mobile number",
        success: false,
      });
    }

    // find the user by the id
    const user = await User.findById(userId);

    // check if the users mobile number and mobile number saved in db is same or not
    if (user.mobileNo !== mobileNo) {
      isUpdated = true;
      // update the mobile number
      user.mobileNo = mobileNo;
      await user.save();
    }

    // generate the OTP code
    const otpCode = generateOTP();

    // save the OTP code to the user
    user.mobileVerification.verificationCode = otpCode;

    // Set OTP expiration to 10 minutes from current time
    user.mobileVerification.otpExpiration = new Date(
      Date.now() + 10 * 60 * 1000
    );

    await user.save();

    let msg = isUpdated
      ? `Mobile number updated , otp send on the ${mobileNo} mobile number`
      : `OTP code send successfully on ${mobileNo} mobile number`;

    let mobileNumber = "+91" + mobileNo;
    await sendSMS(mobileNumber, `Your OTP code is ${otpCode}`);
    res.status(200).json({
      message: msg,
      success: true,
    });
  } catch (error) {
    console.log(
      "Error occured while generating the OTP code for mobile :-> ",
      error
    );
    res.status(500).json({
      message: "Error occured while generating the OTP code for mobile",
      success: false,
      error,
    });
  }
};

// Verify the user phone number
const verifyPhoneNumber = async (req, res) => {
  try {
    const payload = req.body;
    const userId = req.user;

    const { otp } = payload;

    console.log("the data from the verify otp for mobile is ", payload);

    // find the user
    const user = await User.findById(userId);

    // console.log("The user from the verify OTP for mobile is ", user);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    const currenttime = new Date(Date.now());

    // check if the OTP code is expired or not
    if (currenttime > user.mobileVerification.otpExpiration) {
      return res.status(400).json({
        message: "OTP code is expired",
        success: false,
      });
    } else {
      // check if the OTP code is correct or not
      if (otp === user.mobileVerification.verificationCode) {
        // update the mobile number verification status
        user.mobileVerification.verified = true;
        await user.save();

        res.status(200).json({
          message: "Mobile number verified successfully",
          success: true,
        });
      } else {
        return res.status(400).json({
          message: "Invalid OTP code",
          success: false,
        });
      }
    }
  } catch (error) {
    console.log("Error while verifying the mobile number");
    res.status(500).json({
      message: "Error while verifying the mobile number",
      success: false,
    });
  }
};

const generateOtpCodeForEmail = async (req, res) => {
  try {
    // Get the userId
    const payload = req.body;
    const userId = req.user;
    let isUpdated = false;

    console.log("The payload from generate OTP code for email is ", payload);

    const email = payload.email;

    if (!email) {
      return res.status(400).send({
        message: "Please provide the email address",
        success: false,
      });
    }

    // Find the user by the id
    const user = await User.findById(userId);

    // Check if the user's email and email saved in the database are the same or not
    if (user.emailId !== email) {
      isUpdated = true;
      // Update the email address
      user.emailId = email;
      await user.save();
    }

    // Generate the OTP code
    const otpCode = generateOTP();

    // Save the OTP code to the user
    user.emailVerification.verificationCode = otpCode;

    // Set OTP expiration to 10 minutes from the current time
    user.emailVerification.otpExpiration = new Date(
      Date.now() + 10 * 60 * 1000
    );

    await user.save();

    let msg = isUpdated
      ? `Email address updated, OTP sent to ${email}`
      : `OTP code sent successfully to ${email}`;

    await sendVerificationOTPEmail(user, otpCode);
    res.status(200).json({
      message: msg,
      success: true,
    });
  } catch (error) {
    console.log(
      "Error occurred while generating the OTP code for email:",
      error
    );
    res.status(500).json({
      message: "Error occurred while generating the OTP code for email",
      success: false,
      error,
    });
  }
};

const verifyEmail = async (req, res) => {
  try {
    const payload = req.body;
    const userId = req.user;

    const { otp } = payload;

    console.log("The data from verify OTP for email is ", payload);

    // Find the user
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    const currentTime = new Date(Date.now());

    // Check if the OTP code is expired or not
    if (currentTime > user.emailVerification.otpExpiration) {
      return res.status(400).json({
        message: "OTP code is expired",
        success: false,
      });
    } else {
      // Check if the OTP code is correct or not
      if (otp === user.emailVerification.verificationCode) {
        // Update the email verification status
        user.emailVerification.verified = true;
        await user.save();

        res.status(200).json({
          message: "Email verified successfully",
          success: true,
        });
      } else {
        return res.status(400).json({
          message: "Invalid OTP code",
          success: false,
        });
      }
    }
  } catch (error) {
    console.log("Error while verifying the email address:", error);
    res.status(500).json({
      message: "Error while verifying the email address",
      success: false,
    });
  }
};

// Upload the user profile Image
const uploadProfileImage = async (req, res) => {
  try {
    console.log(req.body);
    const profileImg = req.body.profileImg;
    const userId = req.user;

    if (!profileImg) {
      return res.status(400).send({
        message: "Please provide the profile image",
        success: false,
      });
    }

    // define the finding criteria
    const findCriteria = { _id: new mongoose.Types.ObjectId(userId) };

    let userDetails = await User.findOneAndUpdate(
      findCriteria,
      {
        profileImg: profileImg,
      },
      {
        new: true,
      }
    );

    res.status(200).send({
      message: "User profile Image updated successfully",
      success: true,
      profileImg: userDetails.profileImg,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error while updating the user profile Image",
      success: false,
      error,
    });
  }
};

// Update the user profile Inorder to become the host
const userToHost = async (req, res) => {
  try {
    console.log(req.body);
    const userId = req.user;
    const role = req.body.role;

    if (!role) {
      return res.status(400).send({
        message: "Please provide the role",
        success: false,
      });
    }
    const findCriteria = {
      _id: new mongoose.Types.ObjectId(userId),
    };

    const updatedUserDetails = await User.findOneAndUpdate(
      findCriteria,
      { role: role },
      { new: true }
    );

    const id = {
      author: updatedUserDetails._id,
    };

    const updateNewRoomAuthor = await Room(id).save();

    res.status(200).send({
      message: "User role updated successfully",
      success: true,
      room: updateNewRoomAuthor,
      updatedUserDetails,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error while updating the user role",
      success: false,
      error,
    });
  }
};

// Update the user profile details
const userProfileDetails = async (req, res) => {
  const userId = req.user;
  const payload = req.body;

  const {
    valueName: [profileDetailsName],
    value: [profileDetailsValue],
    fieldName,
  } = payload;

  const findCriteria = {
    _id: new mongoose.Types.ObjectId(userId),
  };

  try {
    const userDetails = await User.findById(findCriteria).limit(1);

    const userProfile = userDetails.profileDetails.profile;

    if (typeof userProfile === "object") {
      // If the field name is present in the user profile details
      if (fieldName in userProfile) {
        // Update the value of the required field
        userProfile[fieldName].name = profileDetailsName;
        userProfile[fieldName].value = profileDetailsValue;

        // save the updated user profile details
        await userDetails.save();
      } else {
        console.log("Field not found");
      }
    } else {
      console.log("User profile is not object type");
    }

    res.status(200).json({
      message: "User profile details updated successfully",
      success: true,
    });
  } catch (error) {
    console.log("Error while updating the user profile details :-> ", error);
    res.status(500).json({
      message: "Error while updating the user profile details",
      success: false,
      error,
    });
  }
};

// Update the user profile details about
const userProfileAbout = async (req, res) => {
  try {
    const userId = req.user;
    const payload = req.body;

    const { profileDetailsAbout, fieldName } = payload;

    const findCriteria = {
      _id: new mongoose.Types.ObjectId(userId),
    };

    // find the user
    const userDetails = await User.findById(findCriteria).limit(1);

    // extract the user profile details
    const userProfile = userDetails?.profileDetails;

    if (typeof userProfile === "object") {
      // If the field name is present in the user profile details
      if (fieldName in userProfile) {
        // Update the value of the required field
        userProfile[fieldName] = profileDetailsAbout;
        // save the updated user profile details
        await userDetails.save();

        console.log("User profile details updated successfully");
      } else {
        console.log("Field not found");
      }
    } else {
      console.log("User profile is not object type");
    }

    res.status(200).json({
      message: "User profile details updated successfully",
      success: true,
    });
  } catch (error) {
    console.log(
      "Error while updating the user profile details about:-> ",
      error
    );
    res.status(500).send({
      message: "Error while updating the user profile details about",
      success: false,
      error,
    });
  }
};

module.exports = {
  signup,
  login,
  logOutUser,
  verifyGovernmentId,
  generateOtpCodeForEmail,
  verifyEmail,
  generateOtpCodeForMobile,
  verifyPhoneNumber,
  refreshToken,
  checkEmail,
  postUser,
  getUserDetails,
  uploadProfileImage,
  userToHost,
  userProfileDetails,
  userProfileAbout,
};
