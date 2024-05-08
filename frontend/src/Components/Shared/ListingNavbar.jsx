import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUser } from "../../redux/actions/userActions";

const ListingNavbar = () => {
  const [isSticky, setIsSticky] = useState(false);

  // get the user details
  const user = useSelector((state) => state.user.userDetails);

  const dispatch = useDispatch();

  const handleSticky = () => {
    if (window.scrollY > 0) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };

  useEffect(() => {
    dispatch(getUser());
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleSticky);
    return () => {
      window.removeEventListener("scroll", handleSticky);
    };
  }, []);
  return (
    <nav
      className={` top-0 z-10 bg-white transition-all duration-300 max-w-screen-xl px-4 sm:px-8 md:px-10 xl:px-20 xl:mx-auto ${
        isSticky ? " border-b-[1.4px] border-[#f1f1f1] sticky bottom-0" : ""
      }`}
    >
      <div className="pt-6 pb-4 flex flex-row justify-between items-center">
        <div className=" md:w-[160px]">
          <span className="flex flex-row gap-2 items-center max-w-[120px]">
            <Link to={"/"} className="text-xl text-[#ff385c] font-bold">
              Apna<span className="text-black">PG</span>
            </Link>
          </span>
        </div>

        <div className=" flex flex-row items-center gap-5 text-sm text-[#222222] font-medium">
          <Link
            to={`/users/dashboard/${user?._id}/overview=true`}
            className=" border-[1.3px] border-[#dddddd] px-4 py-2 rounded-full hover:border-[#222222]"
          >
            Dashboard
          </Link>
          <Link
            to={"/"}
            className=" border-[1.3px] border-[#dddddd] px-4 py-2 rounded-full hover:border-[#222222]"
          >
            Exist
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default ListingNavbar;
