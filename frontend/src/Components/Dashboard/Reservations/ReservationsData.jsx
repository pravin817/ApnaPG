import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAuthorReservations } from "../../../redux/actions/reservationsActions";
import { removeDuplicates } from "../../../hooks/useRemoveDuplicates";

import ShowReservationTable from "./ShowReservationTable";

const ReservationsData = ({ active }) => {
  const authorReservations = useSelector(
    (state) => state.reservations.authorReservations
  );

  console.log("The author reservations are ", authorReservations);
  const [reservations, setReservations] = useState([]);
  const [upcomingReservations, setUpcomingReservations] = useState([]);
  const [ongoingReservations, setOngoingReservations] = useState([]);
  const [completedReservations, setCompletedReservations] = useState([]);
  const [cancelledReservations, setCancelledReservations] = useState([]);
  const dispatch = useDispatch();

  // getting authors reservation
  useEffect(() => {
    dispatch(getAuthorReservations());
  }, [dispatch]);

  useEffect(() => {
    setReservations(authorReservations);
  }, [authorReservations]);

  // setting upcoming and completed reservations
  useEffect(() => {
    const currentDate = new Date();
    console.log("The current date is ", currentDate);
    console.log("The reservations are ", reservations);

    const upcoming = reservations.filter((reservation) => {
      const checkIn = new Date(reservation.checkIn);
      return checkIn > currentDate && reservation.status !== "cancelled";
    });

    const ongoing = reservations.filter((reservation) => {
      const checkIn = new Date(reservation.checkIn);
      const checkOut = new Date(reservation.checkOut);
      return (
        checkIn < currentDate &&
        checkOut > currentDate &&
        reservation.status !== "cancelled"
      );
    });

    const completed = reservations.filter((reservation) => {
      const checkOut = new Date(reservation.checkOut);
      return checkOut < currentDate && reservation.status !== "cancelled";
    });

    const cancelled = reservations.filter((reservation) => {
      return reservation.status === "cancelled";
    });

    setUpcomingReservations(upcoming);
    setOngoingReservations(ongoing);
    setCompletedReservations(completed);
    setCancelledReservations(cancelled);
  }, [reservations]);

  console.log("The reservations are ", reservations);
  console.log("The author reservations are ", authorReservations);

  console.log("The upcoming reservations are ", upcomingReservations);
  console.log("The completed reservations are ", completedReservations);

  return (
    <section className="py-10 flex justify-center items-center overflow-x-auto pl-10 sm:pl-44 lg:pl-0">
      <div className=" font-semibold">
        {active === 1 ? (
          <ShowReservationTable data={upcomingReservations} type={"Upcoming"} />
        ) : active === 2 ? (
          <ShowReservationTable data={ongoingReservations} type={"Ongoing"} />
        ) : active === 3 ? (
          <ShowReservationTable
            data={completedReservations}
            type={"Completed"}
          />
        ) : active === 4 ? (
          <ShowReservationTable
            data={cancelledReservations}
            type={"Cancelled"}
          />
        ) : (
          <ShowReservationTable data={reservations} type={"All"} />
        )}
      </div>
    </section>
  );
};

export default ReservationsData;
