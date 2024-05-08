import { useEffect, useState } from "react";
import ReservationsData from "../../Components/Dashboard/Reservations/ReservationsData";
import ReservationsList from "../../Components/Dashboard/Reservations/ReservationsList";
import backIcon from "../../assets/BasicIcon/backIcon.png";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Reservations = () => {
  const [activePage, setActivePage] = useState(1);

  const active = JSON.parse(sessionStorage.getItem("reservationsPage"));

  console.log("The active page is ", active);

  const navigate = useNavigate();

  const reservationsData = useSelector(
    (state) => state.reservations.newReservationsData
  );

  console.log("The reservations data is ", reservationsData);

  useEffect(() => {
    const activePageNumber = JSON.parse(sessionStorage.getItem("reservations"));
    if (activePageNumber !== activePage) {
      setActivePage(activePageNumber);
    }
  }, [activePage]);

  return (
    <section className=" max-w-[1200px] mx-auto px-4 sm:px-8 md:px-10 xl:px-20 py-8 md:py-12">
      <div
        onClick={() => {
          navigate(-1);
        }}
        className="cursor-pointer hover:rounded-full  hover:bg-[#f1f1f1] inline-block p-2 -ml-2"
      >
        <img src={backIcon} alt="back" className="w-4 mix-blend-darken" />
      </div>

      <>
        <ReservationsList active={active} setActivePage={setActivePage} />
      </>
      <>
        <ReservationsData active={active} />
      </>
    </section>
  );
};

export default Reservations;
