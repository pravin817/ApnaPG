import { useSelector } from "react-redux";

import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import { useDateFormatting } from "../../hooks/useDateFormatting";
import toast from "react-hot-toast";
import { PulseLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";


const Payment = ({ searchParamsObj }) => {
  console.log("The search params obj is: ", searchParamsObj);

  // get the reservations data
  const newReservationsData = useSelector(
    (state) => state.reservations.newReservationsData
  );
  console.log("The new reservation data is: ", newReservationsData);

  // get the listing Data
  const listingData = useSelector((state) => state.room.listingDetails.listing);
  console.log("The listing data from the payment is : ", listingData);

  // get the stripe
  // const stripe = useStripe();
  // const elements = useElements();
  // const [isProcessing, setIsProcessing] = useState(false);
  // const [message, setMessage] = useState("");

  // Get the required data
  const dateObj = {
    checkin: searchParamsObj?.checkin,
    checkout: searchParamsObj?.checkout,
  };

  console.log("The date object is: ", dateObj);

  // format the dates
  const formattedDates = useDateFormatting(dateObj);
  console.log("The formatted dates are: ", formattedDates);

  // reservations data

  const guestNumber = newReservationsData
    ? newReservationsData.guestNumber
    : searchParamsObj?.numberOfGuests;

  console.log("The guest number is: ", guestNumber);
  // console.log("The type of the guestNumber  is: ", typeof guestNumber);
  const checkin = newReservationsData
    ? newReservationsData?.checkIn
    : searchParamsObj.checkin;

  console.log("The checkin is: ", checkin);

  const checkout = newReservationsData
    ? newReservationsData?.checkOut
    : searchParamsObj?.checkout;

  console.log("The checkout is: ", checkout);

  // Night staying

  const nightStaying = newReservationsData
    ? newReservationsData?.nightStaying
    : searchParamsObj?.nightStaying;

  console.log("The night staying is: ", nightStaying);

  const orderId = Math.round(Math.random() * 10000000000);
  console.log("The order id is: ", orderId);
  const navigate = useNavigate();


  // const handlePayment = async (e) => {
  //   e.preventDefault();

  // if (!stripe || !elements) {
  //   return;
  // }

  // setIsProcessing(true);

  // const { error } = await stripe.confirmPayment({
  //   elements,
  //   confirmParams: {
  //     return_url: `${window.location.origin}/payment-confirmed?guestNumber=${guestNumber}&checkIn=${checkin}&checkOut=${checkout}&listingId=${listingData?._id}&authorId=${listingData?.author}&nightStaying=${nightStaying}&orderId=${orderId}`,
  //   },
  // });
  // if (error) {
  //   setMessage(error.message);
  //   toast.error("Payment failed. Try again!");
  //   console.log("[error from the payment]", error);
  // }

  // setIsProcessing(false);
  // };

  const handlePayment = async (e) => {
    e.preventDefault();

    // Construct the URL for payment confirmation
    const paymentConfirmationURL = `${window.location.origin}/payment-confirmed?guestNumber=${guestNumber}&checkIn=${checkin}&checkOut=${checkout}&listingId=${listingData?._id}&authorId=${listingData?.author}&nightStaying=${nightStaying}&orderId=${orderId}`;

    // Redirect to the payment confirmation page
    window.location.href = paymentConfirmationURL;
  };

  return (
    <div>
      {/* The info Section  */}
      <div className=" flex flex-col gap-6">
        <h5 className="text-xl md:text-[22px] text-[#222222] font-medium ">
          Your booking
        </h5>
        {/* The date and the guest number section  */}
        <div className="flex flex-row justify-between items-center">
          {/* date  */}
          <span className="text-sm md:text-base text-[#2222222] ">
            <p className="font-medium">Dates </p>
            <p>{formattedDates}</p>
          </span>

          {/* Guest Number  */}
          <span className="text-sm md:text-base text-[#2222222] ">
            <p className="font-medium">Guests </p>
            <p>
              {guestNumber} {guestNumber === "1" ? "guest" : "guests"}
            </p>
          </span>
        </div>

        <hr className="w-full h-[1.3px] bg-[#dddddd] my-4" />

        {/* The main payment window  + Rules and the submit button*/}
        <form onSubmit={handlePayment}>
          <h5 className="text-xl md:text-[22px] text-[#222222] font-medium">
            pay with
          </h5>
          {/* fire the stripe payment here */}
          {/* <PaymentElement /> */}
          <div className="border rounded-md h-[120px]  flex items-center justify-center mt-4">
            The payment dialog will be here
          </div>
          <hr className="w-full h-[1.3px] bg-[#dddddd] my-4" />

          {/* The ground rules  */}
          <div>
            <h5 className="text-xl md:text-[22px] text-[#222222] font-medium">
              Ground rules
            </h5>
            <p className="text-sm md:text-base text-[#222222] py-4">
              We ask every guest to remember a few simple things about what
              makes a great guest.
            </p>
            <ul className="text-sm md:text-base list-disc pl-5">
              <li>Follow the house rules </li>
              <li>Treat your Host&apos;s home like your own</li>
            </ul>
          </div>

          <hr className="w-full h-[1.3px] bg-[#dddddd] my-10" />

          <p className="text-xs opacity-70">
            By selecting the button below, I agree to the Host&apos;s House
            Rules, Ground rules for guests, ApanaPG&apos;s Rebooking and Refund
            Policy, and that ApnaPG can charge my payment method if I&apos;m
            responsible for damage.
          </p>

          <button
            type="submit"
            className="w-full md:max-w-[180px] mt-7 px-5 py-3 rounded-md bg-[#ff385c] hover:bg-[#d90b63] transition duration-200 ease-in text-white font-medium cursor-pointer disabled:cursor-not-allowed disabled:opacity-30 disabled:bg-gray-400 min-w-[180px]"
          >
            Confirm and pay
          </button>
        </form>
      </div>
    </div>
  );
};

export default Payment;
