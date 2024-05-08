import { useState, useEffect, useRef } from "react";

// Import the icons
import backIcon from "../../../assets/BasicIcon/backIcon.png";
import closeIcon from "../../../assets/BasicIcon/closeIcon.svg";

// Import the components
import LoginPopUp from "./LoginPopUp";
import WelcomePopUp from "./WelcomePopUp";
import CreateUserPopUp from "./CreateUserPopUp";
import CreateProfilePopUp from "./CreateProfilePopUp";

const AuthenticationPopUp = ({ popup, setPopup }) => {
  const [showCreateUserPopup, setShowCreateUserPopup] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [defaultPopup, setDefaultPopup] = useState(true);
  const [loginEmail, setLoginEmail] = useState(null);
  const [profilePopup, setProfilePopup] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const popUpRef = useRef(null);

  const handleCloseLoginPopup = () => {
    setShowLoginPopup(false);
    setShowCreateUserPopup(false);
    setDefaultPopup(true);
  };

  // Close the popup when clicked outside of the popup
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (popUpRef.current && !popUpRef.current.contains(event.target)) {
        setPopup(false);
        setShowCreateUserPopup(false);
        setShowLoginPopup(false);
        setProfilePopup(false);
        setDefaultPopup(true);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <>
      {popup !== true ? null : (
        <div className=" absolute inset-0 w-screen h-screen bg-[#0000005c] popup-overlay">
          <div
            ref={popUpRef}
            className={`absolute top-[12%]  w-[100vw] bg-[#ffffff] shadow-2xl rounded-xl overflow-hidden border-4 border-green-500
            md:left-[20.5%] md:right-[20.5%] md:w-[65vw] md:border-4 md:border-blue-500
            lg:left-[25.5%] lg:right-[25.5%] lg:w-[45vw] lg:border-4 lg:border-yellow-500
            sm:left-[27.5%] sm:right-[27.5%] sm:w-[50vw] sm:border-4 sm:border-red-500
            ${
              (showLoginPopup || profilePopup) && !showErrorMessage
                ? "h-[60vh] popup-container-login"
                : (showLoginPopup || profilePopup) && showErrorMessage
                ? "h-[80vh]"
                : "h-[80vh] popup-container"
            }
            `}
          >
            {/* show the proper components based on the state */}
            <div className=" flex items-center w-full py-4 border-b-[1px] px-8 sticky top-0 bg-[#ffffff]">
              {defaultPopup || profilePopup ? (
                <img
                  src={closeIcon}
                  alt="close Icon"
                  className="w-8 hover:bg-[#f1f1f1] transition-colors rounded-full p-2 cursor-pointer"
                  onClick={() => {
                    setPopup(false);
                  }}
                />
              ) : (
                <img
                  src={backIcon}
                  alt="close icon"
                  className="w-8 hover:bg-[#f1f1f1] transition-colors rounded-full p-2 cursor-pointer"
                  onClick={() => {
                    handleCloseLoginPopup();
                  }}
                />
              )}
              <p className="text-base mx-auto font-semibold text-[#222222]">
                {defaultPopup
                  ? "Log in or sign up"
                  : showLoginPopup
                  ? "Log in"
                  : showCreateUserPopup
                  ? "Finish signing up"
                  : profilePopup
                  ? "Create you ApnaPG profile"
                  : "Log in or sign up"}
              </p>
              <div className="w-[14px]"> </div>
            </div>
            <div
              className={`overflow-y-auto ${
                showLoginPopup ? "h-[50vh]" : "h-[70vh]"
              }`}
            >
              {!defaultPopup ? null : (
                <WelcomePopUp
                  setDefaultPopup={setDefaultPopup}
                  setShowLoginPopup={setShowLoginPopup}
                  setShowCreateUserPopup={setShowCreateUserPopup}
                  setLoginEmail={setLoginEmail}
                />
              )}
              {!showLoginPopup ? null : (
                <LoginPopUp
                  onBack={handleCloseLoginPopup}
                  loginEmail={loginEmail}
                  setDefaultPopup={setDefaultPopup}
                  setShowLoginPopup={setShowLoginPopup}
                  setPopup={setPopup}
                  showErrorMessage={showErrorMessage}
                  setShowErrorMessage={setShowErrorMessage}
                />
              )}
              {!showCreateUserPopup ? null : (
                <CreateUserPopUp
                  onBack={handleCloseLoginPopup}
                  loginEmail={loginEmail}
                  setProfilePopup={setProfilePopup}
                  showCreatePopUp={setShowCreateUserPopup}
                  setPopup={setPopup}
                />
              )}

              {/* go to create user profile */}
              {!profilePopup ? null : (
                <CreateProfilePopUp
                  setShowProfilePopup={setProfilePopup}
                  setPopup={setPopup}
                  setDefaultPopup={setDefaultPopup}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AuthenticationPopUp;
