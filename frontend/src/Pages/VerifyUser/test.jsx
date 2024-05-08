import React, { useState } from "react";
import backIcon from "../../assets/BasicIcon/backIcon.png";
import { LiaPhotoVideoSolid } from "react-icons/lia";
import { PropagateLoader } from "react-spinners";
import toast from "react-hot-toast";

const governmentDocumentDetail = [
  {
    id: 1,
    title: "Passport",
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

const VerifyDoc = ({ id }) => {
  const [inputImage, setInputImage] = useState(null);
  const [isImageUploading, setIsImageUploading] = useState(false);

  const handleImageSelect = (event) => {
    const selectedImage = event.target.files[0];
    if (selectedImage) {
      setInputImage(selectedImage);
    }
  };

  const handleUploadImage = async () => {
    if (!inputImage) {
      toast.error("Please select an image to upload.");
      return;
    }

    // Upload image to Cloudinary or any other service
    setIsImageUploading(true);
    try {
      // Placeholder logic for image upload (replace with your actual upload logic)
      // Here, you would upload the image to your desired service (e.g., Cloudinary)
      // For example:
      // const formData = new FormData();
      // formData.append("file", inputImage);
      // const response = await fetch("your_upload_url", {
      //   method: "POST",
      //   body: formData,
      // });
      // const data = await response.json();
      // Handle response accordingly
      toast.success("Image uploaded successfully.");
      setInputImage(null); // Reset inputImage state after successful upload
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
  

      <div className="mt-2">
        <hr className="mt-2 w-full h-[1px] bg-[#dddddd] z-0" />

        <div className="mt-10 w-11/12 mx-auto">
          <div className="w-11/12 mx-auto flex flex-col items-center justify-center ">
            <div className="w-full text-center">
              <h5 className="text-[#222222] text-xl font-semibold">
                Upload {governmentDocumentDetail[id - 1].title}
              </h5>
              <p className="text-[#717171] mt-2">
                {governmentDocumentDetail[id - 1].description}
              </p>
            <label
              htmlFor="houseImage"
              className="py-20 mt-3 mb-4 bg-white border-dashed border-[#b0b0b0] border flex justify-center items-center max-h-[250px] w-10/12"
            >
              {isImageUploading ? (
                <>
                  <PropagateLoader loading color="#717171" />
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
                id="houseImage"
                accept=".jpg,.jpeg,.png,image/jpeg,image/jpg,image/png"
                onChange={handleImageSelect}
              />
            </label>
            <button
              className="btn bg-black px-2 py-1 rounded-md text-white cursor-pointer"
              onClick={handleUploadImage}
            >
              Upload
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VerifyDoc;
