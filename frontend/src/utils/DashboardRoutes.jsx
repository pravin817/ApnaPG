import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

const DashboardRoutes = ({ component: Component, ...rest }) => {
  const user = useSelector((state) => state.user.userDetails);
 console.log("The DashboardRoutes called,", user);
  if (user) {
    if (!user.emailVerification.verified || !user.mobileVerification.verified) {
      toast.error(
        "Please verify your email and mobile number before proceeding further."
      );
      return <Navigate to="/host/rooms" />;
    } else {
      if (user?.role === "host") {
        return <Component {...rest} />;
      } else {
        toast.error("Your are not host");
      }
    }
  } else {
    toast.error("Please login!");
    return <Navigate to="/" />;
  }
};

export default DashboardRoutes;
