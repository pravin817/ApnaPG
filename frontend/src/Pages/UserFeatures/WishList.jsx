import { useEffect, useState } from "react";
import api from "../../backend";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { BsFillHeartFill } from "react-icons/bs";
import { AiFillStar } from "react-icons/ai";
import { FaSpinner } from "react-icons/fa";
import backIcon from "../../assets/BasicIcon/backIcon.png";

const WishList = () => {
  const [wishList, setWishList] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchWishList = async () => {
      try {
        const res = await api.post(
          "/auth/get-wishlist",
          {},
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log(res.data.rooms);
        setWishList(res?.data?.rooms);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
        setLoading(false);
      }
    };
    fetchWishList();
  }, []);

  const removeFromWishList = async (roomId) => {
    try {
      // Call API to remove room from wishlist
      const res = await api.post("/room/remove-from-wishlist", { roomId });

      if (res.data.success) {
        toast.success("The room removed from the wishlist");
      } else {
        toast.error("Fail to remove from the wishlist");
      }
      // Filter out the removed room from the wishlist state
      setWishList(wishList.filter((room) => room._id !== roomId));
    } catch (error) {
      console.error("Error removing item from wishlist:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center w-screen h-screen">
        <FaSpinner className="animate-spin text-4xl text-gray-600" />
      </div>
    );
  }

  return (
    <main className="max-w-screen-xl mx-auto px-4 sm:px-8 md:px-10 xl:px-20 pb-10">
      <section className="pt-8 flex flex-col gap-5">
        <div className="flex flex-rows gap-3 items-center sticky top-20 px-2 py-2 bg-white">
          <img
            src={backIcon}
            alt="back"
            onClick={() => {
              navigate(-1);
            }}
            className="w-4 mix-blend-darken cursor-pointer hover:rounded-full hover:bg-[#f1f1f1] inline-block"
          />
          <h5 className="text-[#222222] text-xl font-semibold">Wishlist</h5>
        </div>
        <div className="flex flex-col overflow-x-auto">
          <div className="">
            <div className="inline-block min-w-full py-2">
              <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm font-light">
                  <thead className="text-xs text-[#717171] font-medium border-b border-[#dddddd]">
                    <tr>
                      <th scope="col" className="px-3 py-2">
                        SR.NO
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Title
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Description
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Location
                      </th>
                      <th scope="col" className="px-3 py-4">
                        Guests
                      </th>
                      <th scope="col" className="px-3 py-4">
                        Bedrooms
                      </th>
                      <th scope="col" className="px-3 py-4">
                        Beds
                      </th>
                      <th scope="col" className="px-3 py-4">
                        Amenities
                      </th>
                      <th scope="col" className="px-6 py-4 uppercase">
                        Price per head
                      </th>
                      <th scope="col" className="px-8 py-4 uppercase">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {wishList?.map((room, i, arr) => {
                      return (
                        <tr
                          key={i}
                          className={`border hover:bg-[#F9FAFF] hover:cursor-pointer rounded-md`}
                          onClick={() => {
                            navigate(`/rooms/${room?._id}`);
                          }}
                        >
                          {/* sr.no  */}
                          <td className="px-6 py-4 w-[20px]">
                            <div className="flex felx-row gap-2 items-center">
                              {i + 1}
                            </div>
                          </td>
                          {/* images & title */}
                          <td className="px-6 py-4 flex flex-col items-start gap-2 w-[210px]">
                            <img
                              src={room?.photos[0]}
                              alt="Listing houses"
                              className="aspect-[16/10] object-cover w-32 rounded"
                            />
                            <p className="text-sm text-[#222222] font-semibold w-[200px] truncate">
                              {room?.title}
                            </p>
                          </td>
                          {/* Location */}
                          <td className="px-4 py-2 w-[300px]">
                            <div className="flex felx-row gap-2 items-center">
                              {room?.description?.slice(0, 50)}...
                            </div>
                          </td>
                          {/* instance book */}
                          <td className="px-6 py-4 w-[150px]">
                            {room?.location?.addressLineOne},{" "}
                            {room?.location?.addressLineTwo},{" "}
                            {room?.location?.city?.name},{" "}
                            {room?.location?.state?.name},{" "}
                            {room?.location?.country?.name},{" "}
                          </td>
                          {/* Guest */}
                          <td className="px-6 py-4 w-[100px]">
                            {room?.floorPlan?.guests}
                          </td>
                          {/* bedsNumber */}
                          <td className="px-6 py-4 w-[100px]">
                            {room?.floorPlan?.beds}
                          </td>
                          {/* bathRoomsNumber */}
                          <td className="px-6 py-4 w-[100px]">
                            {room?.floorPlan?.bathRoomsNumber}
                          </td>
                          {/* Amenities */}
                          <td className="px-2 py-4 w-[200px]">
                            {room?.amenities?.slice(0, 1)}...
                          </td>
                          {/* Base price */}
                          <td className="px-6 py-4 max-w-[10px]">
                            {room?.basePrice}
                          </td>

                          {/* Base price */}
                          <td className="px-1 py-1 max-w-[10px]">
                            <button
                              onClick={() => removeFromWishList(room._id)}
                              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                            >
                              Remove
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default WishList;
