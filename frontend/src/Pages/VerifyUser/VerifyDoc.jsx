import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import backIcon from "../../assets/BasicIcon/backIcon.png";
import { LiaPhotoVideoSolid } from "react-icons/lia";
import toast from "react-hot-toast";
import { PulseLoader } from "react-spinners";
import api from "../../backend";

const governmentDocumentDetail = [
  {
    id: 1,
    title: "Passport ",
    description: "Upload the image of the passport photo page",
  },
  {
    id: 2,
    title: "Aadhaar Card",
    description: "Upload the image of the front page of the Aadhaar Card",
  },
  {
    id: 3,
    title: "PAN Card",
    description: "Upload the image of the front page of the PAN Card",
  },
];

const VerifyDoc = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [image, setImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isImageUploading, setIsImageUploading] = useState(false);

  const user = useSelector((state) => state.user.userDetails);

  const handleImageSelect = (event) => {
    const img = event.target.files[0];
    if (img) {
      setSelectedImage(URL.createObjectURL(img));
      setImage(img);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImage(null);
  };

  const handleUploadImage = async () => {
    setIsImageUploading(true);

    if (!image) {
      toast.error("Please select an image to upload.");
      setIsImageUploading(false);
      return;
    }

    const imageFormData = new FormData();
    imageFormData.append("file", image);
    imageFormData.append("upload_preset", "ApnaPG_preset");
    imageFormData.append(
      "cloud_name",
      import.meta.env.VITE_APP_CLOUDINARY_CLOUD_NAME
    );

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_APP_CLOUDINARY_CLOUD_NAME
        }/image/upload`,
        {
          method: "POST",
          body: imageFormData,
        }
      );
      const data = await response.json();
      console.log("The data is ", data);
      console.log("The url of the image is from verify doc ", data.url);
      if (data.error) {
        toast.error(data.error.message);
      } else {
        // Send request to backend to handle document verification
        const document = {
          image: data.url,
          docType: governmentDocumentDetail[id - 1].title,
        };

        const res = api.post("/auth/upload-document", document, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        console.log("The response is ", res);
        toast.success(
          "Document sent for verification. You will receive an email about the verification."
        );
        navigate(`/users/show/${user?._id}/verify-account`);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error(
        "An error occurred while uploading the image. Please try again."
      );
    } finally {
      setIsImageUploading(false);
    }
  };

  return (
    <section className="max-w-[1200px] mx-auto px-4 sm:px-8 md:px-10 xl:px-20 py-8 md:py-12">
      <div
        onClick={() => {
          navigate(-1);
        }}
        className="flex flex-rows gap-3 items-center"
      >
        <img
          src={backIcon}
          alt="back"
          className="w-4 mix-blend-darken cursor-pointer hover:rounded-full hover:bg-[#f1f1f1] inline-block"
        />
        <h5 className="text-[#222222] text-xl font-semibold">
          Upload {governmentDocumentDetail[id - 1].title}
        </h5>
      </div>

      <div className="mt-2">
        <hr className="mt-2 w-full h-[1px] bg-[#dddddd] z-0" />

        <div className="mt-10 w-11/12 mx-auto">
          <div className="w-11/12 mx-auto flex flex-col items-center justify-center">
            <h2 className="text-xl font-semibold p-2 text-center">
              {governmentDocumentDetail[id - 1].title}
            </h2>
            <p className="text-base text-center">
              {governmentDocumentDetail[id - 1].description}
            </p>
            <label
              htmlFor="houseImage"
              className="py-20 mt-3 mb-4 bg-white border-dashed border-[#2e2a2a] border flex justify-center items-center max-h-[250px] w-full md:w-9/12 lg:w-2/3 xl:w-1/2 relative rounded-lg"
            >
              {selectedImage ? (
                <>
                  <img
                    src={selectedImage}
                    alt="Selected Document"
                    className="max-h-[250px] p-2"
                  />
                  <button
                    className="text-sm absolute bottom-2 right-2 bg-red-500 text-white px-2 py-1 rounded-lg"
                    onClick={handleRemoveImage}
                  >
                    Remove
                  </button>
                </>
              ) : (
                <div className="flex flex-col justify-center items-center gap-3">
                  <div>
                    <LiaPhotoVideoSolid size={72} />
                  </div>
                  <div className="text-center h-[100px]">
                    <h6 className="text-xl text-black font-medium py-2">
                      Select your photo of{" "}
                      {governmentDocumentDetail[id - 1].title} here
                    </h6>
                    <p className="text-black text-sm underline underline-offset-2 font-medium cursor-pointer">
                      Upload from your device
                    </p>
                  </div>
                </div>
              )}
              <input
                type="file"
                name="photos"
                className="hidden"
                onChange={handleImageSelect}
                id="houseImage"
                multiple
                accept=".jpg,.jpeg,.png,image/jpeg,image/jpg,image/png"
              />
            </label>
            <div className="relative">
              <button
                className="btn bg-black px-2 py-1 rounded-md text-white cursor-pointer w-full"
                onClick={handleUploadImage}
                disabled={isImageUploading}
                style={{ minWidth: "120px" }} // Set a minimum width for the button
              >
                {isImageUploading ? (
                  <PulseLoader
                    color="#ff3f62ff"
                    size={10}
                    speedMultiplier={0.8}
                  />
                ) : (
                  "Upload"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VerifyDoc;
