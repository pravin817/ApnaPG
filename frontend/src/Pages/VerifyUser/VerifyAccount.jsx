import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { LiaGreaterThanSolid } from "react-icons/lia";
import { getUser } from "../../redux/actions/userActions";

const verificationOptions = [
  {
    id: 1,
    title: "Verify your Government ID",
    description: "Verify your Government ID to continue",
    comparedTo: `mobileVerification.verified`,
    to: "/verify-documents",
  },
  {
    id: 2,
    title: "Verify your Phone Number",
    description: "Verify your Phone Number to continue",
    comparedTo: `emailVerification.verified`,
    to: "/verify-phone",
  },
  {
    id: 3,
    title: "Verify your Email",
    description: "Verify your Email to continue",
    comparedTo: `governmentDocumentVerification.verified`,
    to: "/verify-email",
  },
];

const VerifyAccount = () => {
  const user = useSelector((state) => state.user.userDetails);
  const userId = user?._id;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, []);

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
        {verificationOptions.map((option) => (
          <Link
            key={option.id}
            to={`/users/show/${userId}/verify-account${option.to}`}
            className={`flex items-center justify-between w-full px-4 py-3 border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition duration-300 `}
          >
            <div>
              <h4 className="text-lg font-semibold text-gray-900">
                {option.title}
              </h4>
              <p className="mt-1 text-xs text-gray-600">{option.description}</p>
            </div>
            <div className="text-gray-600">
              <LiaGreaterThanSolid />
            </div>
          </Link>
        ))}
      </div>

      <div className="text-center text-xs text-gray-600">
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
