import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAuthorReservations } from "../../../redux/actions/reservationsActions";
import { removeDuplicates } from "../../../hooks/useRemoveDuplicates";
import UpcomingReservations from "./UpcomingReservations";
import CompletedReservations from "./CompletedReservations";
import CancelledReservations from "./CancelledReservations";
import AllReservations from "./AllReservations";

const ReservationsData = ({ active }) => {
  const authorReservations = useSelector(
    (state) => state.reservations.authorReservations
  );

  console.log("The author reservations are ", authorReservations);
  const [reservations, setReservations] = useState([]);
  const [upcomingReservations, setUpcomingReservations] = useState([]);
  const [completedReservations, setCompletedReservations] = useState([]);
  const dispatch = useDispatch();

  // getting authors reservation
  useEffect(() => {
    dispatch(getAuthorReservations());
  }, [dispatch]);

  // removing duplicates
  useEffect(() => {
    // setReservations(
    //   removeDuplicates(authorReservations, "checkIn", "checkOut")
    // );

    setReservations(authorReservations);
  }, [authorReservations]);

  // setting upcoming and completed reservations
  useEffect(() => {
    const currentDate = new Date().toISOString();

    const upcoming = reservations.filter((reservation) => {
      return reservation.checkIn > currentDate;
    });
    const completed = reservations.filter((reservation) => {
      return reservation.checkOut < currentDate;
    });

    setUpcomingReservations(upcoming);
    setCompletedReservations(completed);
  }, [reservations]);

  console.log("The upcoming reservations are ", upcomingReservations);
  console.log("The completed reservations are ", completedReservations);

  return (
    <section className="py-10 flex justify-center items-center overflow-x-auto pl-10 sm:pl-44 lg:pl-0">
      <div className=" font-semibold">
        {active === 1 ? (
          <UpcomingReservations data={upcomingReservations} />
        ) : active === 2 ? (
          <CompletedReservations data={completedReservations} />
        ) : active === 3 ? (
          <CancelledReservations />
        ) : (
          <AllReservations />
        )}
      </div>
    </section>
  );
};

export default ReservationsData;
