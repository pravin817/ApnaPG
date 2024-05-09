import { useState } from "react";
import search from "../../assets/BasicIcon/searchRed.svg";
import { PiCurrencyInrBold } from "react-icons/pi";


const RoomHostingDetails = () => {
  const ratePerNight = 100;
  const [perNight, setPerNight] = useState(1);
  const [isTooltipActive, setIsTooltipActive] = useState(false);

  // calculate the per night earning
  const perNightEarning = parseInt(perNight * ratePerNight);

  const handlePerNightChange = (e) => {
    setPerNight(e.target.value);
  };
  return (
    <div className=" flex flex-col gap-3 md:gap-5 md:mx-6">
      {/* Add the Heading  */}
      <div className=" flex flex-col gap-2 text-[#222222] font-medium text-2xl md:text-5xl text-center">
        <h1 className=" text-[#003B95] font-bold">Lease It</h1>
        <h1>You could earn.</h1>
      </div>
      {/* Add the amount  */}
      <p className=" flex items-center justify-center text-center text-[#222222] font-semibold text-3xl my-2 md:text-7xl md:my-4">
        <PiCurrencyInrBold />
        {perNightEarning}
      </p>
      {/* description of the amount  */}

      <div className="text-sm md:text-base text-[#222222] gap-1 justify-center h-5 flex items-center">
        {!isTooltipActive && (
          <>
            <span className=" font-medium underline underline-offset-3">
              {perNight} nights
            </span>
            <span className="flex items-center">
              {" "}
              at an estimated
              <PiCurrencyInrBold />
              {ratePerNight} a night
            </span>
          </>
        )}
      </div>

      {/* take the input  */}
      <div
        data-tip={`${perNight} nights`}
        className={`tooltip min-w-[250px] sm:min-w-[300px] md:min-w-[400px] mx-auto ${
          isTooltipActive ? " tooltip-open" : ""
        }`}
        onMouseEnter={() => {
          setIsTooltipActive((prev) => !prev);
        }}
        onMouseLeave={() => {
          setIsTooltipActive((prev) => !prev);
        }}
      >
        <input
          type="range"
          min={1}
          max={30}
          value={perNight}
          onChange={handlePerNightChange}
          className="w-full text-black text-lg range text-center"
        />
      </div>

      {/* how the pricing is determined  */}
      <p className="text-xs md:text-sm text-[#717171] underline font-medium text-center">
        Learn how we estimates you earnings
      </p>
      {/* selected places */}
      {/* <div className=" flex flex-row gap-4 items-center min-w-[300px] md:min-w-[400px] rounded-full border border-[#dddddd] mx-auto mt-3 px-7 py-3 cursor-pointer">
        <img src={search} alt="search" className="w-4 md:w-6" />
        <div className=" flex flex-col text-sm md:text-xs">
          <p>Where&apos;s your place?</p>
          <p>Entire Place{"•"} 0 bedrooms</p>
        </div>
      </div> */}
    </div>
  );
};

export default RoomHostingDetails;
