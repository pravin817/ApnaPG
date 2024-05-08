import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { LiaPhotoVideoSolid } from "react-icons/lia";
import { PropagateLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { createNewRoom } from "../../redux/actions/roomActions";

const PhotoCard = () => {
  const newRoomData = useSelector((state) => state.room.newRoom);
  const [images, setImages] = useState([]);
  const [inputImage, setInputImage] = useState(null);
  const [isImageUploading, setIsImageUploading] = useState(false);

  const dispatch = useDispatch();

  // saving photos state globally
  useEffect(() => {
    dispatch(
      createNewRoom(
        newRoomData?.roomType,
        newRoomData?.privacyType,
        newRoomData?.location,
        newRoomData?.floorPlan,
        newRoomData?.amenities,
        images
      )
    );
  }, [images, dispatch]);

  const handleImageSelect = (event) => {
    if (images.length >= 3) {
      toast.error("Maximum images uploaded");
      return;
    } else {
      setInputImage(event.target.files[0]);
      console.log(event.target.files[0]);
    }
  };

  useEffect(() => {
    async function uploadImagetoCloudinary() {
      if (inputImage !== null && inputImage?.size / 500000 < 5) {
        const imageFormData = new FormData();
        imageFormData.append("file", inputImage);
        imageFormData.append("upload_preset", "ApnaPG_preset");
        imageFormData.append(
          "cloud_name",
          import.meta.env.VITE_APP_CLOUDINARY_CLOUD_NAME
        );

        // saving to cloudinary
        setIsImageUploading(true);
        try {
          let cloudName = import.meta.env.VITE_APP_CLOUDINARY_CLOUD_NAME;
          let url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
          await fetch(url, {
            method: "POST",
            body: imageFormData,
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              setImages([...images, data.url]);
              if (data.error) {
                toast.error(data?.error?.message);
                setIsImageUploading(false);
                setImages(null);
              } else {
                setIsImageUploading(false);
              }
            })
            .catch((err) => {
              toast.error(err.message + "try again");
              setIsImageUploading(false);
            });
        } catch (error) {
          console.log(error);
          toast.error(error);
          setIsImageUploading(false);
        } finally {
          setIsImageUploading(false);
          setInputImage(null);
        }
      } else if (inputImage?.size / 500000 > 5) {
        toast.error("Image size can't exceed 5mb");
        setIsImageUploading(false);
      }
    }
    uploadImagetoCloudinary();
    // only when input file takes an image we want to save it to cloudinary that's why only one dependency
  }, [inputImage]);

  console.log(images);
  return (
    <label
      htmlFor="houseImage"
      className=" py-20 bg-white border-dashed border-[#b0b0b0] border flex justify-center items-center min-h-[340px]"
    >
      {isImageUploading ? (
        <>
          <PropagateLoader loading color="#717171" />
        </>
      ) : (
        <div className=" flex flex-col justify-center items-center gap-3">
          <div>
            <LiaPhotoVideoSolid size={72} />
          </div>
          <div className="text-center h-[100px]">
            <h6 className=" text-2xl text-black font-medium py-2">
              Select your photos here
            </h6>
            <p className=" text-[#717171] text-lg">
              {/* dynamically counting how many photos selected */}
              {images.length !== 0 ? (
                <>
                  {images.length === 3
                    ? `${images.length} images uploaded`
                    : `Choose ${3 - images.length} more photos`}
                </>
              ) : (
                "Choose at least 3 photos"
              )}
            </p>
            <p className=" text-black text-sm underline underline-offset-2 font-medium cursor-pointer">
              Upload from your device
            </p>
          </div>
        </div>
      )}
      <input
        type="file"
        name="photos"
        className=" hidden"
        onChange={handleImageSelect}
        id="houseImage"
        multiple
        accept=".jpg,.jpeg,.png,image/jpeg,image/jpg,image/png"
      />
    </label>
  );
};

export default PhotoCard;
