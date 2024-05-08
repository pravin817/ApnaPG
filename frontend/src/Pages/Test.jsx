import { FadeLoader } from "react-spinners";
import HomePageSkeleton from "../Components/skeletonLoading/HomePageSkeleton";
import SkeletonLoadingCards from "../Components/skeletonLoading/SkeletonLoadingCards";
import ListingDetailsPageSkeleton from "../Components/skeletonLoading/ListingDetailsPageSkeleton";

const Test = () => {
  // return <HomePageSkeleton />;
  // return (
  //   <div className="flex justify-center items-center h-[80dvh]">
  //     <FadeLoader color="#000" />
  //   </div>
  // );

  // return <SkeletonLoadingCards />;

  // return <ListingDetailsPageSkeleton />;
  return <ListingDetailsPageSkeleton />;
};

export default Test;
