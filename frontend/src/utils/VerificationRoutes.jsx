import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

const VerificationRoutes = ({ component: Component, ...rest }) => {
  const user = useSelector((state) => state.user.userDetails);
  console.log("The Verification Routes called,", user);

  if (user) {
    if (!user.emailVerification.verified || !user.mobileVerification.verified) {
      toast.error(
        "Please verify your email and mobile number before proceeding further."
      );
      return <Navigate to="/" />;
    } else {
      return <Component {...rest} />;
    }
  } else {
    toast.error("Please login!");
    return <Navigate to="/" />;
  }
};

export default VerificationRoutes;
