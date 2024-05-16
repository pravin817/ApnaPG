import setup from "../../assets/setupPic.png";
import SetupCard from "./SetupCard";
// import setupSteps from "./SetupSteps";

const RoomListingGuide = () => {
  // console.log(setupSteps);
  return (
    <section className="my-8 md:my-20 flex flex-col gap-10">
      <h1 className=" text-2xl md:text-4xl font-medium text-center ">
        Host your Room easily with ApnaPG Setup
      </h1>

      <img src={setup} alt="setUp" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <SetupCard
          heading={
            "Superhost Guided Accommodation Solutions for Students and Bachelors"
          }
          subHeading={
            "Receive tailored support from finding the right space to settling in, ensuring a smooth transition into your new living arrangement."
          }
        />
        <SetupCard
          heading={"Welcoming Experienced Guests for Your First Booking"}
          subHeading={
            "Opt for a seasoned guest for your debut booking, boasting at least three stays and a stellar ApnaPG track record."
          }
        />
        <SetupCard
          heading={"Tailored Assistance from ApnaPG for New Hosts"}
          subHeading={
            "New hosts receive streamlined access to dedicated Community Support agents, ready to assist with account queries, billing issues, and more with just one tap."
          }
        />
      </div>
    </section>
  );
};

export default RoomListingGuide;
