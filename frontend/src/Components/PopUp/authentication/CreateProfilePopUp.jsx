import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const CreateProfilePopup = ({
  setShowProfilePopup,
  setPopup,
  setDefaultPopup,
}) => {
  // get the user Id
  const userId = useSelector((state) => state.user?.userDetails._id);
  console.log("The user id from the create profile popup ", userId);
  return (
    <div className="flex flex-col gap-4">
      <div className="px-8 pt-1 bg-[#fafafa] h-[60vh]">
        <div className=" flex flex-col gap-3 justify-center items-center max-w-[35vw] pt-6 text-[#222222] mx-auto">
          {/* The Company logo */}
          <div className="flex flex-row gap-2 items-center m-2">
            <Link className="text-xl text-[#ff385c] font-bold">
              <h1 className="font-bold text-2xl">
                Apna<span className="text-black">PG</span>
              </h1>
            </Link>
          </div>

          <h4 className=" text-2xl font-semibold">Welcome to ApnaPG</h4>
          <p className=" text-center text-sm">
            Discover places to stay and unique experiences around the world.
          </p>
        </div>
        <div className=" px-5 mt-5 w-full flex justify-center">
          <Link
            to={`/users/show/${userId}`}
            className=" bg-[#282828] text-[#ffffff] text-center font-medium block w-full py-2 rounded-md hover:bg-[#000000] transition-colors duration-300"
            onClick={() => {
              setShowProfilePopup(false);
              setPopup(false);
              setDefaultPopup(true);
            }}
          >
            Continue
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CreateProfilePopup;
