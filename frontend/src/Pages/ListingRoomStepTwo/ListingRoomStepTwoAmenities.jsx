// Import the all assets
import { HiOutlineWifi } from "react-icons/hi";
import {
  PiTelevisionSimple,
  PiCampfireLight,
  PiFireExtinguisher,
} from "react-icons/pi";
import {
  MdOutlineKitchen,
  MdOutlinePool,
  MdDinnerDining,
} from "react-icons/md";
import { PiFanLight } from "react-icons/pi";
import { MdTableRestaurant } from "react-icons/md";
import { LiaChairSolid } from "react-icons/lia";
import { GiLift } from "react-icons/gi";
import { TbSunElectricity } from "react-icons/tb";
import { BiSolidWasher, BiSolidFirstAid } from "react-icons/bi";
import { AiOutlineCar, AiOutlineAlert } from "react-icons/ai";
import { CgPiano } from "react-icons/cg";
import { CiDumbbell } from "react-icons/ci";
import { GiBathtub } from "react-icons/gi";
import { BsSpeedometer2, BsSnow, BsPersonWorkspace } from "react-icons/bs";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { createNewRoom } from "../../redux/actions/roomActions";

import StructureCard from "../../Components/ListingRoom/StructureCard";

const ListingRoomStepTwoAmenities = () => {
  const [storedCardData, setStoredCardData] = useState([]);

  // get the current listing room
  const newRoomData = useSelector((state) => state.room.newRoom);
  console.log("New Room From Amenities", newRoomData);

  const dispatch = useDispatch();

  const svgSize = window.innerWidth < 768 ? 28 : 40;

  const handleStoreCardData = (name) => {
    if (storedCardData.includes(name)) {
      storedCardData.pop(name);
      setStoredCardData([...storedCardData]);
    } else {
      setStoredCardData([...storedCardData, name]);
    }
  };

  useEffect(() => {
    dispatch(
      createNewRoom(
        newRoomData?.roomType,
        newRoomData?.privacyType,
        newRoomData?.location,
        newRoomData?.floorPlan,
        storedCardData
      )
    );
  }, [storedCardData, dispatch]);

  console.log("amenities : ", storedCardData);

  return (
    <div className=" flex flex-col gap-10 max-w-screen-md mx-auto my-6">
      <div>
        <h1 className=" text-[#222222] text-xl sm:text-2xl md:text-[32px] font-medium">
          Tell guests what your place has to offer
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-[#717171]">
          You can add more amenities after you publish your listing.
        </p>
      </div>
      {/* 1st section */}
      <div className=" grid grid-cols-2 md:grid-cols-3 gap-5">
        <StructureCard
          style={amenitisCardStyle}
          Img={HiOutlineWifi}
          name={"Wifi"}
          onClick={handleStoreCardData}
          storedCardData={storedCardData}
          svgSize={svgSize}
          ptagStyle={amenitesPtagClass}
        />
        <StructureCard
          style={amenitisCardStyle}
          Img={PiTelevisionSimple}
          name={"TV"}
          onClick={handleStoreCardData}
          storedCardData={storedCardData}
          svgSize={svgSize}
          ptagStyle={amenitesPtagClass}
        />
        <StructureCard
          style={amenitisCardStyle}
          Img={MdOutlineKitchen}
          name={"Kitchen"}
          onClick={handleStoreCardData}
          storedCardData={storedCardData}
          svgSize={svgSize}
          ptagStyle={amenitesPtagClass}
        />
        <StructureCard
          style={amenitisCardStyle}
          Img={BiSolidWasher}
          name={"Washing Machine"}
          onClick={handleStoreCardData}
          storedCardData={storedCardData}
          svgSize={svgSize}
          ptagStyle={amenitesPtagClass}
        />
        <StructureCard
          style={amenitisCardStyle}
          Img={BsSpeedometer2}
          name={"Paid parking"}
          onClick={handleStoreCardData}
          storedCardData={storedCardData}
          svgSize={svgSize}
          ptagStyle={amenitesPtagClass}
        />
        <StructureCard
          style={amenitisCardStyle}
          Img={BsSnow}
          name={"Air conditioning"}
          onClick={handleStoreCardData}
          storedCardData={storedCardData}
          svgSize={svgSize}
          ptagStyle={amenitesPtagClass}
        />
        <StructureCard
          style={amenitisCardStyle}
          Img={BsPersonWorkspace}
          name={"Dedicated workspace"}
          onClick={handleStoreCardData}
          storedCardData={storedCardData}
          svgSize={svgSize}
          ptagStyle={amenitesPtagClass}
        />
        <StructureCard
          style={amenitisCardStyle}
          Img={AiOutlineCar}
          name={"Free parking"}
          onClick={handleStoreCardData}
          storedCardData={storedCardData}
          svgSize={svgSize}
          ptagStyle={amenitesPtagClass}
        />

        <StructureCard
          style={amenitisCardStyle}
          Img={MdTableRestaurant}
          name={"Study Table"}
          onClick={handleStoreCardData}
          storedCardData={storedCardData}
          svgSize={svgSize}
          ptagStyle={amenitesPtagClass}
        />

        <StructureCard
          style={amenitisCardStyle}
          Img={PiFanLight}
          name={"Fan"}
          onClick={handleStoreCardData}
          storedCardData={storedCardData}
          svgSize={svgSize}
          ptagStyle={amenitesPtagClass}
        />

        <StructureCard
          style={amenitisCardStyle}
          Img={LiaChairSolid}
          name={"Chair"}
          onClick={handleStoreCardData}
          storedCardData={storedCardData}
          svgSize={svgSize}
          ptagStyle={amenitesPtagClass}
        />
      </div>

      {/* 2nd section */}
      <div className=" flex flex-col gap-4">
        <h6 className=" text-lg text-[#222222] font-medium my-2">
          Do you have any stand out amenities?
        </h6>
        <div className=" grid grid-cols-2 md:grid-cols-3 gap-5">
          <StructureCard
            style={amenitisCardStyle}
            Img={MdOutlinePool}
            name={"Pool"}
            onClick={handleStoreCardData}
            storedCardData={storedCardData}
            svgSize={svgSize}
            ptagStyle={amenitesPtagClass}
          />
          <StructureCard
            style={amenitisCardStyle}
            Img={GiBathtub}
            name={"Bathtub"}
            onClick={handleStoreCardData}
            storedCardData={storedCardData}
            svgSize={svgSize}
            ptagStyle={amenitesPtagClass}
          />
          <StructureCard
            style={amenitisCardStyle}
            Img={PiCampfireLight}
            name={"Heater"}
            onClick={handleStoreCardData}
            storedCardData={storedCardData}
            svgSize={svgSize}
            ptagStyle={amenitesPtagClass}
          />
          {/* <StructureCard
            style={amenitisCardStyle}
            Img={MdDinnerDining}
            name={"Outdoor dining area"}
            onClick={handleStoreCardData}
            storedCardData={storedCardData}
            svgSize={svgSize}
            ptagStyle={amenitesPtagClass}
          /> */}
          {/* <StructureCard
            style={amenitisCardStyle}
            Img={CgPiano}
            name={"Music System"}
            onClick={handleStoreCardData}
            storedCardData={storedCardData}
            svgSize={svgSize}
            ptagStyle={amenitesPtagClass}
          /> */}
          <StructureCard
            style={amenitisCardStyle}
            Img={CiDumbbell}
            name={"Nearby Gym"}
            onClick={handleStoreCardData}
            storedCardData={storedCardData}
            svgSize={svgSize}
            ptagStyle={amenitesPtagClass}
          />
          <StructureCard
            style={amenitisCardStyle}
            Img={GiLift}
            name={"Lift Service"}
            onClick={handleStoreCardData}
            storedCardData={storedCardData}
            svgSize={svgSize}
            ptagStyle={amenitesPtagClass}
          />
          <StructureCard
            style={amenitisCardStyle}
            Img={TbSunElectricity}
            name={"24/7 Electricity"}
            onClick={handleStoreCardData}
            storedCardData={storedCardData}
            svgSize={svgSize}
            ptagStyle={amenitesPtagClass}
          />
        </div>
      </div>

      {/* 3rd section */}
      <div className=" flex flex-col gap-4">
        <h6 className=" text-lg text-[#222222] font-medium my-2">
          Do you have any of these safety items?
        </h6>
        <div className=" grid grid-cols-2 md:grid-cols-3 gap-5">
          <StructureCard
            style={amenitisCardStyle}
            Img={AiOutlineAlert}
            name={"Safety alarm"}
            onClick={handleStoreCardData}
            storedCardData={storedCardData}
            svgSize={svgSize}
            ptagStyle={amenitesPtagClass}
          />
          <StructureCard
            style={amenitisCardStyle}
            Img={BiSolidFirstAid}
            name={"First aid kit"}
            onClick={handleStoreCardData}
            storedCardData={storedCardData}
            svgSize={svgSize}
            ptagStyle={amenitesPtagClass}
          />
          <StructureCard
            style={amenitisCardStyle}
            Img={PiFireExtinguisher}
            name={"Fire extinguisher"}
            onClick={handleStoreCardData}
            storedCardData={storedCardData}
            svgSize={svgSize}
            ptagStyle={amenitesPtagClass}
          />
        </div>
      </div>
    </div>
  );
};

// styles for StructuredCard component
const amenitisCardStyle =
  "flex flex-col gap-1 px-6 rounded-xl transition duration-300 h-[120px] w-[150px] sm:w-[220px] cursor-pointer justify-center";
const amenitesPtagClass = "text-[#222222] text-base md:text-lg font-medium";

export default ListingRoomStepTwoAmenities;
