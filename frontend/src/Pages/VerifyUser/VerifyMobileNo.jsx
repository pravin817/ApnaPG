import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import backIcon from "../../assets/BasicIcon/backIcon.png";
import { useSelector } from "react-redux";
import api from "../../backend";
import toast from "react-hot-toast";

const VerifyMobileNo = () => {
  const userDetails = useSelector((state) => state.user.userDetails);
  console.log("The userdetails from the verify mobile ", userDetails);

  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [message, setMessage] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const navigate = useNavigate();

  // set the mobile number of the user
  useEffect(() => {
    console.log("The useEffect called", userDetails);
    if (userDetails?.mobileNo) {
      setPhoneNumber(userDetails?.mobileNo);
    }
  }, [userDetails]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "phoneNumber") {
      setPhoneNumber(value);
    } else if (name === "verificationCode") {
      setVerificationCode(value);
    }
  };

  const handleSendVerificationCode = async () => {
    try {
      const response = await api.post(
        "/auth/mobile/generate-otp-code",
        {
          mobileNo: phoneNumber,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("The response from the send verification code", response);
      toast.success(response.data.message);
      setMessage(response.data.message);
      setIsCodeSent(true);
    } catch (error) {
      console.error("Error sending verification code:", error);
      setMessage("Error sending verification code. Please try again later.");
    }
  };

  const handleVerifyPhoneNumber = async () => {
    try {
      const response = await api.post(
        "/auth/mobile/verify-otp-code",
        {
          otp: verificationCode,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("The response from the send verification code", response);
      toast.success(response.data.message);
      setMessage(response.data.message);

      if (response.data.success) {
        navigate(-1);
        window.location.reload();
      } else {
        window.location.reload();
      }
    } catch (error) {
      console.error("Error verifying phone number:", error);
      setMessage("Error verifying phone number. Please try again later.");
    }
  };

  return (
    <section className="max-w-[1200px] mx-auto px-4 sm:px-8 md:px-10 xl:px-20 py-8 md:py-12">
      <div
        className="flex flex-row gap-3 items-center"
        onClick={() => navigate(-1)}
      >
        <img
          src={backIcon}
          alt="back"
          className="w-4 mix-blend-darken cursor-pointer hover:rounded-full hover:bg-[#f1f1f1] inline-block"
        />
        <h5 className="text-[#222222] text-xl font-semibold">
          Verify Mobile Number
        </h5>
      </div>

      <hr className="mt-2 w-full h-[1px] bg-[#dddddd] z-0" />

      <div className="mt-10 lg:w-2/4 xl:w-1/2 sm:w-3/4 mx-auto">
        <div className="p-4 md:p-8 lg:p-12 bg-white rounded-lg border">
          <h2 className="text-2xl font-semibold text-center mb-4">
            Mobile Number Verification
          </h2>

          {!isCodeSent ? (
            <>
              <div className="mb-4">
                <label className="block mb-2">Mobile Number:</label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={phoneNumber}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-black"
                />
              </div>
              <p className="text-sm opacity-75 mt-2 mb-2">
                We will send you an SMS with a verification code.
              </p>
              <button
                onClick={handleSendVerificationCode}
                className="w-full bg-black text-white py-2 rounded-md hover:bg-black focus:outline-none focus:bg-black"
              >
                Send Verification Code
              </button>
            </>
          ) : (
            <>
              <div className="mt-4 mb-4">
                <label className="block mb-2">Verification Code:</label>
                <input
                  type="text"
                  name="verificationCode"
                  value={verificationCode}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-black"
                />
              </div>
              <p className="text-sm opacity-75 mb-2">
                Enter the verification code that send on +91 {phoneNumber}.
              </p>
              <button
                onClick={handleVerifyPhoneNumber}
                className="w-full bg-black text-white py-2 rounded-md hover:bg-black focus:outline-none focus:bg-black"
              >
                Verify Mobile Number
              </button>
            </>
          )}
          {/* <p className="mt-4 text-center text-gray-700">{message}</p> */}
        </div>
      </div>
    </section>
  );
};

export default VerifyMobileNo;
