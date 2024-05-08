import { useSelector } from "react-redux";
import PhotoCard from "../../Components/ListingRoom/PhotoCard";
import { useEffect, useState } from "react";

const ListingRoomStepTwoPhotos = () => {
  // get the house photos from redux
  const photos = useSelector((state) => state.room.newRoom?.photos);
  console.log("Photos", photos);

  const [roomPhotos, setRoomPhotos] = useState([]);

  useEffect(() => {
    setRoomPhotos([...roomPhotos, photos]);
  }, [photos]);
  return (
    <div className="flex flex-col gap-20 max-w-screen-md mx-auto my-6 min-h-[70vh]">
      <div className="flex flex-col gap-3 md:gap-0">
        <h1 className=" text-[#222222] text-2xl md:text-[32px] font-medium">
          {/* cabin will be dynamic */}
          Add some photos of your cabin
        </h1>
        <p className="text-base md:text-lg text-[#717171]">
          You&apos;ll need 5 photos to get started. You can add more or make
          changes later.
        </p>
      </div>

      {/* Take the photos of the room  */}
      <PhotoCard />

      {/* showing cloudinary saved link images */}
      <div className=" grid grid-cols-2 gap-5 items-center">
        {roomPhotos.length === 0
          ? null
          : photos?.map((photo, i) => {
              return (
                <div key={i}>
                  <img src={photo} alt="Houses" className="border shadow-md" />
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default ListingRoomStepTwoPhotos;
