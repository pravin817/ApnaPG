const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      firstName: {
        type: String,
        default: "",
        required: [true, "First Name is required"],
      },
      lastName: {
        type: String,
        default: "",
        required: [true, "Last Name is required"],
      },
    },
    emailId: {
      type: String,
      default: "",
      required: [true, "Email is required"],
      unique: true,
    },
    mobileNo: {
      type: String,
      default: "",
      required: [true, "Mobile Number is required"],
      // unique: true,
    },
    birthDate: {
      type: String,
      default: "0000/00/00",
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    role: {
      type: String,
      default: "visitors",
    },
    accessToken: {
      type: String,
    },
    refreshToken: {
      type: String,
    },
    profileImg: {
      type: String,
    },
    profileDetails: {
      profileType: {
        type: String,
        default: "visitors",
      },
      profile: {
        school: {
          name: {
            type: String,
          },
          value: {
            type: String,
          },
        },
        profession: {
          name: {
            type: String,
          },
          value: {
            type: String,
          },
        },
        presentAddress: {
          name: {
            type: String,
          },
          value: {
            type: String,
          },
        },
        favoriteSong: {
          name: {
            type: String,
          },
          value: {
            type: String,
          },
        },
        obsessedWith: {
          name: {
            type: String,
          },
          value: {
            type: String,
          },
        },
        funFact: {
          name: {
            type: String,
          },
          value: {
            type: String,
          },
        },
        spendTime: {
          name: {
            type: String,
          },
          value: {
            type: String,
          },
        },
        pets: {
          name: {
            type: String,
          },
          value: {
            type: String,
          },
        },
      },
      about: {
        type: String,
      },
    },
    emailVerification: {
      verified: {
        type: Boolean,
        default: false,
      },
      verificationCode: {
        type: String,
      },
      otpExpiration: {
        type: Date, // Date when OTP will expire
      },
    },
    mobileVerification: {
      verified: {
        type: Boolean,
        default: false,
      },
      verificationCode: {
        type: String,
      },
      otpExpiration: {
        type: Date, // Date when OTP will expire
      },
    },
    governmentDocumentVerification: {
      verified: {
        type: Boolean,
        default: false,
      },
      documentType: {
        type: String,
      },
      documentUrl: {
        type: String,
      },
    },
    wishlist: {
      type: Array,
      default: [],
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const User = mongoose.model("user", userSchema);

module.exports = User;
