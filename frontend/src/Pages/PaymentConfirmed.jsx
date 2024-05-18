import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import api from "../backend";
import toast from "react-hot-toast";
import { FadeLoader } from "react-spinners";

const PaymentConfirmed = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [paymentFailed, setPaymentFailed] = useState(false);

  const user = useSelector((state) => state.user.userDetails);
  console.log("The user details from the payment confirmed is: ", user);

  const navigate = useNavigate();

  // Get the data from the search params
  const [searchParams] = useSearchParams();

  const searchParamsObj = Object.fromEntries([...searchParams]);

  // Get the reservation data from the searchParams
  const reservationsData = {
    listingId: searchParamsObj?.listingId,
    authorId: searchParamsObj?.authorId,
    checkIn: searchParamsObj?.checkIn,
    checkOut: searchParamsObj?.checkOut,
    nightStaying: searchParamsObj?.nightStaying,
    guestNumber: searchParamsObj?.guestNumber,
    orderId: searchParamsObj?.orderId,
  };

  // save the above data to the database
  useEffect(() => {
    try {
      const roomBooking = async () => {
        const res = await api
          .post("/reservations/book-room", reservationsData)
          .catch((error) => {
            if (error.response.success) {
              setPaymentFailed(true);
              setIsLoading(false);
              toast.error("Payment Failed, Please try again");
            }
          });

        console.log("res", res);

        if (res?.data?.success) {
          setPaymentFailed(false);
          setIsLoading(false);
          toast.success("The room is successfully booked.");
        } else {
          setIsLoading(false);
          setPaymentFailed(true);
          toast.error(res.data.message);
        }
      };
      roomBooking();
    } catch (error) {
      console.log("Error from the payment confirmation ", error);
      setIsLoading(false);
    }
  }, []);

  if (isLoading)
    return (
      <div className="flex flex-col justify-center items-center w-full h-[60dvh]">
        <FadeLoader color="#000" />
      </div>
    );

  return (
    <div className=" min-w-md mx-auto text-center ">
      <div className="flex flex-col gap-4 ">
        <div className="px-8 pt-1 bg-[#fafafa] h-[60vh] pb-10">
          <div className=" flex flex-col gap-3 justify-center items-center max-w-[66vw] pt-6 text-[#222222] mx-auto ">
            {/* Company Logo  */}
            <h1 className=" mt-4 text-xl text-[#ff385c] font-bold">
              Apna<span className="text-black">PG</span>
            </h1>

            {/* Show the message based on the payment status */}
            <h4 className=" text-2xl font-semibold">
              {paymentFailed
                ? "Your booking failed. try again"
                : "Your booking is confirmed."}
            </h4>

            <p className=" text-center text-sm">
              Discover new places to stay and unique experiences around the
              world.
            </p>
          </div>

          <div className="px-5 mt-5 max-w-[180px] flex justify-center mx-auto">
            <Link
              to={`/users/show/booking/${user?._id}`}
              className="bg-[#282828] text-[#ffffff] text-center font-medium block w-full py-2 rounded-md hover:bg-[#000000] hover:cursor-pointer transition-colors duration-300"
            >
              Continue
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentConfirmed;
