// Import the assets
import { PiHouseLine } from "react-icons/pi";
import { MdOutlineApartment } from "react-icons/md";
import { TbSailboat2, TbCamper } from "react-icons/tb";

import { LiaHotelSolid } from "react-icons/lia";
import { AiOutlineApartment } from "react-icons/ai";

import StructureCard from "../../Components/ListingRoom/StructureCard";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createNewRoom } from "../../redux/actions/roomActions";

const ListingRoomStepOneStructure = () => {
  const [storedCardData, setStoredCardData] = useState("");
  const dispatch = useDispatch();

  const svgSize = window.innerWidth < 768 ? 30 : 40;

  const handleStoreCardData = (name) => {
    console.log("The selected structure is: ", name);
    setStoredCardData(name);
    dispatch(createNewRoom(name));
  };

  return (
    <div className=" flex flex-col gap-10 max-w-screen-md mx-auto my-6">
      <h1 className=" text-[#222222] text-xl sm:text-2xl md:text-[32px] font-medium">
        Which of these best describes <br /> your place?
      </h1>
      <div className=" grid grid-cols-2 md:grid-cols-3 gap-5 mx-auto md:mx-0">
        <StructureCard
          style={structureCardStyle}
          Img={PiHouseLine}
          name={"House"}
          onClick={handleStoreCardData}
          storedCardData={storedCardData}
          svgSize={svgSize}
          ptagStyle={structurePtagClass}
        />
        <StructureCard
          style={structureCardStyle}
          Img={MdOutlineApartment}
          name={"Hostel"}
          onClick={handleStoreCardData}
          storedCardData={storedCardData}
          svgSize={svgSize}
          ptagStyle={structurePtagClass}
        />
        <StructureCard
          style={structureCardStyle}
          Img={TbSailboat2}
          name={"1 BHK"}
          onClick={handleStoreCardData}
          storedCardData={storedCardData}
          svgSize={svgSize}
          ptagStyle={structurePtagClass}
        />
        <StructureCard
          style={structureCardStyle}
          Img={AiOutlineApartment}
          name={"2 BHK"}
          onClick={handleStoreCardData}
          storedCardData={storedCardData}
          svgSize={svgSize}
          ptagStyle={structurePtagClass}
        />
        <StructureCard
          style={structureCardStyle}
          Img={TbCamper}
          name={"PG"}
          onClick={handleStoreCardData}
          storedCardData={storedCardData}
          svgSize={svgSize}
          ptagStyle={structurePtagClass}
        />
        <StructureCard
          style={structureCardStyle}
          Img={LiaHotelSolid}
          name={"Hotel"}
          onClick={handleStoreCardData}
          storedCardData={storedCardData}
          svgSize={svgSize}
          ptagStyle={structurePtagClass}
        />
      </div>
    </div>
  );
};

// styles for STructuredCard component
const structureCardStyle =
  "flex flex-col gap-1 px-6 rounded-xl transition duration-300 h-[120px] w-[150px] sm:w-[220px] cursor-pointer justify-center";
const structurePtagClass = "text-[#222222] text-base md:text-lg font-medium";

export default ListingRoomStepOneStructure;
