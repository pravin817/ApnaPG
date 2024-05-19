import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GrInProgress } from "react-icons/gr";
import { AiFillCheckCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { toggleRoomVisibility } from "../../../redux/actions/roomActions";

const ListingTable = () => {
  const allListingsData = useSelector((state) => state.room.roomsData);
  const [loadingId, setLoadingId] = useState(null); // State to track which listing is loading
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleToggleVisibility = (id, currentStatus) => {
    setLoadingId(id); // Set loading state
    const newStatus = currentStatus === "show" ? "hide" : "show";
    dispatch(toggleRoomVisibility(id, newStatus)).finally(() =>
      setLoadingId(null)
    ); // Clear loading state after action
  };

  return (
    <>
      <div className="flex flex-col overflow-x-auto">
        <div className="">
          <div className="inline-block min-w-full py-2">
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm font-light">
                <thead className=" text-xs text-[#717171] font-medium border-b border-[#dddddd]">
                  <tr>
                    <th scope="col" className="px-6 py-4">
                      SR.NO
                    </th>
                    <th scope="col" className="px-6 py-4">
                      LISTING
                    </th>
                    <th scope="col" className="px-6 py-4">
                      STATUS
                    </th>
                    <th scope="col" className="px-6 py-4">
                      INSTANT BOOK
                    </th>
                    <th scope="col" className="px-6 py-4">
                      BEDROOMS
                    </th>
                    <th scope="col" className="px-6 py-4">
                      BEDS
                    </th>
                    <th scope="col" className="px-6 py-4">
                      BATHS
                    </th>
                    <th scope="col" className="px-6 py-4">
                      LOCATION
                    </th>
                    <th scope="col" className="px-6 py-4">
                      PRICE
                    </th>
                    <th scope="col" className="px-6 py-4 uppercase">
                      CREATED AT
                    </th>
                    <th scope="col" className="px-6 py-4">
                      ACTION
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {allListingsData?.map((listing, i, arr) => (
                    <tr
                      key={i}
                      className={`${
                        i === arr.length - 1 ? "" : "border-b border-[#dddddd]"
                      } hover:bg-[#F9FAFF] hover:cursor-pointer rounded-md`}
                      onClick={() => {
                        navigate(`/rooms/${listing?._id}`);
                      }}
                    >
                      <td className=" px-6 py-4 w-[100px]">{i + 1}</td>
                      <td className=" px-6 py-4 flex flex-row items-center gap-2">
                        <img
                          src={listing?.photos[0]}
                          alt="Listing houses"
                          className=" aspect-[16/10] object-cover w-16 rounded"
                        />
                        <p className=" text-sm text-[#222222] font-semibold w-[200px] truncate">
                          {listing?.title}
                        </p>
                      </td>
                      <td className=" px-6 py-4 w-[100px]">
                        <div className=" flex felx-row gap-2 items-center">
                          <GrInProgress size={14} />
                          {listing?.status}
                        </div>
                      </td>
                      <td className="px-6 py-4 w-[150px]">
                        {listing?.status === "Complete" ? (
                          <div className=" flex flex-row gap-2 items-center">
                            <AiFillCheckCircle size={20} color="#008a05" />
                            <p>On</p>
                          </div>
                        ) : (
                          <div className=" flex flex-row gap-2 items-center">
                            <AiFillCheckCircle size={20} color="#dddddd" />
                            <p>Off</p>
                          </div>
                        )}
                      </td>
                      <td className=" px-6 py-4 w-[100px]">
                        {listing?.floorPlan?.bedrooms}
                      </td>
                      <td className=" px-6 py-4 w-[100px]">
                        {listing?.floorPlan?.beds}
                      </td>
                      <td className=" px-6 py-4 w-[100px]">
                        {listing?.floorPlan?.bathRoomsNumber}
                      </td>
                      <td className=" px-2 py-4 w-[200px]">
                        {listing?.location?.addressLineOne ||
                          listing?.location?.addressLineTwo ||
                          `${listing?.location?.city}, ${listing?.location?.country?.name}`}
                      </td>
                      <td className=" px-6 py-4 max-w-[10px]">
                        {listing?.basePrice}
                      </td>
                      <td className=" px-6 py-4 max-w-[10px]">
                        {listing?.created_at.split("T")[0]}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          className={`px-4 py-2 rounded ${
                            listing?.showStatus === "show"
                              ? "bg-red-500 text-white"
                              : "bg-green-500 text-white"
                          }`}
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent triggering row click
                            handleToggleVisibility(
                              listing?._id,
                              listing?.showStatus
                            );
                          }}
                          disabled={loadingId === listing?._id} // Disable button if loading
                        >
                          {loadingId === listing?._id
                            ? "Loading..."
                            : listing?.showStatus === "show"
                            ? "Hide"
                            : "Show"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="text-sm text-gray-500 mt-4">
        Note: The base price is for 1 guest for 1 night/day.
      </div>
    </>
  );
};

export default ListingTable;
