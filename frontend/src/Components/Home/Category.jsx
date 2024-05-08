import { useNavigate } from "react-router-dom";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import Carousel from "react-elastic-carousel";
import { consts } from "react-elastic-carousel";
import { categoryApi } from "./categoryApi";

const Category = ({ styleGrid }) => {
  const category = localStorage.getItem("category");
  console.log("The category is : ", category);
  const navigate = useNavigate();

  const handleSelectedCat = (cat) => {
    JSON.stringify(localStorage.setItem("category", cat?.name));

    navigate(`/?category=${cat.name}`);
  };

  const breakPoints = [
    { width: 300, itemsToShow: 3 },
    { width: 500, itemsToShow: 5 },
    { width: 768, itemsToShow: 8 },
  ];

  return (
    <div className={` flex flex-row gap-1 ${styleGrid}`}>
      <Carousel
        // itemsToShow={8}
        breakPoints={breakPoints}
        pagination={false}
        disableArrowsOnEnd={true}
        itemsToScroll={4}
        enableSwipe={true}
        enableMouseSwipe={true}
        renderArrow={myArrow}
      >
        {categoryApi.map((cat, i) => {
          return (
            <div key={i}>
              <div
                onClick={() => {
                  handleSelectedCat(cat);
                }}
                className={`flex flex-col-reverse items-center gap-1 cursor-pointer relative pb-4 transition duration-200 ease-in ${
                  category === cat.name
                    ? "opacity-100"
                    : "opacity-70 hover:opacity-100"
                }`}
              >
                <p className="text-xs font-medium">{cat?.name}</p>
                <cat.svg size={28} />
              </div>
              <div
                className={`w-9 absolute bg-[#222222] h-[2px] bottom-0 ${
                  category === cat.name ? "block" : "hidden"
                }`}
              ></div>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

// custom arrow for carousel
const myArrow = ({ type, onClick, isEdge }) => {
  const pointer =
    type === consts.PREV ? (
      <MdKeyboardArrowLeft size={18} />
    ) : (
      <MdKeyboardArrowRight size={18} />
    );
  return (
    <button
      className=" p-1 rounded-full border-neutral-400 border bg-white flex items-center max-h-[32px] my-auto hover:shadow-lg mb-6"
      onClick={onClick}
      disabled={isEdge}
    >
      {pointer}
    </button>
  );
};
export default Category;
