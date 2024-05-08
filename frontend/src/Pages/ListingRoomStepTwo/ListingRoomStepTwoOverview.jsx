import step2 from "../../assets/videos/step2.mp4";

const ListingRoomStepTwoOverview = () => {
  return (
    <section className=" h-[80vh] flex flex-col lg:flex-row justify-around gap-5 lg:gap-10 items-center w-full my-8 sm:my-12 md:my-16 lg:my-0">
      <div className="flex flex-col gap-2 md:gap-4 text-[#222222] sm:px-5 md:px-8 lg:px-10">
        <div className=" flex flex-col gap-2 font-medium min-h-[130px]">
          <p className=" text-base md:text-lg">Step 2</p>
          <h2 className=" text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
            Make your place stand out
          </h2>
        </div>
        <p className=" text-xs sm:text-sm md:text-base lg:text-lg">
          In this step, you&apos;ll add some of the amenities your place offers,
          plus 5 or more photos. Then, you&apos;ll create a title and
          description.
        </p>
      </div>
      <video
        src={step2}
        autoPlay={true}
        muted
        type="video/mp4"
        className=" max-w-xs sm:max-w-md"
      />
    </section>
  );
};

export default ListingRoomStepTwoOverview;
