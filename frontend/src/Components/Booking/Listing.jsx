import { useSelector } from "react-redux";
import { AiFillStar } from "react-icons/ai";
import { PiCurrencyInrBold } from "react-icons/pi";

const Listing = ({ searchParamsObj }) => {
  //   console.log("The search params obj in the listing is: ", searchParamsObj);

  const listingData = useSelector((state) => state.room.listingDetails.listing);
  console.log("The listing data from the listing is : ", listingData);

  //   listing space
  const listingSpace =
    listingData?.privacyType === "An entire place" ? "Entire" : "Shared";

  const listingType = listingData?.roomType;

  // Night stays
  const nightStaying = searchParamsObj?.nightStaying;

  // Guest Count
  const guestCount = searchParamsObj?.numberOfGuests;
  console.log("The guest count is: ", guestCount);

  // Calculate the Base price for the room , tax and total price
  const basePrice =
    parseInt(nightStaying) !== 0
      ? parseInt(nightStaying) * listingData?.basePrice
      : listingData?.basePrice;

  // Total price without tax
  const totalWithoutTax =
    basePrice === 0
      ? listingData?.basePrice * guestCount
      : basePrice * guestCount;

  const tax =
    totalWithoutTax !== 0
      ? Math.round((totalWithoutTax * 14) / 100)
      : Math.round((listingData?.basePrice * 14) / 100);

  const totalPrice = totalWithoutTax + tax;

  return (
    <>
      <div className=" border border-[#dddddd] rounded-xl p-6 flex flex-col sticky top-28 min-h-[200px] bg-white">
        {/* Listing Data  */}
        <div className="flex flex-row gap-2">
          {/* Img  */}
          <img
            src={listingData?.photos[0]}
            alt="Listing room"
            className=" rounded-md object-cover w-[110px] h-[96px] sm:w-[124px] sm:h-[106px]"
          />

          {/* Title and Description  */}
          <div className="flex flex-col justify-between">
            <span className="flex flex-col gap-1">
              <p className="text-xs text-[#717171]">
                {listingSpace} {listingType}
              </p>
              <p className="text-sm text-[#222222]">{listingData?.title}</p>
            </span>

            {/* Reviews and Rating  */}
            <span className="text-xs text-[#222222] flex flex-row gap-1 items-center mt-2">
              <AiFillStar size={16} />
              {listingData?.rating ? listingData?.rating : "New"}
              {listingData?.reviews && (
                <span>
                  <span>.</span>
                  <span>{listingData?.reviews}</span>
                </span>
              )}
            </span>
          </div>
        </div>

        <hr className="w-full h-[1.3px] bg-[#dddddd] my-6" />
        {/* Price section  */}
        <div className="flex flex-col gap-3">
          <h5 className="text-[22px] text-[#222222] font-medium pb-1">
            Your Total{" "}
          </h5>
          <span className="flex flex-row text-base text-[#222] items-center justify-between">
            {/* Show the base price for the 1 Day/Night */}
            <p>1 day / night</p>
            <p className="flex items-center">
              <PiCurrencyInrBold />
              {listingData?.basePrice}
            </p>
          </span>

          <span className="flex flex-row text-base text-[#222] items-center justify-between">
            {/* Calculate the night /day */}
            {parseInt(nightStaying) === 0 ? (
              <p>1 Day</p>
            ) : (
              <p>{nightStaying} nights</p>
            )}

            {/* calculate price  */}
            <p className="flex items-center">
              <PiCurrencyInrBold />
              {basePrice === 0 ? listingData?.basePrice : basePrice}
            </p>
          </span>

          <span className="flex flex-row text-base text-[#222] items-center justify-between">
            {/* Show the base price for the 1 Day/Night */}
            <p>Guest count </p>
            <p className="flex items-center">
              {/* <PiCurrencyInrBold /> */}
              {guestCount}
            </p>
          </span>
          <hr className="w-full h-[1.3px] bg-[#dddddd] my-2" />

          <span className="flex flex-row items-center justify-between text-base text-[#222]">
            <p>Total without tax : </p>
            <p className="flex items-center">
              <PiCurrencyInrBold />
              {totalWithoutTax}
            </p>
          </span>

          <span className="flex flex-row items-center justify-between text-base text-[#222]">
            <p>Taxes</p>
            <p className="flex items-center">
              <PiCurrencyInrBold />
              {tax}
            </p>
          </span>
        </div>

        <hr className="w-full h-[1.3px] bg-[#dddddd] my-6" />
        {/* total price */}
        <div className="flex flex-row items-center justify-between text-base text-[#222] font-medium">
          <p>Total(INR)</p>
          <p className="flex items-center">
            <PiCurrencyInrBold />
            {totalPrice}
          </p>
        </div>
      </div>
    </>
  );
};

export default Listing;
