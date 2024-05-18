import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

const DashboardRoutes = ({ component: Component, ...rest }) => {
  const user = useSelector((state) => state.user.userDetails);
  const navigate = useNavigate();
  console.log("The DashboardRoutes called,", user);
  if (user) {
    if (!user.emailVerification.verified || !user.mobileVerification.verified) {
      const toastId = toast.error(
        "Please verify your email and mobile number before proceeding further."
      );

      setTimeout(() => {
        toast.dismiss(toastId);
        const redirectToastId = toast.success(
          "Redirecting for verification..."
        );
        setTimeout(() => {
          toast.dismiss(redirectToastId);
          navigate(`/users/show/${user?._id}/verify-account`);
        }, 1500);
      }, 2500);
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
