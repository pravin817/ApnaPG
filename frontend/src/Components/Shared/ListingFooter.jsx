import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import {
  getRoomDetails,
  publishRoom,
  saveAmenities,
  saveDescription,
  saveFloorPlan,
  saveGuestType,
  saveHighlight,
  savePhotos,
  savePrices,
  savePrivacyType,
  saveRoomLocation,
  saveSecurity,
  saveStructure,
  saveTitle,
} from "../../redux/actions/roomActions";

import { userRole } from "../../redux/actions/userActions";

const ListingFooter = () => {
  // Get the user details
  const user = useSelector((state) => state.user.userDetails);
  console.log("User Details", user);

  // Get the current room details
  const createRoomData = useSelector((state) => state.room);
  console.log("Current Room Data", createRoomData);

  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const url = window.location.pathname;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentRoomId = localStorage.getItem("currentRoomId");

  useEffect(() => {
    dispatch(getRoomDetails(currentRoomId));
  }, [currentRoomId, dispatch]);

  // Define the steps for the listing the rooms
  const steps = [
    "/become-a-host",
    `/become-a-host/${user?._id}/about-your-place`,
    `/become-a-host/${user?._id}/structure`,
    `/become-a-host/${user?._id}/privacy-type`,
    `/become-a-host/${user?._id}/location`,
    `/become-a-host/${user?._id}/floor-plan`,
    `/become-a-host/${user?._id}/stand-out`,
    `/become-a-host/${user?._id}/amenities`,
    `/become-a-host/${user?._id}/photos`,
    `/become-a-host/${user?._id}/title`,
    `/become-a-host/${user?._id}/highlight`,
    `/become-a-host/${user?._id}/description`,
    `/become-a-host/${user?._id}/finish-step`,
    `/become-a-host/${user?._id}/visibility`,
    `/become-a-host/${user?._id}/price`,
    `/become-a-host/${user?._id}/legal`,
    `/become-a-host/${user?._id}/receipt`,
    `/become-a-host/${user?._id}/published`,
  ];

  // Based on the steps save the data to database
  const currentStepIndex = steps.indexOf(url);
  const currentListingRoomId = localStorage.getItem("currentRoomId");
  console.log("Current Step Index", currentStepIndex);

  const handleNext = async () => {
    if (currentStepIndex < steps.length - 1) {
      setLoading(true);
      console.log("Current Step Index", currentStepIndex);

      if (currentStepIndex === 0) {
        // Handle action related to the user
        await dispatch(userRole());
      } else if (currentStepIndex === 2) {
        const roomData = {
          roomType: createRoomData?.newRoom?.roomType,
          roomId: currentListingRoomId,
        };
        await dispatch(saveStructure(roomData));
      } else if (currentStepIndex === 3) {
        // Handle action related to the room
        const roomData = {
          privacyType: createRoomData?.newRoom?.privacyType,
          roomId: currentListingRoomId,
        };
        // Save the privacy type data in the database
        await dispatch(savePrivacyType(roomData));
      } else if (currentStepIndex === 4) {
        const locationData = {
          location: createRoomData?.newRoom?.location,
          roomId: currentListingRoomId,
        };

        // save the location data in the database
        await dispatch(saveRoomLocation(locationData));
      } else if (currentStepIndex === 5) {
        // Get the floor plan data
        const floorPlanData = {
          floorPlan: createRoomData?.newRoom?.floorPlan,
          roomId: currentListingRoomId,
        };
        // Save the floor plan data in the database
        await dispatch(saveFloorPlan(floorPlanData));
      } else if (currentStepIndex === 7) {
        // get the amenities data
        const amenitiesData = {
          amenities: createRoomData?.newRoom?.amenities,
          roomId: currentListingRoomId,
        };
        console.log("Amenities Data form Listing Footer", amenitiesData);
        // Save the amenities data in the database
        await dispatch(saveAmenities(amenitiesData));
      } else if (currentStepIndex === 8) {
        // Get the photos data
        const photosData = {
          photos: createRoomData?.newRoom?.photos,
          roomId: currentListingRoomId,
        };

        // save the photos data in the database
        await dispatch(savePhotos(photosData));
      } else if (currentStepIndex === 9) {
        // get the Title of room
        const titleData = {
          title: createRoomData?.newRoom?.title,
          roomId: currentListingRoomId,
        };

        // save the room title in DB
        await dispatch(saveTitle(titleData));
      } else if (currentStepIndex === 10) {
        // get the room highlight data
        const highlightData = {
          ///////////////////////////////////////////////// BIG BIGWarning /////////////////////////////////////////////////////
          highlight: createRoomData?.newRoom?.highlights,
          roomId: currentListingRoomId,
        };

        console.log("Highlight Data from Listing Footer", highlightData);

        // Save the room highlight in DB
        await dispatch(saveHighlight(highlightData));
      } else if (currentStepIndex === 11) {
        // get the room description data
        const descriptionData = {
          description: createRoomData?.newRoom?.description,
          roomId: currentListingRoomId,
        };

        console.log("The description of the room", descriptionData);

        // Save the room description in DB
        await dispatch(saveDescription(descriptionData));
      } else if (currentStepIndex === 13) {
        // set the visibility of the room
        const visibilityData = {
          guestType: createRoomData?.newRoom?.guestType,
          roomId: currentListingRoomId,
        };

        // save the visibility of the room in DB
        await dispatch(saveGuestType(visibilityData));
      } else if (currentStepIndex === 14) {
        // set the price of the room
        const priceData = {
          priceBeforeTaxes: createRoomData?.newRoom?.priceBeforeTaxes,
          authorEarnedPrice: createRoomData?.newRoom?.authorEarnedPrice,
          basePrice: createRoomData?.newRoom?.basePrice,
          roomId: currentListingRoomId,
        };

        // save the price of the room in DB
        await dispatch(savePrices(priceData));
      } else if (currentStepIndex === 15) {
        // set the security for the room
        const securityData = {
          security: createRoomData?.newRoom?.security,
          roomId: currentListingRoomId,
        };

        // save the security of the room in DB
        await dispatch(saveSecurity(securityData));
      } else if (currentStepIndex === 16) {
        // Publish the room
        const publishRoomData = {
          roomId: currentListingRoomId,
        };

        // save the security of the room in DB
        await dispatch(publishRoom(publishRoomData));
      }

      setLoading(false);

      // Navigate to the next step
      navigate(steps[currentStepIndex + 1]);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  // UseEffect for the updating the progress bar based on the steps

  useEffect(() => {
    if (url?.includes("/about-your-place")) {
      setProgress(0);
    }
    if (url?.includes("/structure")) {
      setProgress(10);
    }
    if (url?.includes("/privacy-type")) {
      setProgress(20);
    }
    if (url?.includes("/location")) {
      setProgress(25);
    }
    if (url?.includes("/floor-plan")) {
      setProgress(30);
    }
    if (url?.includes("/stand-out")) {
      setProgress(35);
    }
    if (url?.includes("/amenities")) {
      setProgress(40);
    }
    if (url?.includes("/photos")) {
      setProgress(50);
    }
    if (url?.includes("/title")) {
      setProgress(60);
    }
    if (url?.includes("/highlight")) {
      setProgress(65);
    }
    if (url?.includes("/description")) {
      setProgress(70);
    }
    if (url?.includes("/finish-step")) {
      setProgress(75);
    }
    if (url?.includes("/visibility")) {
      setProgress(80);
    }
    if (url?.includes("/price")) {
      setProgress(85);
    }
    if (url?.includes("/legal")) {
      setProgress(90);
    }
    if (url?.includes("/receipt")) {
      setProgress(95);
    }
  }, [progress, url]);
  return (
    <footer className="sticky bottom-0 bg-white">
      {/* Progress bar  */}
      {!url.includes("/published") && (
        <div>
          <progress
            className="progress w-full shadow-sm transition-all duration-700 h-2"
            value={progress}
            max={100}
          ></progress>
        </div>
      )}
      {/* Buttons  */}
      <div className="flex justify-between py-3 px-6 sm:px-10 md:px-20 top-0 z-10 bg-white max-w-screen-xl xl:px-20 xl:mx-auto">
        {/* If we are on the last page don't show back button  */}
        {!url.includes("/published") ? (
          <button
            className="hover:bg-[#f1f1f1] text-black rounded-md px-4 py-2 underline"
            onClick={() => {
              navigate(-1);
            }}
          >
            Back
          </button>
        ) : (
          <div></div>
        )}

        {url.includes("/published") ? (
          <a
            href={`/users/dashboard/${user?._id}/listing=true`}
            className="text-lg text-white font-medium rounded-md px-9 py-3 disabled:bg-[#dddddd] disabled:cursor-not-allowed transition durtion-300 ease-in bg-[#222222] hover:bg-black"
          >
            See Listing
          </a>
        ) : (
          <button
            className={`text-lg text-white font-medium rounded-md px-9 py-3 disabled:bg-[#dddddd] disabled:cursor-not-allowed transition durtion-300 ease-in ${
              url?.includes("/receipt")
                ? "bg-[#ff385c] hover:bg-[#d90b63]"
                : "bg-[#222222] hover:bg-black"
            }`}
            onClick={handleNext}
            disabled={loading}
          >
            {loading ? (
              <>
                <PulseLoader
                  color="#f7f7f7"
                  size={7}
                  margin={4}
                  speedMultiplier={0.6}
                />
              </>
            ) : (
              <>{url?.includes("/receipt") ? "Publish" : "Next"}</>
            )}
          </button>
        )}
      </div>
    </footer>
  );
};

export default ListingFooter;
