// import React, { useState } from "react";
// import searchIcon from "../../assets/BasicIcon/search.svg";

// const SearchPopup = ({ isOpen, onClose }) => {
//   const [city, setCity] = useState("");
//   const [checkInDate, setCheckInDate] = useState("");
//   const [checkOutDate, setCheckOutDate] = useState("");
//   const [guestCount, setGuestCount] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle search submission, e.g., send search query to backend
//     console.log("Search submitted:", {
//       city,
//       checkInDate,
//       checkOutDate,
//       guestCount,
//     });
//     // You can send a request to your backend here
//     onClose();
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg p-8">
//         <h2 className="text-2xl font-bold mb-4">Search for Accommodation</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label
//               htmlFor="city"
//               className="block text-gray-800 font-semibold mb-2"
//             >
//               City
//             </label>
//             <input
//               type="text"
//               id="city"
//               value={city}
//               onChange={(e) => setCity(e.target.value)}
//               className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-[#ff385c]"
//             />
//           </div>
//           <div className="grid grid-cols-2 gap-4 mb-4">
//             <div>
//               <label
//                 htmlFor="checkInDate"
//                 className="block text-gray-800 font-semibold mb-2"
//               >
//                 Check-In Date
//               </label>
//               <input
//                 type="date"
//                 id="checkInDate"
//                 value={checkInDate}
//                 onChange={(e) => setCheckInDate(e.target.value)}
//                 className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-[#ff385c]"
//               />
//             </div>
//             <div>
//               <label
//                 htmlFor="checkOutDate"
//                 className="block text-gray-800 font-semibold mb-2"
//               >
//                 Check-Out Date
//               </label>
//               <input
//                 type="date"
//                 id="checkOutDate"
//                 value={checkOutDate}
//                 onChange={(e) => setCheckOutDate(e.target.value)}
//                 className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-[#ff385c]"
//               />
//             </div>
//           </div>
//           <div className="mb-4">
//             <label
//               htmlFor="guestCount"
//               className="block text-gray-800 font-semibold mb-2"
//             >
//               Guests
//             </label>
//             <input
//               type="number"
//               id="guestCount"
//               value={guestCount}
//               onChange={(e) => setGuestCount(e.target.value)}
//               className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-[#ff385c]"
//             />
//           </div>
//           <button
//             type="submit"
//             className="bg-[#ff385c] text-white py-2 px-4 rounded-md hover:bg-[#d90b63] transition-colors"
//           >
//             Search
//           </button>
//         </form>
//         <button
//           className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 focus:outline-none"
//           onClick={onClose}
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-6 w-6"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M6 18L18 6M6 6l12 12"
//             />
//           </svg>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SearchPopup;

// import React, { useState } from "react";
// import searchIcon from "../../assets/BasicIcon/search.svg";

// const SearchPopup = ({ isOpen, onClose }) => {
//   const [city, setCity] = useState("");
//   const [checkInDate, setCheckInDate] = useState("");
//   const [checkOutDate, setCheckOutDate] = useState("");
//   const [guestCount, setGuestCount] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Search submitted:", {
//       city,
//       checkInDate,
//       checkOutDate,
//       guestCount,
//     });
//     onClose();
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
//       <div className="bg-white rounded-lg p-8 max-w-md w-full">
//         <h2 className="text-2xl font-bold mb-4">Search for Accommodation</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label
//               htmlFor="city"
//               className="block text-gray-800 font-semibold mb-2"
//             >
//               City
//             </label>
//             <input
//               type="text"
//               id="city"
//               value={city}
//               onChange={(e) => setCity(e.target.value)}
//               className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-[#ff385c]"
//             />
//           </div>
//           <div className="grid grid-cols-2 gap-4 mb-4">
//             <div>
//               <label
//                 htmlFor="checkInDate"
//                 className="block text-gray-800 font-semibold mb-2"
//               >
//                 Check-In Date
//               </label>
//               <input
//                 type="date"
//                 id="checkInDate"
//                 value={checkInDate}
//                 onChange={(e) => setCheckInDate(e.target.value)}
//                 className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-[#ff385c]"
//               />
//             </div>
//             <div>
//               <label
//                 htmlFor="checkOutDate"
//                 className="block text-gray-800 font-semibold mb-2"
//               >
//                 Check-Out Date
//               </label>
//               <input
//                 type="date"
//                 id="checkOutDate"
//                 value={checkOutDate}
//                 onChange={(e) => setCheckOutDate(e.target.value)}
//                 className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-[#ff385c]"
//               />
//             </div>
//           </div>
//           <div className="mb-4">
//             <label
//               htmlFor="guestCount"
//               className="block text-gray-800 font-semibold mb-2"
//             >
//               Guests
//             </label>
//             <input
//               type="number"
//               id="guestCount"
//               value={guestCount}
//               onChange={(e) => setGuestCount(e.target.value)}
//               className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-[#ff385c]"
//             />
//           </div>
//           <button
//             type="submit"
//             className="bg-[#ff385c] text-white py-2 px-4 rounded-md hover:bg-[#d90b63] transition-colors"
//           >
//             Search
//           </button>
//         </form>
//         <button
//           className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 focus:outline-none"
//           onClick={onClose}
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-6 w-6"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M6 18L18 6M6 6l12 12"
//             />
//           </svg>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SearchPopup;

import React, { useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
// import CountryStateCity from "country-state-city";
import { Country, State, City } from "country-state-city";
import Select from "react-select";
import searchIcon from "../../assets/BasicIcon/search.svg";

const SearchPopup = ({ onSearch }) => {
  const [city, setCity] = useState("");
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(new Date());
  const [guestCount, setGuestCount] = useState(1);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSearchClick = () => {
    // Pass the search parameters to the parent component for further processing
    onSearch({ city, checkInDate, checkOutDate, guestCount });
  };

  //   const countries = CountryStateCity.getAllCountries();
  //   const cities = CountryStateCity.getCitiesOfCountry("IN");

  const handleStoreCardData = () => {
    console.log(formData);
  };

  const [formData, setFormData] = useState({
    country: "",
    addressLineOne: "",
    addressLineTwo: "",
    city: "",
    state: "",
    postCode: "",
  });

  return (
    <div className="absolute top-16 left-1/2 transform -translate-x-1/2 z-10">
      <div className=" w-[65vw] bg-white border border-gray-300 rounded-lg shadow-lg p-4">
        <div className="flex items-start justify-between gap-2">
          <div className=" flex flex-col gap-5 mt-5">
            <Select
              options={Country.getAllCountries()}
              getOptionLabel={(options) => options["name"]}
              getOptionValue={(options) => options["name"]}
              value={formData.country}
              onChange={(item) => {
                setFormData({ ...formData, country: item });
              }}
              onBlur={handleStoreCardData}
              className="text-sm "
              placeholder=" Country / Region"
              styles={{
                control: (provided) => ({
                  ...provided,
                  padding: "8px",
                  borderRadius: "8px",
                }),
              }}
            />

            <Select
              options={State.getStatesOfCountry(formData?.country?.isoCode)}
              getOptionLabel={(options) => options["name"]}
              getOptionValue={(options) => options["name"]}
              value={formData.state}
              onChange={(item) => {
                setFormData({ ...formData, state: item });
              }}
              onBlur={handleStoreCardData}
              className="text-sm "
              placeholder="State / province / territory (if applicable)"
              styles={{
                control: (provided) => ({
                  ...provided,
                  padding: "8px",
                  borderRadius: "8px",
                }),
              }}
            />
            <Select
              options={City.getCitiesOfState(
                formData?.state?.countryCode,
                formData?.state?.isoCode
              )}
              getOptionLabel={(options) => options["name"]}
              getOptionValue={(options) => options["name"]}
              value={formData.city}
              onChange={(item) => {
                setFormData({ ...formData, city: item });
              }}
              onBlur={handleStoreCardData}
              className="text-sm "
              placeholder="City / village (if applicable)"
              styles={{
                control: (provided) => ({
                  ...provided,
                  padding: "8px",
                  borderRadius: "8px",
                }),
              }}
            />
          </div>

          {/* Date Range Selector */}
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">Date Range</label>
            <DateRange
              editableDateInputs={true}
              onChange={(item) => {
                setCheckInDate(item.selection.startDate);
                setCheckOutDate(item.selection.endDate);
              }}
              moveRangeOnFirstSelection={false}
              ranges={[
                {
                  startDate: checkInDate,
                  endDate: checkOutDate,
                  key: "selection",
                },
              ]}
              minDate={new Date()}
              className="w-full"
            />
          </div>

          {/* Guest Count Input */}
          <div className="mb-4">
            <label
              htmlFor="guestCount"
              className="block mb-2 text-sm font-medium"
            >
              Guest Count
            </label>
            <input
              type="number"
              id="guestCount"
              value={guestCount}
              onChange={(e) => setGuestCount(e.target.value)}
              className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
        </div>
        {/* Search Button */}
        <button
          onClick={handleSearchClick}
          className="bg-[#ff385c] text-white font-medium py-2 px-4 rounded-md hover:bg-[#d90b63] transition duration-200"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchPopup;
