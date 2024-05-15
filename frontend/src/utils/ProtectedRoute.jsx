import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const user = useSelector((state) => state.user.userDetails);

   console.log("The Protected Routes called,", user);

  if (!user) {
    toast.error("Please login");
  }

  return user ? <Component {...rest} /> : <Navigate to="/" />;
};

export default ProtectedRoute;
