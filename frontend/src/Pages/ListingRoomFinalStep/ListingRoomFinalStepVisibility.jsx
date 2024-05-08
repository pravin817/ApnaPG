import { useState } from "react";
import PlaceTypeCard from "../../Components/ListingRoom/PlaceTypeCard";

import { AiOutlineCheckCircle } from "react-icons/ai";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { createNewRoom } from "../../redux/actions/roomActions";

const ListingRoomFinalStepVisibility = () => {
  const [storedCardData, setStoredCardData] = useState("");
  const newRoomData = useSelector((state) => state.room.newRoom);
  const dispatch = useDispatch();

  const handleStoreCardData = (name) => {
    setStoredCardData(name);
    dispatch(
      createNewRoom(
        newRoomData?.houseType,
        newRoomData?.privacyType,
        newRoomData?.location,
        newRoomData?.floorPlan,
        newRoomData?.amenities,
        newRoomData?.photos,
        newRoomData?.title,
        newRoomData?.highlights,
        newRoomData?.description,
        name
      )
    );
  };
  return (
    <div className=" flex flex-col gap-10 max-w-screen-md mx-auto my-6 min-h-[70vh]">
      <div>
        <h1 className=" text-[#222222] text-xl sm:text-2xl md:text-[32px] font-medium">
          Choose who to welcome for your first reservation
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-[#717171]">
          After your first guest, anyone can book your place.
        </p>
      </div>
      <PlaceTypeCard
        desc={
          "Get reservations faster when you welcome anyone from the ApanaPG community."
        }
        head={"Any ApnaPG guest"}
        onClick={handleStoreCardData}
        storedCardData={storedCardData}
        CheckOutline={AiOutlineCheckCircle}
        CheckFill={BsFillCheckCircleFill}
      />
      <PlaceTypeCard
        desc="For your first guest, welcome someone with a good track record on ApnaPG who can offer tips for how to be a great Host"
        head={"An Experienced guest"}
        onClick={handleStoreCardData}
        storedCardData={storedCardData}
        CheckOutline={AiOutlineCheckCircle}
        CheckFill={BsFillCheckCircleFill}
      />
    </div>
  );
};

export default ListingRoomFinalStepVisibility;
