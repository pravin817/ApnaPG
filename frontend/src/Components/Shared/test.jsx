import { useState, useEffect, useRef } from "react";
import {
  FaChevronDown,
  FaMinusCircle,
  FaPlusCircle,
  FaSearch,
} from "react-icons/fa";
import { FaHouseDamage } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUser, userLogOut } from "../../redux/actions/userActions";

import searchIcon from "../../assets/BasicIcon/Search.svg";
import hamburgerMenu from "../../assets/BasicIcon/HamburgerMenu.svg";
import userProfile from "../../assets/BasicIcon/UserProfile.png";
import house from "../../assets/BasicIcon/houseWhite.png";
import { IoIosCloseCircle } from "react-icons/io";

import AuthenticationPopUp from "../PopUp/authentication/AuthenticationPopUp";
import DashboardMenu from "./DashboardMenu";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { DateRange } from "react-date-range";
import { City } from "country-state-city";

const Navbar = () => {
  // refs
  const calendarRef = useRef();
  const dropdownRef = useRef();
  const cityPopupRef = useRef();
  const guestPopupRef = useRef();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // handling outside click
  const { state: calendarState, setState: setCalendarState } =
    useOutsideClick(calendarRef);
  const { state: showDropdown, setState: setShowDropdown } =
    useOutsideClick(dropdownRef);
  const { state: showCityPopup, setState: setShowCityPopup } =
    useOutsideClick(cityPopupRef);
  const { state: showGuestPopup, setState: setShowGuestPopup } =
    useOutsideClick(guestPopupRef);

  // dates saving and showing to the dateRange calendar calculation here
  const [selectedDates, setSelectedDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  // Formatted dates to store in DB
  const formattedStartDate = selectedDates[0]?.startDate?.toISOString();
  const formattedEndDate = selectedDates[0]?.endDate?.toISOString();

  // Convert the formatted dated to local dates for the user to see
  const localStartDate = new Date(formattedStartDate).toLocaleDateString();
  const localEndDate = new Date(formattedEndDate).toLocaleDateString();

  // Handle the date selection
  const handleSelect = (date) => {
    setSelectedDates([date.selection]);
  };

  const [totalGuest, setTotalGuest] = useState(1);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [popup, setPopup] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showExtendedSearch, setShowExtendedSearch] = useState(true);
  const [hideSmallSearch, setHideSmallSearch] = useState(true);

  // Search
  const [city, setCity] = useState("");
  const [guestCount, setGuestCount] = useState(1);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    // Fetch all cities from the Country 'IN' (India)
    const allCities = City.getCitiesOfCountry("IN");
    setCities(allCities);
  }, []);

  // Filter cities based on the input search text
  const filteredCities = cities.filter((c) =>
    c.name.toLowerCase().startsWith(city.toLowerCase())
  );

  const handleCitySelect = (selectedCity) => {
    setCity(selectedCity);
    setShowCityPopup(false);
  };

  const handleGuestCountChange = (count) => {
    setGuestCount(count);
    setShowGuestPopup(false);
  };

  const handleSearchClick = () => {
    setSearchPopupOpen(true);
  };

  const handleCloseSearchPopup = () => {
    setSearchPopupOpen(false);
  };

  const userMenuRef = useRef(null);
  const location = useLocation();
  const pathName = location.pathname;

  const inUserProfile = pathName.includes("/users/show/");
  const inUserDashboard = pathName?.includes("/users/dashboard/");
  const inHostRoomsLandingPage = pathName.includes("/host/rooms");
  const inListingDetailsPage = pathName?.includes("/listing");
  const inBookingPage = pathName?.includes("/book/stays");
  const isSmallDevice = window.innerWidth < 768;

  // get the user
  const user = useSelector((state) => state.user.userDetails);

  // Get the user id
  const userId = user?._id;

  const handleLogOut = () => {
    dispatch(userLogOut());
  };

  // get the user details
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  // Close the user menu when clicked outside of the menu
  useEffect(() => {
    const handleOutSideClick = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener("mouseup", handleOutSideClick);
    return () => {
      document.removeEventListener("mouseup", handleOutSideClick);
    };
  }, []);

  const handleSearch = () => {
    if (city === "") {
      setCity("Karad");
    }
    navigate(
      `/search?city=${city}&guests=${guestCount}&checkIn=${formattedStartDate}&checkOut=${formattedEndDate}`
    );
  };

  return (
    <nav
      className={`border-b-[1.4px] border-[#003B95] sticky top-0 z-[99]  bg-[#003B95] ${
        inBookingPage && "hidden md:block"
      }`}
    >
      <div
        className={`xl:px-10 py-5 xl:mx-auto items-center px-5 relative ${
          inUserProfile ||
          inUserDashboard ||
          inHostRoomsLandingPage ||
          inListingDetailsPage
            ? " max-w-screen-xl"
            : " max-w-screen-2xl"
        }
        ${
          inUserDashboard || inHostRoomsLandingPage
            ? "flex flex-row justify-between"
            : "grid grid-cols-2 lg:grid-cols-3 gap-2"
        }
        ${inHostRoomsLandingPage ? " xl:px-20" : ""}
        `}
      >
        {/* The Company logo */}
        <div className="md:w-[160px]">
          <span className="flex flex-row gap-2 items-center max-w-[120px]">
            <Link
              className="text-xl text-white font-bold"
              onClick={() => {
                JSON.stringify(localStorage.setItem("category", "House"));
              }}
              to={"/"}
            >
              ApnaPG
            </Link>
          </span>
        </div>

        {/* if not in the booking page then show the options 👇 */}
        {inBookingPage ? (
          <div className=" flex items-center justify-start w-1/4 h-full"></div>
        ) : (
          <>
            {/* searchbar */}
            {inUserProfile || inUserDashboard || inHostRoomsLandingPage ? (
              // if user is in dashboard
              <div>{inUserDashboard && <DashboardMenu />} </div>
            ) : (
              <div className="lg:block hidden">
                <div className="flex items-center justify-between transition-all cursor-pointer">
                  <div className="flex flex-col w-full transition duration-200">
                    <div className=" flex justify-between items-center border bg-white w-full rounded-lg m-0">
                      {/* Location */}
                      <div
                        className="px-3 py-3 ml-1"
                        onClick={() => setShowCityPopup(true)}
                      >
                        <p className="text-[10px] text-black font-semibold uppercase">
                          Location
                        </p>
                        <p className="text-sm text-[#222222]">
                          {city === "" ? "Karad" : city}
                        </p>
                      </div>

                      <div className="  w-2/4 min-h[60px] relative flex flex-col">
                        <div
                          onClick={() => {
                            setCalendarState((prev) => !prev);
                          }}
                          className="grid grid-cols-2 cursor-pointer"
                        >
                          <div className="px-3 py-3 border-l-2">
                            <p className="text-[10px] text-black font-semibold uppercase">
                              Check-in
                            </p>
                            <p className="text-sm text-[#222222]">
                              {localStartDate}
                            </p>
                          </div>

                          <div className="px-3 py-3 border-l-2">
                            <p className="text-[10px] text-black font-semibold uppercase">
                              Checkout
                            </p>
                            <p className="text-sm text-[#222222]">
                              {localEndDate}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Guest Count */}
                      <div
                        className="px-3 py-3 border-l-2"
                        onClick={() => setShowGuestPopup(true)}
                      >
                        <p className="text-[10px] text-black font-semibold uppercase">
                          {guestCount === 1 ? "Guest" : "Guests"}
                        </p>
                        <p className="text-sm text-[#222222]">{guestCount}</p>
                      </div>

                      <button
                        onClick={handleSearch}
                        className="bg-[#003B95] h-full flex items-center justify-center rounded-lg m-1 aspect-square"
                      >
                        <FaSearch className="text-white" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Hamburger menu */}
            <div className="flex items-center justify-end relative">
              <span
                className="hover:scale-105 transition-all duration-100 cursor-pointer"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <img
                  src={hamburgerMenu}
                  alt="search"
                  className="aspect-square w-8 md:w-10"
                />
              </span>
              <div
                ref={dropdownRef}
                className={`absolute ${
                  showDropdown ? "top-20" : "top-[-400px]"
                } right-0 px-5 py-5 bg-white w-[300px] h-auto flex flex-col justify-start items-start transition-all duration-300 shadow-xl z-50 rounded-lg`}
              >
                <Link
                  className="hover:bg-blue-500 hover:text-white py-2 px-2 transition-all duration-200 rounded-md font-semibold"
                  to={"/aboutus"}
                >
                  About Us
                </Link>
                <Link
                  className="hover:bg-blue-500 hover:text-white py-2 px-2 transition-all duration-200 rounded-md font-semibold"
                  to={"/host/rooms"}
                >
                  Host Your Home
                </Link>
                <Link
                  className="hover:bg-blue-500 hover:text-white py-2 px-2 transition-all duration-200 rounded-md font-semibold"
                  to={"/contact"}
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </>
        )}

        {/* user profile menu */}
        {inBookingPage ? (
          <div className="w-1/4 flex items-center justify-end">
            <img
              src={userProfile}
              alt="User Profile"
              className="aspect-square w-10 h-10 rounded-full"
            />
          </div>
        ) : (
          <>
            <div className="flex items-center justify-end relative">
              <div
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="cursor-pointer flex flex-row items-center gap-3"
              >
                <img
                  src={userProfile}
                  alt="User Profile"
                  className="aspect-square w-10 h-10 rounded-full"
                />
                <p className="text-white text-lg font-semibold hidden xl:block">
                  {user?.firstName}
                </p>
              </div>

              {showUserMenu && (
                <div
                  ref={userMenuRef}
                  className="absolute top-14 right-0 px-5 py-5 bg-white w-[200px] h-auto flex flex-col justify-start items-start transition-all duration-300 shadow-xl z-50 rounded-lg"
                >
                  <Link
                    className="hover:bg-blue-500 hover:text-white py-2 px-2 transition-all duration-200 rounded-md font-semibold w-full"
                    to={`/users/show/${userId}`}
                  >
                    Profile
                  </Link>
                  <Link
                    className="hover:bg-blue-500 hover:text-white py-2 px-2 transition-all duration-200 rounded-md font-semibold w-full"
                    to={`/users/dashboard/${userId}`}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogOut}
                    className="hover:bg-blue-500 hover:text-white py-2 px-2 transition-all duration-200 rounded-md font-semibold w-full text-left"
                  >
                    Log Out
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Popup for city selection */}
      {showCityPopup && (
        <div
          ref={cityPopupRef}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
        >
          <div className="bg-white p-8 rounded-lg w-96">
            <div className="relative">
              <input
                type="text"
                placeholder="Search city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full p-2 border rounded"
              />
              {city && (
                <button
                  className="absolute top-2 right-2"
                  onClick={() => setCity("")}
                >
                  <IoIosCloseCircle className="text-gray-500" />
                </button>
              )}
            </div>
            <ul className="mt-4 max-h-60 overflow-y-auto">
              {filteredCities.map((c) => (
                <li
                  key={c.id}
                  onClick={() => handleCitySelect(c.name)}
                  className="cursor-pointer hover:bg-gray-200 p-2"
                >
                  {c.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Guest count selection */}
      {showGuestPopup && (
        <div
          ref={guestPopupRef}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
        >
          <div className="bg-white p-8 rounded-lg w-96">
            <div className="flex items-center justify-between">
              <button
                onClick={() =>
                  handleGuestCountChange(Math.max(1, guestCount - 1))
                }
                className="p-2 border rounded"
              >
                <FaMinusCircle />
              </button>
              <span>{guestCount}</span>
              <button
                onClick={() => handleGuestCountChange(guestCount + 1)}
                className="p-2 border rounded"
              >
                <FaPlusCircle />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Date picker */}
      {calendarState && (
        <div
          ref={calendarRef}
          className="absolute top-[80px] left-1/2 transform -translate-x-1/2 z-50"
        >
          <DateRange
            editableDateInputs={true}
            onChange={handleSelect}
            moveRangeOnFirstSelection={false}
            ranges={selectedDates}
            months={2}
            minDate={new Date()}
            direction="horizontal"
          />
        </div>
      )}

      {/* Small Device Search */}
      <div
        className={`transition-all duration-500 fixed z-[100] bg-[#003B95] top-0 w-full h-screen ${
          hideSmallSearch ? "left-full" : "left-0"
        }`}
      >
        <div className="flex items-center justify-between py-3 px-3 border-b-2 border-blue-600">
          <h2 className="text-white text-lg font-semibold">Search Stays</h2>
          <button
            className="text-white text-2xl"
            onClick={() => setHideSmallSearch(true)}
          >
            &times;
          </button>
        </div>
        <div className="flex flex-col px-3 py-3 gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full p-2 border rounded"
            />
            {city && (
              <button
                className="absolute top-2 right-2"
                onClick={() => setCity("")}
              >
                <IoIosCloseCircle className="text-gray-500" />
              </button>
            )}
          </div>
          <div>
            <div className="flex items-center justify-between border p-2 rounded">
              <div>
                <p className="text-[10px] text-black font-semibold uppercase">
                  Check-in
                </p>
                <p className="text-sm text-[#222222]">{localStartDate}</p>
              </div>
              <div>
                <MdKeyboardArrowDown
                  className="cursor-pointer text-gray-500"
                  onClick={() => setCalendarState(!calendarState)}
                />
              </div>
            </div>
            <div className="flex items-center justify-between border p-2 rounded mt-2">
              <div>
                <p className="text-[10px] text-black font-semibold uppercase">
                  Checkout
                </p>
                <p className="text-sm text-[#222222]">{localEndDate}</p>
              </div>
              <div>
                <MdKeyboardArrowDown
                  className="cursor-pointer text-gray-500"
                  onClick={() => setCalendarState(!calendarState)}
                />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between border p-2 rounded">
            <div>
              <p className="text-[10px] text-black font-semibold uppercase">
                Guests
              </p>
              <p className="text-sm text-[#222222]">{guestCount}</p>
            </div>
            <div>
              <FaChevronDown
                className="cursor-pointer text-gray-500"
                onClick={() => setShowGuestPopup(true)}
              />
            </div>
          </div>
          <button
            onClick={handleSearch}
            className="bg-[#003B95] text-white p-2 rounded mt-2"
          >
            Search
          </button>
        </div>
      </div>
      {/* </div> */}
    </nav>
  );
};

export default Navbar;
