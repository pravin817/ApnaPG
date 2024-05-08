import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOneRoomListingDetails } from "../redux/actions/roomActions";
import ListingDetailsPageSkeleton from "../Components/skeletonLoading/ListingDetailsPageSkeleton";
import ListingTitle from "../Components/ListingDetails/ListingTitle";
import ListingsPhotos from "../Components/ListingDetails/ListingsPhotos";
import ListingDescriptions from "../Components/ListingDetails/ListingDescriptions";
import ReservationCard from "../Components/ListingDetails/ReservationCard";
import { FadeLoader } from "react-spinners";

const ListingDetails = () => {
  const [isLoading, setIsLoading] = useState(true);

  // get the room details based on the id
  const data = useSelector((state) => state.room.listingDetails);

  console.log("The room details : ", data);

  const params = useParams();
  const dispatch = useDispatch();

  // listing details data
  const listingData = data?.listing;
  const listedAuthor = data?.listingAuthor;

  console.log("The listing data : ", listingData);
  console.log("The author data : ", listedAuthor);

  useEffect(() => {
    const getOneRoomDetails = async () => {
      await dispatch(getOneRoomListingDetails(params.id));
      setIsLoading(false);
    };
    getOneRoomDetails();
  }, [params.id, dispatch]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (isLoading) {
    if (window.innerWidth <= 1080) {
      return (
        <div className="flex justify-center items-center h-[80dvh]">
          <FadeLoader color="#000" />
        </div>
      );
    } else {
      return <ListingDetailsPageSkeleton />;
    }
  }

  return (
    <main className="max-w-screen-xl xl:px-12 mx-auto py-7 px-5 sm:px-16 md:px-8">
      <section className=" flex flex-col-reverse md:flex-col gap-7">
        {/* Listing Title and WishList  */}
        <ListingTitle listingData={listingData} />
        {/* Listing Images  */}
        <ListingsPhotos listingData={listingData} />
      </section>
      <section className=" grid grid-cols-1 md:grid-cols-8 lg:grid-cols-6 md:gap-x-8 lg:gap-x-20 pt-8 sm:pt-12 md:pt-16">
        {/* Listing Description and Details  */}
        <div className="md:col-span-5 lg:col-span-4 order-2 md:order-1 flex flex-col min-h-[800px] pt-16 sm:pt-20 md:pt-0">
          <ListingDescriptions
            listingData={listingData}
            author={listedAuthor}
          />
        </div>

        {/* Reservation of the listing  */}
        <div className="md:col-span-3 lg:col-span-2 order-1 md:order-2 max-h-[900px]">
          <ReservationCard listingData={listingData} />
        </div>
      </section>
    </main>
  );
};

export default ListingDetails;
