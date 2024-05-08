import { useEffect, useRef, useState } from "react";
import { set, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { PulseLoader } from "react-spinners";
import api from "../../../backend";
import closeIcon from "../../../assets/BasicIcon/closeIcon.svg";

const UserProfilePopup = ({ showPopup, setShowPopup, popupData }) => {
  // create the states
  const [characterCount, setCharacterCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, watch } = useForm();
  const popUpRef = useRef(null);
  const inputFieldName = popupData?.name;

  const inputValue = watch(inputFieldName);
  const fieldName = popupData?.fieldName;

  const handleProfileValues = async (data) => {
    const valueName = Object.keys(data);
    const value = Object.values(data);

    const sendDataToBackend = { valueName, value, fieldName };

    try {
      setIsLoading(true);
      const response = await api.post(
        "/auth/profile-details",
        sendDataToBackend,
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("Response from handleProfileValues: ", response);

      if (response.data.success) {
        setTimeout(() => {
          setShowPopup(false);
        }, 150);
      }

      toast.success(response.data.message);
    } catch (error) {
      console.log("Error from handleProfileValues: ", error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (showPopup) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showPopup]);

  // count the number of the characters
  useEffect(() => {
    const count = inputValue?.replace(/\s/g, "").length;
    setCharacterCount(count);
  }, [inputValue]);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (popUpRef.current && !popUpRef.current.contains(e.target)) {
        setShowPopup(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [setShowPopup]);
  return (
    <>
      {!showPopup ? null : (
        <div className=" absolute inset-0 w-full bg-[#0000005c] popup__overlay z-[100]">
          <div
            ref={popUpRef}
            className="absolute left-[27.5%] right-[27.5%] top-[12%] h-[65vh] profile__popup__container w-[45vw] bg-[#ffffff] shadow-2xl rounded-xl overflow-hidden"
          >
            <form onSubmit={handleSubmit(handleProfileValues)}>
              <div className=" flex flex-row justify-between items-center py-3 px-5 mb-2">
                <img
                  src={closeIcon}
                  alt="Close icon"
                  className="w-8 hover:bg-[#f1f1f1] transition-colors rounded-full p-2 cursor-pointer"
                  onClick={() => {
                    setShowPopup(false);
                  }}
                />
                <div className=" w-6"> </div>
              </div>
              <div className=" px-7">
                <h1 className=" text-2xl text-[#222222] font-medium">
                  {popupData?.popUpContent?.header}
                </h1>
                <p className=" text-base text-[#717171] mt-2">
                  {popupData?.popUpContent?.subHeader}
                </p>
              </div>
              <div className=" px-7 pb-2">
                <input
                  type="text"
                  placeholder={popupData?.name}
                  className="w-full mt-9 px-4 py-4 rounded-lg border-[1.4px] border-[#b0b0b0]"
                  {...register(inputFieldName, {
                    required: true,
                    maxLength: 40,
                  })}
                />
                <p
                  className={` text-xs font-semibold mt-1 flex flex-row-reverse ${
                    characterCount > 40 ? " text-red-400" : "text-[#717171]"
                  }`}
                >
                  {characterCount}/40 characters
                </p>
              </div>
              <div
                className="py-3 flex flex-row-reverse border-t border-[#dddddd] mt-5 absolute bottom-0  
               w-full"
              >
                <button
                  className={`px-7 py-3 bg-[#282828] hover:bg-[#000000] text-white rounded-lg mx-6 font-  
                   medium disabled:bg-[#dddddd] ${
                     isLoading || characterCount > 40
                       ? " cursor-not-allowed"
                       : ""
                   }`}
                  type="submit"
                  disabled={isLoading || characterCount > 40}
                >
                  {isLoading ? (
                    <PulseLoader
                      color="#f7f7f7"
                      size={7}
                      margin={4}
                      speedMultiplier={0.6}
                    />
                  ) : (
                    "Save"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
export default UserProfilePopup;
