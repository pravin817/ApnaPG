import { useState, useEffect } from "react";
import api from "../backend";
import { Link, useSearchParams } from "react-router-dom";
import ReactSlider from "react-slider";
import { IoIosArrowDown, IoIosArrowUp, IoIosStar } from "react-icons/io";
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
  }, [city, checkIn, checkOut]);

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
      <div className="w-full md:w-1/4 p-4 sticky top-20 h-screen overflow-auto custom-scrollbar">
        <h2 className="text-xl mb-4 font-semibold">Filters</h2>
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

        {/* The Amenities Section */}
        <div className="mb-4">
          <hr className="border-t border-gray-300 my-4" />
          <div
            className="flex items-center justify-between w-full cursor-pointer"
            onClick={() => setShowAmenities(!showAmenities)}
          >
            <h2 className="text-lg font-medium">Amenities</h2>
            {showAmenities ? (
              <IoIosArrowUp className="text-lg" />
            ) : (
              <IoIosArrowDown className="text-lg" />
            )}
          </div>

          {showAmenities && (
            <div className="grid grid-cols-2 gap-2 mt-2">
              {amenitiesList.map((amenity) => (
                <label key={amenity} className="flex items-center">
                  <input
                    type="checkbox"
                    value={amenity}
                    checked={filters.amenities.includes(amenity)}
                    onChange={handleAmenityChange}
                    className="mr-2"
                  />
                  {amenity}
                </label>
              ))}
            </div>
          )}
        </div>

        {/* The StandOut Section */}
        <div className="mb-4">
          <hr className="border-t border-gray-300 my-4" />
          <div
            className="flex items-center justify-between w-full cursor-pointer"
            onClick={() => setShowStandOut(!showStandOut)}
          >
            <h2 className="text-lg font-medium">Stand Out Amenities</h2>
            {showStandOut ? (
              <IoIosArrowUp className="text-lg" />
            ) : (
              <IoIosArrowDown className="text-lg" />
            )}
          </div>
          {showStandOut && (
            <div className="grid grid-cols-2 gap-2 mt-2">
              {standOutList.map((amenity) => (
                <label key={amenity} className="flex items-center">
                  <input
                    type="checkbox"
                    value={amenity}
                    checked={filters.amenities.includes(amenity)}
                    onChange={handleAmenityChange}
                    className="mr-2"
                  />
                  {amenity}
                </label>
              ))}
            </div>
          )}
        </div>
      </div>

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

const RoomCard = ({ room }) => {
  const [currentImage, setCurrentImage] = useState(room?.photos?.[0]);

  return (
    <div className="mb-6 bg-white shadow-md rounded-lg overflow-hidden transition-transform transform duration-300 ease-in-out">

      <h2 className="text-xl mb-4 font-semibold">Search Results</h2>

      <Link
        to={`/rooms/${room?._id}`}
        className="block md:flex md:items-start p-4 border rounded hover:shadow-lg transition"
      >
        <div className="w-80 flex flex-col gap-2 ">
          <img
            src={currentImage || "path/to/default/image.jpg"}
            alt={room?.title || "Room Image"}
            className="w-full h-48 md:h-64 object-cover rounded mb-4 md:mb-0"
          />
          <div className="flex justify-center gap-2 mb-4 md:mb-0">
            {room?.photos?.slice(0, 3).map((photo, index) => (
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
        <div className="w-full md:w-1/2 md:ml-4">
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
          <p className="text-xs sm:text-sm font-medium underline mb-2">
            {room?.location?.addressLineOne ||
              room?.location?.addressLineTwo ||
              room?.location?.country?.name}
          </p>
          <p className="text-gray-600 text-sm">Room Type: {room?.roomType}</p>
          <p className="text-gray-600 text-sm">
            Privacy Type: {room?.privacyType}
          </p>
          <p className="text-gray-600 text-sm">
            Guests: {room?.floorPlan?.guests}
          </p>
          <p className="text-gray-600 text-sm">
            Bedrooms: {room?.floorPlan?.bedrooms}
          </p>
          <p className="text-gray-600 text-sm">
            Bathrooms: {room?.floorPlan?.bathRoomsNumber}
          </p>
          <p className="text-gray-600 text-sm">
            Amenities: {room?.amenities?.slice(0, 10).join(", ")}
          </p>
          <p className="text-gray-600 text-sm mt-2">
            From ₹ {room?.basePrice}/Day
          </p>
        </div>
      </Link>
    </div>
  );
};

export default SearchRoom;
