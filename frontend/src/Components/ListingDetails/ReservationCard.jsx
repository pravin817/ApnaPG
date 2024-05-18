import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { parseISO } from "date-fns";
import { AiFillStar, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { PiCurrencyInrBold } from "react-icons/pi";

import { useOutsideClick } from "../../hooks/useOutsideClick";
import { newReservation } from "../../redux/actions/reservationsActions";
import { API } from "../../backend";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { DateRange } from "react-date-range";
// date range selector css
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css";

/* eslint-disable react/prop-types */
const ReservationCard = ({ listingData }) => {
  // ref
  const calendarRef = useRef();
  const dropdownRef = useRef();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // handling outside click
  const { state: calendarState, setState: setCalendarState } =
    useOutsideClick(calendarRef);
  const { state: showDropdown, setState: setShowDropdown } =
    useOutsideClick(dropdownRef);

  const [totalGuest, settotalGuest] = useState(1);
  const [reservations, setReservations] = useState([]);

  // Pricing state
  const [reservationBasePrice, setReservationBasePrice] = useState(
    listingData?.basePrice
  );

  const [tax, setTax] = useState(
    listingData?.priceAfterTaxes - listingData?.basePrice
  );

  const [authorEarned, setAuthorEarned] = useState(
    listingData?.authorEarnedPrice
  );

  // dates saving and showing to the dateRange calendar calculation here
  const [selectedDates, setSelectedDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  // calculate the total nights guest want to stay
  const [nightsStaying, setNightsStaying] = useState(1);

  // Formatted dates to store in DB
  const formattedStartDate = selectedDates[0]?.startDate?.toISOString();
  const formattedEndDate = selectedDates[0]?.endDate?.toISOString();

  // Convert the formatted dated to local dates for the user to see
  const localStartDate = new Date(formattedStartDate).toLocaleDateString();
  const localEndDate = new Date(formattedEndDate).toLocaleDateString();

  // console.table([
  //   formattedStartDate,
  //   formattedEndDate,
  //   localStartDate,
  //   localEndDate,
  // ]);

  // Handle the date selection
  const handleSelect = (date) => {
    setSelectedDates([date.selection]);
  };

  // Booking function
  const orderNumber = localStorage.getItem("orderId");
  const orderId = orderNumber ? orderNumber : 1;

  const handleBooking = () => {
    navigate(
      `/book/stays/${listingData._id}?numberOfGuests=${totalGuest}&nightStaying=${nightsStaying}&checkin=${formattedStartDate}&checkout=${formattedEndDate}&orderId=${orderId}`
    );
  };

  // get the saved reservations data
  useEffect(() => {
    (async () => {
      const res = await axios.post(`${API}reservations/get-reservations`, {
        id: listingData?._id,
      });

      console.log("The reservations data : ", res.data.reservations);

      if (res?.data?.success) {
        setReservations(res?.data?.reservations);
      }

      console.log("The reservations data : ", res.data.reservations);
    })();
  }, [listingData?._id]);

  // calculate the price for the reservations.
  useEffect(() => {
    const daysInMiliSec = Math.ceil(
      selectedDates[0]?.endDate - selectedDates[0]?.startDate
    );

    // convert the millisecond to the Days
    const calculatedNights = daysInMiliSec / (1000 * 60 * 60 * 24);

    const finalNight = calculatedNights === 0 ? 1 : calculatedNights;

    // calculate the base price
    // const calculatedbasePrice = listingData?.basePrice * finalNight;

    const calculatedbasePrice =
      totalGuest >= 1
        ? listingData?.basePrice * finalNight * totalGuest
        : listingData?.basePrice * finalNight;

    // Now Apply the tax on the calculatedbasePrice which is 14%
    const calculatedTaxes = Math.round((calculatedbasePrice * 14) / 100);

    // Now calculate the platform charges = 2%
    const ApanaPGEarnings = Math.round((calculatedbasePrice * 2) / 100);

    // Actual Author (Room owners earnings)
    const calculatedAuthorEarnings = calculatedbasePrice - ApanaPGEarnings;

    console.table([
      daysInMiliSec,
      calculatedNights,
      finalNight,
      calculatedbasePrice,
      calculatedTaxes,
      ApanaPGEarnings,
      calculatedAuthorEarnings,
    ]);

    // store the results in the state
    setReservationBasePrice(calculatedbasePrice);
    setTax(calculatedTaxes);
    setAuthorEarned(calculatedAuthorEarnings); // Room owners earning to dashboard
    setNightsStaying(calculatedNights);
  }, [selectedDates, listingData?.basePrice, totalGuest]);


  // Fire the reservations data
  useEffect(() => {
    const data = {
      listingData,
      formattedStartDate,
      formattedEndDate,
      nightsStaying,
      totalGuest,
      reservationBasePrice,
      tax,
      authorEarned,
    };

    dispatch(newReservation(data));
  }, [
    dispatch,
    listingData,
    formattedStartDate,
    formattedEndDate,
    nightsStaying,
    totalGuest,
    reservationBasePrice,
    tax,
    authorEarned,
  ]);

  // calculate the disabled date for each objects
  const disabledDateRanges = reservations?.map((obj) => ({
    startDate: parseISO(obj.checkIn),
    endDate: parseISO(obj.checkOut),
  }));

  // Generate the available reservation slots
  const disabledDates = disabledDateRanges.reduce((dates, range) => {
    const startDate = new Date(range.startDate);
    const endDate = new Date(range.endDate);

    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  }, []);

  // Function to handle incrementing guests number
  const handleIncrementGuests = () => {
    settotalGuest((prev) => prev + 1);
  };

  // Function to handle decrementing guests number
  const handleDecrementGuests = () => {
    // Ensure guestsNumber doesn't go below 0
    if (totalGuest > 1) {
      settotalGuest((prev) => prev - 1);
    }
  };

  return (
    <div className="border w-full border-[#dddddd]  min-h-[315px] rounded-xl sticky top-32 shadow p-6 ">
      <div className="flex flex-row justify-between items-start">
        <div className="flex flex-col">
          <h3 className="flex items-center gap-1  text-[22px] text-[#222222] font-semibold">
            <PiCurrencyInrBold />
            {reservationBasePrice}
          </h3>
          <p className="text-xs text-[#313131]">Total Price Before Taxes</p>
        </div>
        <span>
          <AiFillStar size={18} />
          {listingData?.ratings ? listingData?.rating : "New"}
          {listingData?.reviews && (
            <span>
              <span>.</span>
              <span>{listingData?.reviews}</span>
            </span>
          )}
        </span>
      </div>

      {/* The calender sections  */}
      {!calendarState && (
        <div className="rounded-tl-lg rounded-tr-lg border border-[#b9b9b9] w-full min-h[60px] mt-6 relative flex flex-col">
          <div>
            <div
              onClick={() => {
                setCalendarState(true);
              }}
              className="grid grid-cols-2 cursor-pointer"
            >
              <div className="px-3 py-3">
                <p className="text-[10px] text-black font-semibold uppercase">
                  Check-in
                </p>
                <p className="text-sm text-[#222222]">{localStartDate}</p>
              </div>

              <div className="px-3 py-3">
                <p className="text-[10px] text-black font-semibold uppercase">
                  Checkout
                </p>
                <p className="text-sm text-[#222222]">{localEndDate}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* The guest Section  */}
      {!calendarState && (
        <div
          ref={dropdownRef}
          onClick={() => {
            setShowDropdown((prev) => !prev);
          }}
        >
          <div className=" rounded-bl-lg rounded-br-lg border border-[#b9b9b9] w-full min-h-[50px] cursor-pointer relative">
            {/* Guest Data  */}
            <div className="px-3 py-3  flex flex-row items-center justify-between">
              <div className="flex flex-col">
                <p className="text-[10px] text-black font-semibold uppercase">
                  Guest
                </p>
                <p className="text-sm text-[#222222]">
                  {totalGuest} {totalGuest === 1 ? "guest" : "guests"}
                </p>
              </div>

              <div>
                {showDropdown ? (
                  <MdKeyboardArrowUp size={26} />
                ) : (
                  <MdKeyboardArrowDown size={26} />
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* guests data dropdown */}
      {showDropdown && (
        <div
          ref={dropdownRef}
          className="min-h-[150px] w-72 shadow-lg border absolute z-[90] bg-white px-4 py-5 rounded-md"
        >
          <div className=" flex flex-col gap-5">
            <div className=" flex felx-row items-center justify-between">
              {/* adults number here */}
              <span>
                <p className=" text-base text-[#222222] font-medium">Adults</p>
                <p className=" text-sm text-[#313131]">Age 18+</p>
              </span>
              {/* icons */}
              <span className=" flex flex-row-reverse items-center gap-2">
                <button
                  onClick={handleIncrementGuests}
                  disabled={listingData?.floorPlan?.guests === totalGuest}
                  className={` p-2 rounded-full border border-[#c0c0c0] opacity-90 disabled:cursor-not-allowed disabled:opacity-20`}
                >
                  <AiOutlinePlus size={16} />
                </button>
                <p className=" w-[30px] flex justify-center">{totalGuest}</p>

                <button
                  onClick={handleDecrementGuests}
                  disabled={totalGuest === 1}
                  className=" p-2 rounded-full border border-[#c0c0c0] disabled:cursor-not-allowed disabled:opacity-20"
                >
                  <AiOutlineMinus size={16} />
                </button>
              </span>
            </div>

            <hr />
          </div>
          {/* close btn */}
          <div className=" flex justify-end absolute bottom-3 right-2">
            <button
              onClick={() => {
                setShowDropdown(false);
              }}
              className="underline text-base text-[#222222] font-medium px-3 py-2 rounded-lg hover:bg-[#f5f5f5]"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* reservation button */}
      {!showDropdown && !calendarState && (
        <div className=" mt-6 flex justify-center rounded-md">
          <button
            onClick={() => {
              handleBooking();
            }}
            className="capitalize py-3 w-full bg-[#ff385c] hover:bg-[#d90b63] transition duration-200 ease-in text-white font-medium text-sm rounded-md"
          >
            Reserve
          </button>
        </div>
      )}

      {/* calendar & date picker */}
      {!calendarState ? null : (
        <div
          ref={calendarRef}
          className=" absolute border-b-[1.2px] border-neutral-200 shadow-md left-[2px] sm:translate-x-[30%] sm:translate-y-[0%] md:translate-x-[-30%] lg:translate-x-[-20%] xl:translate-x-0 xl:translate-y-0"
        >
          <DateRange
            rangeColors={["#262626"]}
            date={new Date()}
            editableDateInputs={true}
            onChange={handleSelect}
            moveRangeOnFirstSelection={false}
            ranges={selectedDates}
            disabledDates={disabledDates}
            // isDayBlocked={(date) => isDateDisabled(date)}
            direction="vertical"
            showDateDisplay={false}
            minDate={new Date()}
          />
        </div>
      )}
    </div>
  );
};

export default ReservationCard;
