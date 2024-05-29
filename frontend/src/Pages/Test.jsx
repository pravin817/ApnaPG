import React, { useState, useEffect } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import api, { API } from "../backend";
import { Link, useSearchParams } from "react-router-dom";
import ReactSlider from "react-slider";
import "tailwindcss/tailwind.css"; // Ensure Tailwind CSS is imported
import {
  IoIosArrowDown,
  IoIosArrowUp,
  IoIosStar,
  IoIosClose,
} from "react-icons/io";
import SkeletonRoomCard from "../Components/skeletonLoading/SkeletonRoomCard";
import toast from "react-hot-toast";

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
  // Get the data from the search params
  const [searchParams] = useSearchParams();
  console.log("The search params are: ", searchParams);

  const searchParamsObj = Object.fromEntries([...searchParams]);
  console.log("The search params object is: ", searchParamsObj);

  const city = searchParamsObj?.city;
  const checkIn = searchParamsObj?.checkIn;
  const checkOut = searchParamsObj?.checkOut;

  const [rooms, setRooms] = useState([]);
  const [filters, setFilters] = useState({
    roomType: "",
    privacyType: "",
    guests: parseInt(searchParamsObj?.guests) || 1,
    minPrice: 0,
    maxPrice: 10000,
    amenities: [],
    bedrooms: 0,
    bathrooms: 0,
  });
  const [showAmenities, setShowAmenities] = useState(true);
  const [showStandOut, setShowStandOut] = useState(true);
  const [showPrice, setShowPrice] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isFilterPopupOpen, setIsFilterPopupOpen] = useState(false);

  useEffect(() => {
    const fetchSearchRooms = async () => {
      setIsLoading(true);
      const res = await api.post(
        "/room/search-room",
        { city: city, checkIn: checkIn, checkOut: checkOut },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(res);
      if (res?.data?.success) {
        setIsLoading(false);
        setRooms(res?.data?.rooms);
      } else {
        setIsLoading(false);
        toast.error("No room found");
      }
    };

    fetchSearchRooms();
  }, []);

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
    const matchesGuests =
      room.floorPlan && room.floorPlan.guests >= filters.guests;
    const matchesPrice =
      room.basePrice >= filters.minPrice && room.basePrice <= filters.maxPrice;
    const matchesAmenities = filters.amenities.every((amenity) =>
      room.amenities.includes(amenity)
    );
    const matchesBedrooms =
      filters.bedrooms === 0 ||
      (room.floorPlan && room.floorPlan.bedrooms >= filters.bedrooms);
    const matchesBathrooms =
      filters.bathrooms === 0 ||
      (room.floorPlan && room.floorPlan.bathRoomsNumber >= filters.bathrooms);
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

  return (
    <div className="flex flex-col md:flex-row">
      {/* Filter Button for Small Devices */}
      <button
        className="md:hidden bg-blue-500 text-white p-2 rounded fixed top-4 right-4 z-10"
        onClick={() => setIsFilterPopupOpen(true)}
      >
        Filters
      </button>

      {/* Filter Sidebar for Large Devices */}
      <div className="hidden md:block w-full md:w-1/4 p-4 sticky top-20 h-screen overflow-auto custom-scrollbar">
        <h2 className="text-2xl mb-4">Filters</h2>
        {/* Filters Form */}
        <FiltersForm
          filters={filters}
          showAmenities={showAmenities}
          setShowAmenities={setShowAmenities}
          showStandOut={showStandOut}
          setShowStandOut={setShowStandOut}
          showPrice={showPrice}
          setShowPrice={setShowPrice}
          handleFilterChange={handleFilterChange}
          handlePriceChange={handlePriceChange}
          handleAmenityChange={handleAmenityChange}
          increaseCount={increaseCount}
          decreaseCount={decreaseCount}
        />
      </div>

      {/* Filter Popup for Small Devices */}
      {isFilterPopupOpen && (
        <div className="fixed inset-0 bg-white z-20 overflow-auto p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl">Filters</h2>
            <button
              className="text-2xl"
              onClick={() => setIsFilterPopupOpen(false)}
            >
              <IoIosClose />
            </button>
          </div>
          <FiltersForm
            filters={filters}
            showAmenities={showAmenities}
            setShowAmenities={setShowAmenities}
            showStandOut={showStandOut}
            setShowStandOut={setShowStandOut}
            showPrice={showPrice}
            setShowPrice={setShowPrice}
            handleFilterChange={handleFilterChange}
            handlePriceChange={handlePriceChange}
            handleAmenityChange={handleAmenityChange}
            increaseCount={increaseCount}
            decreaseCount={decreaseCount}
          />
          <button
            className="w-full bg-blue-500 text-white p-2 rounded mt-4"
            onClick={() => setIsFilterPopupOpen(false)}
          >
            Apply Filters
          </button>
        </div>
      )}

      {/* Room List */}
      <div className="w-full md:w-3/4 p-4">
        {isLoading ? (
          <>
            <SkeletonRoomCard />
            <SkeletonRoomCard />
            <SkeletonRoomCard />
            <SkeletonRoomCard />
          </>
        ) : filteredRooms.length > 0 ? (
          filteredRooms.map((room) => (
            <RoomCard key={room._id} room={room} city={city} />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[70vh]">
            <img
              src="https://cdn-icons-png.flaticon.com/512/4076/4076432.png"
              alt="No results"
              className="w-40 h-40 mb-4"
            />
            <h2 className="text-2xl font-semibold">No Results Found</h2>
            <p className="text-gray-600">Try adjusting your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const FiltersForm = ({
  filters,
  showAmenities,
  setShowAmenities,
  showStandOut,
  setShowStandOut,
  showPrice,
  setShowPrice,
  handleFilterChange,
  handlePriceChange,
  handleAmenityChange,
  increaseCount,
  decreaseCount,
}) => {
  return (
    <>
      <div className="mb-4">
        <label className="block mb-2">Room Type</label>
        <select
          name="roomType"
          value={filters.roomType}
          onChange={handleFilterChange}
          className="w-full p-2 border rounded"
        >
          <option value="">All</option>
          <option value="Apartment">Apartment</option>
          <option value="House">House</option>
          <option value="Hotel">Hotel</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-2">Privacy Type</label>
        <select
          name="privacyType"
          value={filters.privacyType}
          onChange={handleFilterChange}
          className="w-full p-2 border rounded"
        >
          <option value="">All</option>
          <option value="Private room">Private room</option>
          <option value="Entire place">Entire place</option>
          <option value="Shared room">Shared room</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-2">Guests</label>
        <input
          type="number"
          name="guests"
          value={filters.guests}
          onChange={handleFilterChange}
          className="w-full p-2 border rounded"
          min="1"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Bedrooms</label>
        <div className="flex items-center">
          <button
            type="button"
            className="p-2 border rounded"
            onClick={() => decreaseCount("bedrooms")}
          >
            -
          </button>
          <input
            type="number"
            name="bedrooms"
            value={filters.bedrooms}
            onChange={handleFilterChange}
            className="w-full p-2 border rounded mx-2"
            min="0"
          />
          <button
            type="button"
            className="p-2 border rounded"
            onClick={() => increaseCount("bedrooms")}
          >
            +
          </button>
        </div>
      </div>
      <div className="mb-4">
        <label className="block mb-2">Bathrooms</label>
        <div className="flex items-center">
          <button
            type="button"
            className="p-2 border rounded"
            onClick={() => decreaseCount("bathrooms")}
          >
            -
          </button>
          <input
            type="number"
            name="bathrooms"
            value={filters.bathrooms}
            onChange={handleFilterChange}
            className="w-full p-2 border rounded mx-2"
            min="0"
          />
          <button
            type="button"
            className="p-2 border rounded"
            onClick={() => increaseCount("bathrooms")}
          >
            +
          </button>
        </div>
      </div>
      <div className="mb-4">
        <button
          type="button"
          className="w-full flex justify-between items-center p-2 border rounded"
          onClick={() => setShowPrice(!showPrice)}
        >
          <span>Price Range</span>
          <span>{showPrice ? <IoIosArrowUp /> : <IoIosArrowDown />}</span>
        </button>
        {showPrice && (
          <div className="mt-2">
            <ReactSlider
              className="w-full h-2 bg-gray-300 rounded-full"
              thumbClassName="h-4 w-4 bg-blue-500 rounded-full cursor-pointer"
              trackClassName="bg-blue-500 rounded-full"
              min={0}
              max={10000}
              step={100}
              value={[filters.minPrice, filters.maxPrice]}
              onChange={handlePriceChange}
            />
            <div className="flex justify-between mt-2">
              <span>${filters.minPrice}</span>
              <span>${filters.maxPrice}</span>
            </div>
          </div>
        )}
      </div>
      <div className="mb-4">
        <button
          type="button"
          className="w-full flex justify-between items-center p-2 border rounded"
          onClick={() => setShowAmenities(!showAmenities)}
        >
          <span>Amenities</span>
          <span>{showAmenities ? <IoIosArrowUp /> : <IoIosArrowDown />}</span>
        </button>
        {showAmenities && (
          <div className="mt-2">
            {amenitiesList.map((amenity) => (
              <div key={amenity} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  value={amenity}
                  checked={filters.amenities.includes(amenity)}
                  onChange={handleAmenityChange}
                  className="mr-2"
                />
                <label>{amenity}</label>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="mb-4">
        <button
          type="button"
          className="w-full flex justify-between items-center p-2 border rounded"
          onClick={() => setShowStandOut(!showStandOut)}
        >
          <span>Stand Out Features</span>
          <span>{showStandOut ? <IoIosArrowUp /> : <IoIosArrowDown />}</span>
        </button>
        {showStandOut && (
          <div className="mt-2">
            {standOutList.map((feature) => (
              <div key={feature} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  value={feature}
                  checked={filters.amenities.includes(feature)}
                  onChange={handleAmenityChange}
                  className="mr-2"
                />
                <label>{feature}</label>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

const RoomCard = ({ room, city }) => {
  return (
    <Link to={`/rooms/${room._id}?city=${city}`} className="block mb-4">
      <div className="border rounded-lg overflow-hidden flex">
        <img
          src={room.photos[0]}
          alt={room.title}
          className="w-1/3 object-cover"
        />
        <div className="w-2/3 p-4">
          <h3 className="text-lg font-semibold">{room.title}</h3>
          <p className="text-gray-600">{room.description}</p>
          <p className="text-gray-800 mt-2">${room.basePrice} / night</p>
          <div className="flex items-center mt-2">
            <IoIosStar className="text-yellow-500" />
            <span className="ml-1">{room.rating}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SearchRoom;
