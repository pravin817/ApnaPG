import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { LiaGreaterThanSolid } from "react-icons/lia";
import { getUser } from "../../redux/actions/userActions";

const VerifyAccount = () => {
  const user = useSelector((state) => state.user.userDetails);
  const userId = user?._id;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
    window.scrollTo({ top: 0, behavior: "smooth" }); // Smooth scroll to top
  }, [dispatch]);

  return (
    <div className="p-3 flex flex-col items-center justify-center gap-8 max-w-screen-md mx-auto my-6 min-h-[70vh] sm:my-10">
      <div className="text-center">
        <h1 className="text-2xl md:text-4xl font-bold text-gray-900">
          Verify Your Profile
        </h1>
        <p className="mt-4 text-sm md:text-base text-gray-600">
          Verify your account with government documents, phone number, and email
          to increase user trust.
        </p>
      </div>

      <div className="flex flex-col items-center w-full space-y-4">
        {/* Government ID Verification */}
        <Link
          to={`/users/show/${userId}/verify-account/verify-documents`}
          className={`flex items-center justify-between w-full px-4 py-3 border border-gray-200 rounded-lg shadow-sm transition duration-200 ${
            user && user.governmentDocumentVerification.verified
              ? "bg-green-200 cursor-not-allowed"
              : "hover:bg-gray-100"
          }`}
          onClick={(e) =>
            user && user.governmentDocumentVerification.verified
              ? e.preventDefault()
              : null
          }
        >
          <div>
            <h4 className="text-lg font-semibold text-gray-900">
              Verify your Government ID
            </h4>
            <p className="mt-1 text-xs text-gray-600">
              Verify your Government ID to continue
            </p>
          </div>
          <div className="text-gray-600">
            <LiaGreaterThanSolid />
          </div>
        </Link>

        {/* Phone Number Verification */}
        <Link
          to={`/users/show/${userId}/verify-account/verify-phone`}
          className={`flex items-center justify-between w-full px-4 py-3 border border-gray-200 rounded-lg shadow-sm transition duration-200 ${
            user && user.mobileVerification.verified
              ? "bg-green-200 cursor-not-allowed"
              : "hover:bg-gray-100"
          }`}
          onClick={(e) =>
            user && user.mobileVerification.verified ? e.preventDefault() : null
          }
        >
          <div>
            <h4 className="text-lg font-semibold text-gray-900">
              Verify your Phone Number
            </h4>
            <p className="mt-1 text-xs text-gray-600">
              Verify your Phone Number to continue
            </p>
          </div>
          <div className="text-gray-600">
            <LiaGreaterThanSolid />
          </div>
        </Link>

        {/* Email Verification */}
        <Link
          to={`/users/show/${userId}/verify-account/verify-email`}
          className={`flex items-center justify-between w-full px-4 py-3 border border-gray-200 rounded-lg shadow-sm transition duration-200 ${
            user && user.emailVerification.verified
              ? "bg-green-200 cursor-not-allowed"
              : "hover:bg-gray-100"
          }`}
          onClick={(e) =>
            user && user.emailVerification.verified ? e.preventDefault() : null
          }
        >
          <div>
            <h4 className="text-lg font-semibold text-gray-900">
              Verify your Email
            </h4>
            <p className="mt-1 text-xs text-gray-600">Verify your Email</p>
          </div>
          <div className="text-gray-600">
            <LiaGreaterThanSolid />
          </div>
        </Link>
      </div>

      <div className="text-center text-xs text-gray-600 mt-6">
        <p>
          The data collected by ApnaPG is necessary to verify your identity. For
          more information and to exercise your rights, see our{" "}
          <span className="text-red-700 font-semibold">Privacy Policy</span>.
        </p>
      </div>
    </div>
  );
};

export default VerifyAccount;
