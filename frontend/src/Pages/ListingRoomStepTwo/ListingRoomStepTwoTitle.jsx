import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { createNewRoom } from "../../redux/actions/roomActions";

const ListingRoomStepTwoTitle = () => {
  const { register } = useForm();
  const [title, setTitle] = useState("");
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
        title
      )
    );
  };
  console.log("title", title);

  return (
    <div className=" flex flex-col gap-10 max-w-screen-sm mx-auto my-6 min-h-[80vh]">
      <div className=" flex flex-col gap-3 md:gap-0">
        <h1 className=" text-[#222222] text-[32px] font-medium">
          Now, let&apos;s give your apartment a title
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-[#717171]">
          Short titles work best. Have fun with it—you can always change it
          later.
        </p>
      </div>

      <div>
        <textarea
          className="w-full p-3 border-[#b0b0b0] border-[1.3px] rounded-md"
          rows="6"
          autoComplete="off"
          {...register("title", { maxLength: 50 })}
          onChange={(e) => {
            setTitle(e.target.value);
            setCharacterCount(e.target.value.replace(/\s/g, " ").length);
            handleChange(e);
          }}
          onBlur={handleChange}
          placeholder="Your house title"
        ></textarea>
        <div className=" mt-2 mb-3">
          <p
            className={` text-xs font-semibold mt-1 flex flex-row-reverse ${
              characterCount > 40 ? " text-red-400" : "text-[#717171]"
            }`}
          >
            {characterCount}/40 characters
          </p>
        </div>
      </div>
    </div>
  );
};

export default ListingRoomStepTwoTitle;
