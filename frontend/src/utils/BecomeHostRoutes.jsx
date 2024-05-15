import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

const BecomeHostRoutes = ({ component: Component, ...rest }) => {
  const user = useSelector((state) => state.user.userDetails);
  console.log("The becomeHostRoutes called,", user);

  if (user) {
    if (!user.emailVerification.verified || !user.mobileVerification.verified) {
      toast.error(
        "Please verify your email and mobile number before proceeding further."
      );
      return <Navigate to="/host/rooms" />;
    } else {
      return <Component {...rest} />;
    }
  } else {
    toast.error("Please login!");
    return <Navigate to="/" />;
  }
};

export default BecomeHostRoutes;
