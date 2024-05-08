const Cards = ({ title, icon, heading, subHeading }) => {
  return (
    <div className="border w-full xl:w-[250px] h-[138px] bg-white shadow rounded-xl flex flex-col gap-2 p-7">
      <div className="flex flex-row justify-between items-center">
        <p className="text-zinc-800 text-sm font-medium"> {title}</p>
        <img src={icon} alt="dashboard Icon" className="w-6" />
      </div>
      <div>
        <h3 className="text-2xl text-zinc-800 font-semibold">{heading}</h3>
        <p className=" text-xs text-[#717171] pt-2">{subHeading}</p>
      </div>
    </div>
  );
};

export default Cards;
