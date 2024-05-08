import { useEffect, useState } from "react";
import FloorPlanCard from "../../Components/ListingRoom/FloorPlanCard";
import { useDispatch, useSelector } from "react-redux";
import { createNewRoom } from "../../redux/actions/roomActions";

const ListingRoomStepOneFloorPlan = () => {
  const [guestNumber, setGuestNumber] = useState(0);
  const [bedroomsNumber, setBedroomsNumber] = useState(0);
  const [bedsNumber, setBedsNumber] = useState(1);
  const [bathroomsNumber, setBathroomsNumber] = useState(0);

  // get the room details
  const newRoomData = useSelector((state) => state.room.newRoom);
  console.log("New Room From Floor - plan ", newRoomData);

  const dispatch = useDispatch();

  useEffect(() => {
    let floorPlan = {
      guests: guestNumber,
      bedrooms: bedroomsNumber,
      beds: bedsNumber,
      bathRoomsNumber: bathroomsNumber,
    };

    console.log("Floor Plan", floorPlan);
    if (
      guestNumber !== 0 ||
      bedroomsNumber !== 0 ||
      bedsNumber !== 0 ||
      bathroomsNumber !== 0
    ) {
      dispatch(
        createNewRoom(
          newRoomData?.roomType,
          newRoomData?.privacyType,
          newRoomData?.location,
          floorPlan
        )
      );
    }
  }, [
    guestNumber,
    bedroomsNumber,
    bedsNumber,
    bathroomsNumber,
    dispatch,
    newRoomData?.roomType,
    newRoomData?.privacyType,
    newRoomData?.location,
  ]);

  return (
    <section className=" flex flex-col gap-10 max-w-screen-md mx-auto my-6 min-h-[70dvh] 2xl:h-[80vh]">
      <div className=" flex flex-col gap-2">
        <h1 className=" text-[#222222] text-xl sm:text-2xl md:text-[32px] font-medium">
          Share some basics about your place
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-[#717171]">
          You&apos;ll add more details later, like bed types
        </p>
      </div>
      <div className="flex flex-col gap-5 mt-5">
        <FloorPlanCard
          name={"Number of Guests"}
          number={guestNumber}
          setNumber={setGuestNumber}
          filter={false}
        />
        <hr className="bg-[#dddddd] my-2" />
        <FloorPlanCard
          name={"Number of Bedrooms"}
          number={bedroomsNumber}
          setNumber={setBedroomsNumber}
          filter={false}
        />
        <hr className="bg-[#dddddd] my-2" />
        <FloorPlanCard
          name={"Number of Beds"}
          number={bedsNumber}
          setNumber={setBedsNumber}
          filter={false}
        />
        <hr className="bg-[#dddddd] my-2" />
        <FloorPlanCard
          name={"Number of Bathrooms"}
          number={bathroomsNumber}
          setNumber={setBathroomsNumber}
          filter={false}
        />
        <hr className="bg-[#dddddd] my-2" />
      </div>
    </section>
  );
};

export default ListingRoomStepOneFloorPlan;
