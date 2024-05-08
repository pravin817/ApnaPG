import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { createNewRoom } from "../../redux/actions/roomActions";

const ListingRoomStepTwoDescription = () => {
  const { register } = useForm();

  const [description, setDescription] = useState(null);
  const [characterCount, setCharacterCount] = useState(0);

  const newRoomData = useSelector((state) => state.room.newRoom);
  const dispatch = useDispatch();

  const handleChange = () => {
    dispatch(
      createNewRoom(
        newRoomData?.roomType,
        newRoomData?.privacyType,
        newRoomData?.location,
        newRoomData?.floorPlan,
        newRoomData?.amenities,
        newRoomData?.photos,
        newRoomData?.title,
        newRoomData?.highlights,
        description
      )
    );
  };
  console.log("Description", description);

  return (
    <div className=" flex flex-col gap-10 max-w-screen-sm mx-auto my-6 min-h-[80vh]">
      <div>
        <h1 className=" text-[#222222] text-xl sm:text-2xl md:text-[32px] font-medium">
          Create your description
        </h1>
        <p className=" text-sm sm:text-base md:text-lg text-[#717171]">
          Share what makes your place special.
        </p>
      </div>

      <div>
        <textarea
          className="w-full p-3 border-[#b0b0b0] border-[1.3px] rounded-md"
          rows="6"
          autoComplete="off"
          {...register("description", { maxLength: 3000 })}
          onChange={(e) => {
            setDescription(e.target.value);
            setCharacterCount(e.target.value.replace(/\s/g, " ").length);
            handleChange();
          }}
          onBlur={handleChange}
          placeholder="Write your house description here..."
        ></textarea>
        <div className=" mt-2 mb-3">
          <p
            className={` text-xs font-semibold mt-1 flex flex-row-reverse ${
              characterCount > 3000 ? " text-red-400" : "text-[#717171]"
            }`}
          >
            {characterCount}/3000 characters
          </p>
        </div>
      </div>
    </div>
  );
};

export default ListingRoomStepTwoDescription;
