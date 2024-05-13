import api from "../../backend";

export const newReservation = (data) => async (dispatch) => {
  console.log(
    "The new reservation data called from the newReservation actions : ",
    data
  );

  const reservationData = {
    listingId: data?.listingData?._id,
    authorId: data?.listingData?.author,
    checkIn: data?.formattedStartDate,
    checkOut: data?.formattedEndDate,
    nightStaying: data?.nightsStaying,
    guestNumber: data?.totalGuest,
    basePrice: data?.reservationBasePrice,
    taxes: data?.tax,
    authorEarnedPrice: data?.authorEarned,
  };

  dispatch({
    type: "NEW_RESERVATIONS_DATA",
    payload: reservationData,
  });
};

export const getAuthorReservations = () => async (dispatch) => {
  try {
    const response = await api.post("/reservations/get-author-reservations");

    if (response?.data?.success) {
      dispatch({
        type: "AUTHORS_RESERVATIONS",
        payload: response?.data?.data,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
