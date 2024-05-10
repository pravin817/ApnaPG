import { useRef } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { useSelector } from "react-redux";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { dashboardNabvarItem } from "./DashboardNavItems";
import { Link } from "react-router-dom";

const DashboardMenu = () => {
  const user = useSelector((state) => state.user.userDetails);
  console.log("The user details : ", user);

  const isSmallDevice = window.innerWidth < 768;
  const userDashboardMenu = useRef();
  const { state: showDashboardMenu, setState: setShowDashboardMenu } =
    useOutsideClick(userDashboardMenu);

  const activePage = JSON.parse(sessionStorage.getItem("activePage"));

  const handleItemClick = (id) => {
    if (id === 4) return;

    JSON.stringify(sessionStorage.setItem("activePage", id));

    if (id === 2) {
      JSON.stringify(sessionStorage.setItem("reservationsPage", 1));
    }
  };

  return (
    <>
      {isSmallDevice ? (
        <>
          <div className="sm:relative">
            <button
              onClick={() => {
                setShowDashboardMenu((preValue) => !preValue);
              }}
              className=" flex flex-row gap-1 font-medium border-[1px] border-[#dddddd] rounded-full py-2 px-3 cursor-pointer relative user-menu"
            >
              Menu
              <span>
                {showDashboardMenu ? (
                  <MdKeyboardArrowUp size={24} />
                ) : (
                  <MdKeyboardArrowDown size={24} />
                )}
              </span>
            </button>

            {/* show Menu Options  */}
            {showDashboardMenu && (
              <div
                ref={userDashboardMenu}
                className="shadow-md absolute right-28 top-16 sm:right-12 sm:top-12 bg-[#ffffff] rounded-lg flex flex-col py-2 w-[205px] transition-all user-menu text-white"
              >
                {dashboardNabvarItem.map((item, i) => {
                  return (
                    <div
                      key={i}
                      className=" px-4 py-3 hover:bg-[#f1f1f1] text-white"
                    >
                      <Link
                        className={`text-sm font-medium ${
                          activePage === item.id
                            ? "font-medium hover:bg-white transition duration-200 text-white"
                            : "opactity-80"
                        }`}
                        to={`${
                          item.id === 4
                            ? `${item.to}`
                            : `/users/dashboard/${user?._id}${item.to}`
                        }`}
                        onClick={() => {
                          handleItemClick(item.id);
                          setShowDashboardMenu(false);
                        }}
                      >
                        {item.name}
                      </Link>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-row gap-4 md:gap-8 items-center justify-between">
            {dashboardNabvarItem.map((item, i) => {
              return (
                <div key={i}>
                  <Link
                    to={`${
                      item.id === 4
                        ? `${item.to}`
                        : `/users/dashboard/${user?._id}${item.to}`
                    }`}
                  >
                    <p
                      className={`text-white cursor-pointer p-2 text-sm whitespace-nowrap rounded-full hover:bg-[#f0f0f0] hover:text-black transition duration-300 ${
                        activePage === item.id
                          ? "font-medium text-[#ff3f62ff] hover:bg-white transition duration-300"
                          : "opacity-80"
                      }`}
                      onClick={() => {
                        handleItemClick(item.id);
                      }}
                    >
                      {item.name}
                    </p>
                  </Link>
                </div>
              );
            })}
          </div>
        </>
      )}
    </>
  );
};

export default DashboardMenu;
