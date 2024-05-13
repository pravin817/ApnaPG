import revenueIcon from "../../assets/BasicIcon/dollar.png";
import bookingIcon from "../../assets/BasicIcon/booking.png";
import houseIcon from "../../assets/BasicIcon/wallet.png";
import categoriesIcon from "../../assets/BasicIcon/travel.png";
import Cards from "./Cards";

const DashboardCards = ({ reservations, totalPrice }) => {
  // Calculate the total booking
  const currentDate = new Date(); // get the current Date and Time

  // console.log("The current date is ", currentDate);

  // Find the active booking reservations
  const activeBookingReservations = reservations?.filter((reservation) => {
    const checkOutDate = new Date(reservation.checkOut);
    return checkOutDate > currentDate;
  });

  console.log("The active booking reservations ", activeBookingReservations);

  const activeBooking = activeBookingReservations?.length;

  // find the author hosted house
  const hostedHouse = reservations?.length;

  // Calculate the monthly price
  const calculateMonthlyEarnings = (obj, currentDate) => {
    const checkInDate = new Date(obj.checkIn);
    const checkOutDate = new Date(obj.checkOut);

    // Check if both checkIn and checkOut dates are within the current month
    if (
      checkInDate.getFullYear() === currentDate.getFullYear() &&
      checkInDate.getMonth() === currentDate.getMonth() &&
      checkOutDate.getFullYear() === currentDate.getFullYear() &&
      checkOutDate.getMonth() === currentDate.getMonth()
    ) {
      // Calculate the number of days between the checkIn and checkOut dates
      const numberOfDays = Math.ceil(
        (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24)
      );

      // Calculate the total price for the object for the current month
      const totalPrice = numberOfDays + obj.authorEarnedPrice;

      return totalPrice;
    }
    return 0; // Return 0 for objects outside the current month
  };

  const currentDates = new Date(); // Get the current date

  const totalMonthlyEarnings = reservations?.reduce(
    (accumulator, currentObject) => {
      const objectMonthlyEarnings = calculateMonthlyEarnings(
        currentObject,
        currentDates
      );
      return accumulator + objectMonthlyEarnings;
    },
    0
  );
  return (
    <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mb-12">
      <Cards
        title={"Total Revenue"}
        icon={revenueIcon}
        heading={`₹ ${totalPrice}`}
        subHeading={"+12% increase"}
      />
      <Cards
        title={"Active Booking"}
        icon={bookingIcon}
        heading={`+${activeBooking}`}
        subHeading={"+20% increase"}
      />
      <Cards
        title={"Host houses"}
        icon={houseIcon}
        heading={`+${hostedHouse}`}
        subHeading={"-4% deccrease"}
      />
      <Cards
        title={"Monthly earned"}
        icon={categoriesIcon}
        heading={`+${totalMonthlyEarnings}`}
        subHeading={"-10% deccrease"}
      />
    </div>
  );
};

export default DashboardCards;
