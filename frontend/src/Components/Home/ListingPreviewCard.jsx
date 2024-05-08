import { AiFillStar } from "react-icons/ai";
import { PiCurrencyInrBold } from "react-icons/pi";

const ListingPreviewCard = ({ listingData, showBeforeTaxPrice }) => {
  const taxes = Math.round((listingData?.basePrice * 14) / 100);
  const priceAfterTaxes = listingData?.basePrice + taxes;

  return (
    <>
      <div className=" h-[310px] md:h-[277px] overflow-hidden rounded-xl">
        <img
          src={listingData?.photos[0]}
          alt="Listing images"
          className=" w-full h-[310px] md:h-[277px] object-cover object-center rounded-xl hover:scale-110 transition duration-500 ease-in-out cursor-pointer"
        />
      </div>
      <div className="flex flex-row justify-between items-start w-full">
        {/* Listing Details  */}
        <div className="flex flex-col gap-1">
          <p className="text-sm text-[#222222] font-medium">
            {listingData?.location?.city?.name},{" "}
            {listingData?.location?.country?.name}
          </p>
          {showBeforeTaxPrice && (
            <p className="text-sm text-[#717171]">
              After tax <PiCurrencyInrBold />
              {priceAfterTaxes} <span className=" font-normal"> per night</span>
            </p>
          )}
          <p className="text-sm text-[#222222] font-semibold flex items-center">
            <PiCurrencyInrBold />
            <span></span>
            {listingData?.basePrice}{" "}
            <span className=" font-normal pl-1">per night</span>
          </p>
        </div>

        {/* Rating / status  */}
        <div className=" flex flex-row gap-1 items-center">
          {listingData?.ratings ? (
            <>
              <AiFillStar size={16} />
              <p className=" text-sm">{listingData?.ratings}</p>
            </>
          ) : (
            <>
              <AiFillStar size={16} />
              <p className=" text-sm">New</p>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ListingPreviewCard;
