import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import cameraIcon from "../../assets/BasicIcon/cameraIcon.png";
import UserProfilePopup from "../../Components/PopUp/userProfilePopup/UserProfilePopup";

import UserProfileOptions from "../../Components/UserProfile/UserProfileOptions";
import UserAbout from "../../Components/UserProfile/UserAbout";
import { PulseLoader } from "react-spinners";
import api from "../../backend";

const EditProfile = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [profileImageLink, setProfileImageLink] = useState(null);

  // get the user details
  const user = useSelector((state) => state.user.userDetails);
  console.log("User Details from editProfile: ", user);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    console.log("Image: ", e.target.files[0]);
  };

  // Upload the Image to the cloudinary
  useEffect(() => {
    if (image !== null && image?.size / 500000 < 5) {
      const imageFormData = new FormData();
      imageFormData.append("file", image);
      imageFormData.append("upload_preset", "ApnaPG_preset");
      imageFormData.append(
        "cloud_name",
        import.meta.env.VITE_APP_CLOUDINARY_CLOUD_NAME
      );

      try {
        setIsLoading(true);
        let cloudName = import.meta.env.VITE_APP_CLOUDINARY_CLOUD_NAME;
        let url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

        fetch(url, {
          method: "POST",
          body: imageFormData,
        })
          .then((res) => res.json())
          .then((data) => {
            setProfileImageLink(data.secure_url);
            console.log(data.url);

            if (data.error) {
              toast.error(data?.error?.message);
              setIsLoading(false);
              setProfileImageLink(null);
            } else {
              setIsLoading(false);
              // toast.success("Image uploaded successfully");
              console.log("Image uploaded successfully: ", data.secure_url);
            }
          })
          .catch((error) => {
            console.log(
              "Error while uploading the image to cloudinary: ",
              error
            );
            toast.error("Error while uploading the image to cloudinary");
            setIsLoading(false);
          });
      } catch (error) {
        console.log("Error while uploading the image to cloudinary: ", error);
        toast.error("Error while uploading the image to cloudinary");
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    } else if (image?.size / 500000 > 5) {
      toast.error("Image size should be less than 5MB");
      setIsLoading(false);
    }
  }, [image]);

  // Save the image into the database
  useEffect(() => {
    async function uploadImage() {
      setIsLoading(true);
      if (profileImageLink) {
        let imageLink = {
          id: user?._id,
          profileImg: profileImageLink,
        };

        const res = api.post("/auth/uploadImage", imageLink, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        console.log("Response from the server: ", res);
        toast.promise(
          res,
          {
            loading: "Uploading image.....",
            success: "Image uploaded successfully!",
            error: "Upload failed try again!",
          },
          {
            position: "top-center",
            style: {
              minWidth: "250px",
            },
            success: {
              duration: 2500,
            },
          }
        );
        console.log("Image uploaded successfully: ", res);
        setProfileImageLink(null);
        setIsLoading(false);
        window.location.reload();
      }
    }

    uploadImage();
  }, [profileImageLink, user?._id]);

  return (
    <div>
      <main className=" max-w-[1200px] mx-auto xl:px-10 py-12 flex min-h-[80vh] relative">
        <section className="flex flex-row gap-16 items-start flex-auto">
          {user?.profileImg ? (
            <div className="relative md:w-[320px]">
              <figure>
                <img
                  src={user?.profileImg}
                  alt="User image"
                  className=" max-w-xs rounded-full border-[1px]"
                />
              </figure>
              <div className=" flex justify-center items-center relative">
                <label
                  htmlFor="imageUpload"
                  className="absolute flex flex-row gap-2 items-center bg-white shadow-md px-3 py-2 rounded-full -bottom-4 cursor-pointer"
                >
                  {!isLoading ? (
                    <PulseLoader
                      color="#ff3f62ff"
                      size={10}
                      speedMultiplier={0.8}
                    />
                  ) : (
                    <>
                      <img
                        src={cameraIcon}
                        alt="Choose photo"
                        className=" w-4"
                      />
                      <p className=" text-sm text-[#222222] font-medium">Add</p>
                    </>
                  )}
                </label>
                <input
                  type="file"
                  id="imageUpload"
                  className="hidden"
                  onChange={handleImageChange}
                  accept=".jpg,.jpeg,.png,image/jpeg,image/jpg,image/png"
                />
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-4 justify-center items-center w-[350px] h-[220px] p-7 sticky top-[128px]">
              <div className=" min-w-[214px] min-h-[214px] bg-[#222222] rounded-full flex justify-center items-center relative">
                <p className=" text-8xl text-white font-semibold mb-2">
                  {user?.name?.firstName?.slice(0, 1)}
                </p>
                <label
                  htmlFor="imageUpload"
                  className="absolute flex flex-row gap-2 items-center bg-white shadow-md px-3 py-2 rounded-full -bottom-4 cursor-pointer"
                >
                  {!isLoading ? (
                    <PulseLoader
                      color="#ff3f62ff"
                      size={10}
                      speedMultiplier={0.8}
                    />
                  ) : (
                    <>
                      <img
                        src={cameraIcon}
                        alt="Choose photo"
                        className=" w-4"
                      />
                      <p className=" text-sm text-[#222222] font-medium">Add</p>
                    </>
                  )}
                </label>
                <input
                  type="file"
                  id="imageUpload"
                  className="hidden"
                  onChange={handleImageChange}
                  accept=".jpg,.jpeg,.png,image/jpeg,image/jpg,image/png"
                />
              </div>
            </div>
          )}
          <section className="xl:min-h-[400px] flex flex-col flex-1 ">
            <UserProfileOptions
              setShowPopup={setShowPopup}
              setSelectedOption={setSelectedOption}
            />
            <UserAbout setShowPopup={setShowPopup} />
          </section>
        </section>
      </main>

      <div className="border-t border-[#dddddd] py-5 bg-[#ffffff] w-full flex flex-row-reverse">
        <Link
          to={`/users/show/${user?._id}`}
          className="px-7 py-3 bg-[#282828] hover:bg-[#000000] text-white rounded-lg mx-6 font-medium"
          onClick={() => {
            window.reload();
          }}
        >
          Done
        </Link>
      </div>

      {showPopup && (
        <UserProfilePopup
          showPopup={showPopup}
          setShowPopup={setShowPopup}
          popupData={selectedOption}
        />
      )}
    </div>
  );
};

export default EditProfile;
