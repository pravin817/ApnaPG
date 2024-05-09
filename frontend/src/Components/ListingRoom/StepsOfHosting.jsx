import aboutPlace from "../../assets/aboutPlace.png";
import standOut from "../../assets/standOut.png";
import publish from "../../assets/publish.png";
import OverviewCard from "./OverviewCard";

const StepsOfHosting = () => {
  return (
    <section className=" h-[92vh] grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-10 justify-between items-center bg-white max-w-screen-xl xl:mx-auto mb-10 lg:mt-4">
      <h1 className="text-[#222222] text-3xl sm:text-3xl xl:text-[56px] font-medium max-w-[600px] leading-[2]">
        Getting started on ApnaPG is simple and straightforward
      </h1>

      <div className="flex flex-col gap-5">
        <OverviewCard
          num={1}
          head={"Describe your property"}
          desc={
            "Clarify whether it's a whole property or individual rooms. Specify the location and maximum guest capacity for ApnaPG."
          }
          img={aboutPlace}
        />
        <hr className=" my-5 bg-[#dddddd] h-[1.4px]" />
        <OverviewCard
          num={2}
          head={"Elevate your listing"}
          desc={
            "Highlight unique amenities and upload 3 photos. Craft a captivating title and description for your ApnaPG space."
          }
          img={standOut}
        />
        <hr className=" my-5 bg-[#dddddd] h-[1.4px]" />
        <OverviewCard
          num={3}
          head={"Complete and publish"}
          desc={
            "Opt for experienced guests, set nightly rates. Answer questions and publish your listing when satisfied on ApnaPG."
          }
          img={publish}
        />
      </div>
    </section>
  );
};

export default StepsOfHosting;
