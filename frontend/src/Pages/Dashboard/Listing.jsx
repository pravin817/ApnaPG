import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { HiPlus } from "react-icons/hi";
import { useEffect, useState } from "react";
import ListingTable from "../../Components/Dashboard/Listing/ListingTable";
import RoomFilterCard from "../../Components/Dashboard/Listing/RoomFilterCard";
import AmenitiesFilterCard from "../../Components/Dashboard/Listing/AmenitiesFilterCard";
import ListingStatus from "../../Components/Dashboard/Listing/ListingStatus";

const Listing = () => {
  // get all listing data
  const allListingData = useSelector((state) => state.room.roomsData);

  console.log("The complete room listing data : ", allListingData);

  const isSmallDevice = window.innerWidth < 640;

  return (
    <main className=" max-w-screen-xl mx-auto px-4 sm:px-8 md:px-10 xl:px-20 pb-10">
      <section className="pt-8 flex flex-col gap-5">
        {/* All about the listing  */}
        <div className="flex flex-row justify-between items-center">
          <h3 className="text-xl text-[#222222] font-medium">
            {allListingData.length} listings
          </h3>
          <Link
            to="/become-a-host"
            className="flex flex-row items-center gap-[6px] text-sm font-medium px-4 py-3 bg-white hover:bg-[#f1f1f1] border-[#b0b0b0] border rounded-lg transition duration-200 ease-in"
          >
            <HiPlus />
            Create Listing
          </Link>
        </div>
        {/* Filtering Options  */}
        <div className="flex flex-row gap-5">
          {!isSmallDevice && (
            <>
              The different filter options for the listing
              {/* <RoomFilterCard /> */}
              {/* <AmenitiesFilterCard /> */}
              {/* <ListingStatus /> */}
            </>
          )}
        </div>
        {/* show all the listing in the form of the table  */}

        <ListingTable />
      </section>
    </main>
  );
};

export default Listing;
