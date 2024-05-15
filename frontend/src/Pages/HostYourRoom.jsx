import { useEffect, useState } from "react";
import Faq from "../Components/HostingRoom/Faq";
import RoomHostingDetails from "../Components/HostingRoom/RoomHostingDetails";
import Map from "../Components/Map";
import RoomListingGuide from "../Components/HostingRoom/RoomListingGuide";
import Apartments from "../Components/HostingRoom/Apartments";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const HostYourRoom = () => {
  // const user = useSelector((state) => state.user.userDetails);
  // console.log("The user is ", user);

  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (!user) {
  //     toast.error("Please login to continue");
  //     navigate("/");
  //   }
  // }, [user, navigate]);

  const [latAndLong, setLatAndLong] = useState([]);
  return (
    <main className=" mt-8 md:mt-20 xl:px-20 xl:mx-auto max-w-screen-xl px-8 md:px-12">
      <section className=" grid grid-cols-1 lg:grid-cols-2 gap-7 pb-10 items-center">
        <RoomHostingDetails setLatAndLong={setLatAndLong} />
        <div className=" w-full h-[300px] md:h-[400px] lg:h-[450px] mx-auto">
          <Map latAndLong={latAndLong} key="ApnaPGMap" />
        </div>
      </section>
      <RoomListingGuide />
      <Apartments />
      <Faq />
    </main>
  );
};

export default HostYourRoom;
