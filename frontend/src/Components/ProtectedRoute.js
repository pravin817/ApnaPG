// import { useSelector } from "react-redux";
// import { Navigate, Route } from "react-router-dom";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// const ProtectedRoute = ({ component: Component, ...rest }) => {
//   const user = useSelector((state) => state.user.userDetails);
//   return (
//     <Route
//       {...rest}
//       element={user ? <Component {...rest} /> : <Navigate to="/" />}
//     />
//   );
// };

// export default ProtectedRoute;

const ProtectedRoute = (props) => {
  const { Component } = props;
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.userDetails);
  console.log("The user is ", user);
  return <div>{user ? <Component /> : navigate("/")}</div>;
};

export default ProtectedRoute;
