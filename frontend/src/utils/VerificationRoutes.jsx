import React from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

const VerificationRoutes = ({ component: Component, ...rest }) => {
  const user = useSelector((state) => state.user.userDetails);
  const navigate = useNavigate();
  console.log("The Verification Routes called,", user);

  if (user) {
    if (!user.emailVerification.verified || !user.mobileVerification.verified) {
      toast.error(
        "Please verify your email and mobile number before proceeding further."
      );
      navigate("/verification"); // Redirecting to the verification page
      return null; // Return null to prevent rendering
    } else {
      return <Component {...rest} />;
    }
  } else {
    toast.error("Please login!");
    navigate("/"); // Redirecting to the login page
    return null; // Return null to prevent rendering
  }
};

export default VerificationRoutes;
