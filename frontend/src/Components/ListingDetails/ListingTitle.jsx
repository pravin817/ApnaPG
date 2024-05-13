// import axios from "axios";
// import { useState, useEffect } from "react";
// import { AiFillHeart, AiFillStar } from "react-icons/ai";
// import { FaHeart } from "react-icons/fa";
// import { useParams } from "react-router-dom";
// import api from "../../backend";
// import { useSelector } from "react-redux";
// import toast from "react-hot-toast";

// const ListingTitle = ({ listingData }) => {
//   const { id } = useParams();
//   const [roomId, setRoomId] = useState(null);
//   const [isSaved, setIsSaved] = useState(false);
//   const user = useSelector((state) => state.user.userDetails);

//   useEffect(() => {
//     if (id) {
//       setRoomId(id);
//     }
//   }, [id]);

//   useEffect(() => {
//     if (user && user.wishlist) {
//       setIsSaved(user.wishlist.includes(roomId));
//     }
//   }, [user, roomId]);

//   const handleAddToWishList = async () => {
//     setIsSaved((prev) => !prev);

//     if (roomId) {
//       const response = await api.post(
//         "/room/add-wishlist",
//         { roomId },
//         {
//           headers: {
//             "content-Type": "application/json",
//           },
//         }
//       );

//       toast.success(response.data.message);

//       console.log("The response from the add wishlist is: ", response);
//     }
//   };

//   return (
//     <div className="flex flex-col text-[#222222]">
//       <p className="text-xl md:text-2xl font-medium">{listingData?.title}</p>
//       <div className="grid grid-cols-1 md:grid-cols-5 items-center justify-end">
//         <div className="flex flex-row flex-wrap md:flex-nowrap items-center gap-2 col-span-4">
//           <p className="flex flex-row items-center gap-1">
//             <AiFillStar size={16} />
//             <p className="text-xs sm:text-sm">
//               {listingData?.ratings || "New"}
//             </p>
//           </p>
//           <span> · </span>
//           <p className="text-xs sm:text-sm">
//             {listingData?.reviews || "No reviews"}
//           </p>
//           <span> · </span>
//           <p className="text-xs sm:text-sm font-medium underline">
//             {listingData?.location?.addressLineOne ||
//               listingData?.location?.addressLineTwo ||
//               listingData?.location?.country?.name}
//           </p>
//         </div>
//         <div className="col-span-1 md:flex justify-end w-full hidden">
//           <div
//             className="flex flex-row-reverse gap-2 justify-center items-center cursor-pointer p-2 rounded-md w-[100px] bg-white hover:bg-[#f1f1f1] transition duration-200 ease-in"
//             onClick={handleAddToWishList}
//           >
//             <p className="text-sm underline underline-offset-1 font-medium">
//               {isSaved ? "Remove" : "Save"}
//             </p>
//             <FaHeart className={`w-full ${isSaved ? "text-red-500" : ""}`} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ListingTitle;

import { useState, useEffect } from "react";
import { AiFillHeart, AiOutlineHeart, AiFillStar } from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// import { addToWishlist, removeFromWishlist } from "../../actions/userActions";
import toast from "react-hot-toast";
import { addToWishlist, removeFromWishlist } from "../../redux/actions/userActions";

const ListingTitle = ({ listingData }) => {
  const { id } = useParams();
  const [isSaved, setIsSaved] = useState(false);
  const user = useSelector((state) => state.user.userDetails);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user && user.wishlist) {
      setIsSaved(user.wishlist.includes(id));
    }
  }, [user, id]);

  const handleAddToWishList = async () => {
    setIsSaved((prev) => !prev);

    if (id) {
      if (!isSaved) {
        dispatch(addToWishlist(id));
        toast.success("Room added to wishlist");
      } else {
        dispatch(removeFromWishlist(id));
        toast.success("Room removed from wishlist");
      }
    }
  };

  return (
    <div className="flex flex-col text-[#222222]">
      <p className="text-xl md:text-2xl font-medium">{listingData?.title}</p>
      <div className="grid grid-cols-1 md:grid-cols-5 items-center justify-end">
        <div className="flex flex-row flex-wrap md:flex-nowrap items-center gap-2 col-span-4">
          <p className="flex flex-row items-center gap-1">
            <AiFillStar size={16} />
            <p className="text-xs sm:text-sm">
              {listingData?.ratings || "New"}
            </p>
          </p>
          <span> · </span>
          <p className="text-xs sm:text-sm">
            {listingData?.reviews || "No reviews"}
          </p>
          <span> · </span>
          <p className="text-xs sm:text-sm font-medium underline">
            {listingData?.location?.addressLineOne ||
              listingData?.location?.addressLineTwo ||
              listingData?.location?.country?.name}
          </p>
        </div>
        <div className="col-span-1 md:flex justify-end w-full hidden">
          <div
            className="flex flex-row-reverse gap-2 justify-center items-center cursor-pointer p-2 rounded-md w-[100px] bg-white hover:bg-[#f1f1f1] transition duration-200 ease-in"
            onClick={handleAddToWishList}
          >
            <p className="text-sm underline underline-offset-1 font-medium">
              {isSaved ? "Remove" : "Save"}
            </p>
            {isSaved ? (
              <AiFillHeart className="w-full text-red-500" />
            ) : (
              <AiOutlineHeart className="w-full" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingTitle;

