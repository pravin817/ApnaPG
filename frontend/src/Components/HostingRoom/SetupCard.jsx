const SetupCard = ({ heading, subHeading, img }) => {
  return (
    <div
      className={`flex flex-col gap-2 ${
        img ? "justify-between items-center" : ""
      }`}
    >
      <img
        src={img}
        alt="apartment"
        className={`w-full h-full object-cover rounded-lg ${
          img ? "block" : "hidden"
        }`}
        style={{ width: "100%", height: "100%" }} 
      />
      <div className={`${img ? "" : "flex flex-col gap-2"}`}>
        <h3
          className={`text-[#222222] font-medium ${
            img ? "text-center text-xs md:text-sm xl:text-base" : "text-lg"
          }`}
        >
          {heading}
        </h3>
        <p
          className={`text-[#717171] ${
            img
              ? "text-center text-xs md:text-sm xl:text-base"
              : "text-sm sm:text-base"
          }`}
        >
          {subHeading}
        </p>
      </div>
    </div>
  );
};

export default SetupCard;
