import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { getOneRoomListingDetails } from "../redux/actions/roomActions";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import { FadeLoader } from "react-spinners";

import { MdKeyboardArrowLeft } from "react-icons/md";

import { API } from "../backend";
import Listing from "../Components/Booking/Listing";
import Payment from "../Components/Booking/Payment";

const Book = () => {
  // const [stripePromise, setStripePromise] = useState(null);
  // const [clientSecret, setClientSecret] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // console.log("The stripe promise is: ", stripePromise);
  // console.log("The client secret is: ", clientSecret);

  const [searchParams] = useSearchParams();
  console.log("The search params are: ", searchParams);

  //   making the search params in an obj and store in a vairable
  const searchParamsObj = Object.fromEntries([...searchParams]);

  console.log("The search params obj is: ", searchParamsObj);

  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();

  const listingId = params?.id;
  console.log("The listing id is: ", listingId);

  // Get the one listing details for the display at the payment page
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await dispatch(getOneRoomListingDetails(listingId));
      setIsLoading(false);
    };

    fetchData();
  }, [listingId, dispatch, setIsLoading]);

  // Stripe provider configuration
  // useEffect(() => {
  //   fetch(`${API}reservations/config-stripe`).then(async (res) => {
  //     const { publishableKey } = await res.json();
  //     setStripePromise(loadStripe(publishableKey));
  //   });
  // }, []);

  // make the payment call
  // useEffect(() => {
  //   fetch(`${API}reservations/create-payment-intent`, {
  //     method: "POST",
  //     body: JSON.stringify({}),
  //   }).then(async (res) => {
  //     const { clientSecret } = await res.json();
  //     setClientSecret(clientSecret);
  //   });
  // }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (isLoading) {
    return (
      <div className=" flex justify-center items-center w-full h-[60dvh]">
        <FadeLoader color="#000" />
      </div>
    );
  }

  return (
    <main className=" border max-w-screen-2xl xl:px-12 mx-auto py-7 xl:py-20">
      <div className="flex flex-row gap-3 items-center px-3 md:px-5">
        <div
          onClick={() => {
            navigate(-1);
          }}
          className=" p-2 rounded-full hover:bg-[#f1f1f1] cursor-pointer transition duration-200 ease-in"
        >
          <MdKeyboardArrowLeft size={28} />
        </div>
        <h2 className="text-lg sm:text-xl md:text-[32px] text-[#222222] font-medium text-center">
          Confirm and pay
        </h2>
      </div>

      {/* Reservations  */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 pt-10 px-8 md:px-10">
        {/* Reservations details */}
        <div className="order-2 md:order-1">
          <Payment searchParamsObj={searchParamsObj} />
        </div>
        {/* Listing Details  */}
        <div className="order-1 md:order-2">
          <Listing searchParamsObj={searchParamsObj} />
        </div>
      </section>
    </main>
  );
};

export default Book;
