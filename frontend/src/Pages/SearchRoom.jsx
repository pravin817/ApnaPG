import React, { useState, useEffect } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { API } from "../backend";
import { Link } from "react-router-dom";
import ReactSlider from "react-slider";
import "tailwindcss/tailwind.css"; // Ensure Tailwind CSS is imported
import { IoIosArrowDown, IoIosArrowUp, IoIosStar } from "react-icons/io";
import SkeletonRoomCard from "../Components/skeletonLoading/SkeletonRoomCard";

const amenitiesList = [
  "Wifi",
  "TV",
  "Washing Machine",
  "Air conditioning",
  "Kitchen",
  "Dedicated workspace",
  "Paid parking",
  "Free parking",
  "Study Table",
  "Fan",
  "Chair",
];

const standOutList = [
  "Pool",
  "Bathtub",
  "Heater",
  "Nearby Gym",
  "Lift Service",
  "24/7 Electricity",
];

const SearchRoom = () => {
  const [rooms, setRooms] = useState([]);
  const [filters, setFilters] = useState({
    roomType: "",
    privacyType: "",
    guests: 1,
    minPrice: 0,
    maxPrice: 10000,
    amenities: [],
    bedrooms: 0,
    bathrooms: 0,
  });
  const [showAmenities, setShowAmenities] = useState(true);
  const [showStandOut, setShowStandOut] = useState(true);
  const [showPrice, setShowPrice] = useState(true);

  const {
    data: allListingData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["allListing"],
    queryFn: async () => {
      const res = await axios.get(`${API}room/get-all-listing`);
      return res.data.allListingData;
    },
  });

  useEffect(() => {
    if (allListingData) {
      setRooms(allListingData);
    }
  }, [allListingData]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handlePriceChange = (values) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      minPrice: values[0],
      maxPrice: values[1],
    }));
  };

  const handleAmenityChange = (e) => {
    const { value } = e.target;
    setFilters((prevFilters) => {
      if (prevFilters.amenities.includes(value)) {
        return {
          ...prevFilters,
          amenities: prevFilters.amenities.filter(
            (amenity) => amenity !== value
          ),
        };
      } else {
        return {
          ...prevFilters,
          amenities: [...prevFilters.amenities, value],
        };
      }
    });
  };

  const increaseCount = (field) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [field]: prevFilters[field] + 1,
    }));
  };

  const decreaseCount = (field) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [field]: prevFilters[field] > 0 ? prevFilters[field] - 1 : 0,
    }));
  };

  const filteredRooms = rooms.filter((room) => {
    const matchesRoomType =
      filters.roomType === "" || room.roomType === filters.roomType;
    const matchesPrivacyType =
      filters.privacyType === "" || room.privacyType === filters.privacyType;
    const matchesGuests = room.floorPlan.guests >= filters.guests;
    const matchesPrice =
      room.basePrice >= filters.minPrice && room.basePrice <= filters.maxPrice;
    const matchesAmenities = filters.amenities.every((amenity) =>
      room.amenities.includes(amenity)
    );
    const matchesBedrooms =
      filters.bedrooms === 0 || room.floorPlan.bedrooms >= filters.bedrooms;
    const matchesBathrooms =
      filters.bathrooms === 0 || room.floorPlan.bathrooms >= filters.bathrooms;
    return (
      matchesRoomType &&
      matchesPrivacyType &&
      matchesGuests &&
      matchesPrice &&
      matchesAmenities &&
      matchesBedrooms &&
      matchesBathrooms
    );
  });

  // if (isLoading) return <SkeletonRoomCard/>;
  if (error) return <p>Error loading rooms</p>;

  return (
    <div className="flex">
      <div className="w-1/4 p-4 sticky top-20 h-screen overflow-auto custom-scrollbar">
        <h2 className="text-2xl mb-4">Filters</h2>
        <div className="mb-4">
          <label className="block mb-1">Room Type</label>
          <select
            name="roomType"
            value={filters.roomType}
            onChange={handleFilterChange}
            className="w-full p-2 border rounded"
          >
            <option value="">All</option>
            <option value="House">House</option>
            <option value="Hostel">Hostel</option>
            <option value="PG">PG</option>
            <option value="Hotel">Hotel</option>
            <option value="1 BHK">1 BHK</option>
            <option value="2 BHK">2 BHK</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-1">Privacy Type</label>
          <select
            name="privacyType"
            value={filters.privacyType}
            onChange={handleFilterChange}
            className="w-full p-2 border rounded"
          >
            <option value="">All</option>
            <option value="An entire place">An entire place</option>
            <option value="A room">A room</option>
            <option value="A shared room">A shared room</option>
          </select>
        </div>

        {/* The Guest Count Section  */}
        <div className="mb-4">
          <hr className="border-t border-gray-300 my-4" />
          <div className="border border-gray-500 flex items-center justify-between p-2 rounded-md">
            <label className="block mb-1">Guests</label>
            <div className="flex items-center">
              <button
                className="px-2 py-1 border border-gray-300  rounded mr-2"
                onClick={() => decreaseCount("guests")}
              >
                -
              </button>
              <span>{filters.guests}</span>
              <button
                className="px-2 py-1 border border-gray-300  rounded ml-2"
                onClick={() => increaseCount("guests")}
              >
                +
              </button>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <hr className="border-t border-gray-300 my-4" />

          <div className="border border-gray-500 flex items-center justify-between p-2 rounded-md">
            <label className="block mb-1">Bedrooms</label>
            <div className="flex items-center">
              <button
                className="px-2 py-1 border border-gray-300 rounded mr-2"
                onClick={() => decreaseCount("bedrooms")}
              >
                -
              </button>
              <span>{filters.bedrooms}</span>
              <button
                className="px-2 py-1 border border-gray-300 rounded ml-2"
                onClick={() => increaseCount("bedrooms")}
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Bathrooms Count Section  */}
        <div className="mb-4">
          <hr className="border-t border-gray-300 my-4" />
          <div className="border border-gray-500 flex items-center justify-between p-2 rounded-md">
            <label className="block mb-1">Bathrooms</label>
            <div className="flex items-center">
              <button
                className="px-2 py-1 border border-gray-300 rounded mr-2"
                onClick={() => decreaseCount("bathrooms")}
              >
                -
              </button>
              <span>{filters.bathrooms}</span>
              <button
                className="px-2 py-1 border border-gray-300 rounded ml-2"
                onClick={() => increaseCount("bathrooms")}
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Price section  */}
        <div className="mb-1 p-2">
          <hr className="border-t border-gray-300 my-4" />

          <div
            className="flex items-center justify-start hover:cursor-pointer mt-2"
            onClick={() => setShowPrice(!showPrice)}
          >
            <p className="font-semibold mr-1">Price Range</p>
            {showPrice ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </div>

          {showPrice && (
            <div className=" mb-2 flex flex-col justify-between ">
              <ReactSlider
                className="horizontal-slider w-full h-2 bg-gray-200 rounded-md mb-4 mt-4 flex items-center"
                thumbClassName="thumb bg-blue-500 h-5 w-5 rounded-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-300"
                trackClassName="track bg-blue-300 h-full"
                defaultValue={[filters.minPrice, filters.maxPrice]}
                ariaLabel={["Lower thumb", "Upper thumb"]}
                step={10}
                min={0}
                max={10000}
                value={[filters.minPrice, filters.maxPrice]}
                onChange={handlePriceChange}
              />
              <div className="flex justify-between text-sm text-gray-600">
                <span>₹ {filters.minPrice}</span>
                <span>₹ {filters.maxPrice}</span>
              </div>
            </div>
          )}
        </div>

        {/* Amenities section */}
        <div className="mb-1 p-2">
          <hr className="border-t border-gray-300 my-4" />

          <div
            className="flex items-center justify-start hover:cursor-pointer mt-2"
            onClick={() => setShowAmenities(!showAmenities)}
          >
            <p className="font-semibold mr-1">Amenities</p>
            {showAmenities ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </div>

          {showAmenities && (
            <div className="mt-4">
              {amenitiesList.map((amenity) => (
                <div key={amenity} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    value={amenity}
                    checked={filters.amenities.includes(amenity)}
                    onChange={handleAmenityChange}
                    className="mr-2"
                  />
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Stand out section  */}
        <div className="mb-1 p-2">
          <hr className="border-t border-gray-300 my-1" />

          <div
            className="flex items-center justify-start hover:cursor-pointer mt-2"
            onClick={() => setShowStandOut(!showStandOut)}
          >
            <p className="font-semibold mr-1">Stand Out</p>
            {showStandOut ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </div>

          {showStandOut && (
            <div className="mt-4">
              {standOutList.map((standout) => (
                <div key={standout} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    value={standout}
                    checked={filters.amenities.includes(standout)}
                    onChange={handleAmenityChange}
                    className="mr-2"
                  />
                  <span>{standout}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="w-3/4 p-4">
        <h2 className="text-2xl mb-4">Search Results</h2>
        <div className="grid grid-cols-1 gap-4">
          {isLoading ? (
            Array(6)
              .fill(0)
              .map((_, index) => <SkeletonRoomCard key={index} />)
          ) : filteredRooms.length > 0 ? (
            filteredRooms.map((room) => <RoomCard room={room} key={room._id} />)
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <p className="text-xl text-gray-500">No rooms found</p>
                <p className="text-gray-400">
                  Try adjusting your filters or search criteria
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const RoomCard = ({ room }) => {
  const [currentImage, setCurrentImage] = useState(room?.photos[0]);

  return (
    <Link
      to={`/rooms/${room?._id}`}
      className="p-4 border rounded shadow hover:shadow-lg transition flex"
    >
      <div className="flex-shrink-0 mr-10">
        <img
          src={currentImage}
          alt={room?.title}
          className="w-72 h-48 object-cover rounded mb-4"
        />
        <div className="flex justify-center gap-2 mb-4">
          {room?.photos.slice(0, 3).map((photo, index) => (
            <img
              key={index}
              src={photo}
              alt={`Thumbnail ${index}`}
              className="w-16 h-16 object-cover rounded cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                setCurrentImage(photo);
              }}
            />
          ))}
        </div>
      </div>
      <div className="flex-grow">
        <h3 className="text-xl font-semibold mb-2 flex items-center">
          <span className="flex items-center mr-2">
            {room?.rating ? (
              room?.rating
            ) : (
              <div className="flex text-green-900 items-center text-sm bg-green-100 px-2 py-1 rounded-md gap-1">
                <IoIosStar />
                New
              </div>
            )}
          </span>
          {room?.title}
        </h3>
        <p className="text-xs sm:text-xs font-medium underline mb-2">
          {room?.location?.addressLineOne ||
            room?.location?.addressLineTwo ||
            room?.location?.country?.name}
        </p>
        <p className="text-gray-600 text-[15.50px]">
          Room Type: {room?.roomType}
        </p>
        <p className="text-gray-600 text-[15.50px]">
          Privacy Type: {room?.privacyType}
        </p>
        <p className="text-gray-600 text-[15.50px]">
          Guests: {room?.floorPlan.guests}
        </p>
        <p className="text-gray-600 text-[15.50px]">
          Bedrooms: {room?.floorPlan.bedrooms}
        </p>
        <p className="text-gray-600 text-[15.50px]">
          Bathrooms: {room?.floorPlan.bathRoomsNumber}
        </p>
        <p className="text-gray-600 text-[15.50px]">
          Amenities: {room?.amenities.slice(0, 10).join(", ")}
        </p>
        <p className="text-gray-600 text-[15.50px] mt-2">
          From ₹ {room?.basePrice}/Day
        </p>
      </div>
    </Link>
  );
};

export default SearchRoom;
