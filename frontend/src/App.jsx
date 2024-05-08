import "./App.css";
import toast, { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";

import router from "./Routes/Route";

function App() {
  return (
    <>
      {/* wrapup the router  */}
      <RouterProvider router={router} />

      {/* Add for the Toast Notification  */}
      <Toaster></Toaster>
    </>
  );
}

export default App;
