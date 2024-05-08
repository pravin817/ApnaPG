import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [showExtendedSearch, setShowExtendedSearch] = useState(false);
  const [city, setCity] = useState("");
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [guestCount, setGuestCount] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setShowExtendedSearch(scrollPosition > 50); // Example threshold for showing extended search
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleCitySelect = (selectedCity) => {
    setCity(selectedCity);
    // Close the city dropdown or perform other actions
  };

  const handleSearch = () => {
    // Perform search with selected parameters
  };

  return (
    <nav
      className={`border-b-[1.4px] border-[#f1f1f1] sticky top-0 z-[99] bg-white ${
        showExtendedSearch ? "hidden md:block" : ""
      }`}
    >
      <div
        className={`xl:px-10 py-4 xl:mx-auto items-center px-5 relative ${
          showExtendedSearch ? "max-w-screen-xl" : "max-w-screen-2xl"
        }`}
      >
        {/* The Company logo */}
        <div className="md:w-[160px]">
          <span className="flex flex-row gap-2 items-center max-w-[120px]">
            <Link
              className="text-xl text-[#ff385c] font-bold"
              onClick={() => {
                JSON.stringify(localStorage.setItem("category", "House"));
              }}
              to={"/"}
            >
              Apna<span className="text-black">PG</span>
            </Link>
          </span>
        </div>

        {/* Extended search bar */}
        {showExtendedSearch && (
          <div className="w-[80%] mx-auto">
            <div className="flex items-center justify-between border-[1px] border-[#dddddd] rounded-full px-3 py-1 shadow hover:shadow-md transition-all cursor-pointer">
              <input
                type="text"
                placeholder="AnyWhere"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="text-sm py-2 w-24 focus:border-[#ff385c] focus:outline-none pl-2  text-black"
              />
              <span className="text-gray-400">|</span>
              <DatePicker
                selected={checkInDate}
                onChange={(date) => setCheckInDate(date)}
                placeholderText="Any Week"
                className="text-sm py-2 w-24 focus:border-[#ff385c] focus:outline-none"
              />
              <span className="text-gray-400">|</span>
              <input
                type="text"
                placeholder="Add guest"
                value={guestCount}
                onChange={(e) => setGuestCount(e.target.value)}
                className="text-sm py-2 w-24 focus:border-[#ff385c] focus:outline-none pl-2"
              />
              <button
                className="bg-[#ff385c] rounded-full p-2"
                onClick={handleSearch}
              >
                <img src={searchIcon} alt="Search" className="w-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
