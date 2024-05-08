import api, { API } from "../../backend";

export const getRoomDetails = (id) => async (dispatch) => {
  try {
    const roomId = { roomId: id };

    const res = await api.post(`/room/get-room-details`, roomId, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.data?.success) {
      dispatch({
        type: "CURRENT_NEW_ROOM",
        payload: res.data?.roomDetails,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getOneRoomListingDetails = (id) => async (dispatch) => {
  try {
    let listingId = { id: id };

    const res = await api.post(`${API}room/room-details`, listingId);

    // console.log(res.data);

    if (res.data?.success) {
      dispatch({
        type: "GET_LISTING_DETAILS",
        payload: res.data,
      });

      // console.log("The listing details are: ", res.data);
    }
  } catch (error) {
    console.log(error);
  }
};

export const createNewRoom =
  (
    structure,
    privacyType,
    location,
    floorPlan,
    amenitiesData,
    roomPhotos,
    roomTitle,
    roomDescription,
    roomHighlights,
    guestType,
    priceBeforeTaxes,
    authorEarnedPrice,
    basePrice,
    security
  ) =>
  async (dispatch) => {
    let newRoomData = {
      roomType: structure,
      privacyType: privacyType,
      location: location,
      floorPlan: floorPlan,
      amenities: amenitiesData,
      photos: roomPhotos,
      title: roomTitle,
      description: roomDescription,
      highlights: roomHighlights,
      guestType: guestType,
      priceBeforeTaxes: priceBeforeTaxes,
      authorEarnedPrice: authorEarnedPrice,
      basePrice: basePrice,
      security: security,
    };

    dispatch({
      type: "CREATE_NEW_ROOM",
      payload: newRoomData,
    });
  };

export const saveStructure = (roomStructure) => async (dispatch) => {
  try {
    const res = await api.post(`/room/save-structure`, roomStructure, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.data?.success) {
      dispatch({
        type: "CURRENT_NEW_ROOM",
        payload: res.data?.roomDetails,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const savePrivacyType = (privacyType) => async (dispatch) => {
  try {
    const res = await api.post(`/room/save-privacy-type`, privacyType, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.data?.success) {
      dispatch({
        type: "CURRENT_NEW_ROOM",
        payload: res.data?.roomDetails,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const saveRoomLocation = (locationData) => async (dispatch) => {
  try {
    const res = await api.post(`/room/save-room-location`, locationData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.data?.success) {
      dispatch({
        type: "CURRENT_NEW_ROOM",
        payload: res.data?.roomDetails,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const saveFloorPlan = (floorPlanData) => async (dispatch) => {
  try {
    const res = await api.post(`/room/save-floor-plan`, floorPlanData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.data?.success) {
      dispatch({
        type: "CURRENT_NEW_ROOM",
        payload: res.data?.roomDetails,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const saveAmenities = (amenitiesData) => async (dispatch) => {
  try {
    const res = await api.post(`/room/save-amenities`, amenitiesData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.data?.success) {
      dispatch({
        type: "CURRENT_NEW_ROOM",
        payload: res.data?.roomDetails,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const savePhotos = (photosData) => async (dispatch) => {
  try {
    const res = await api.post(`/room/save-photos`, photosData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.data?.success) {
      dispatch({
        type: "CURRENT_NEW_ROOM",
        payload: res.data?.roomDetails,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const saveTitle = (titleData) => async (dispatch) => {
  try {
    const res = await api.post(`/room/save-title`, titleData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.data?.success) {
      dispatch({
        type: "CURRENT_NEW_ROOM",
        payload: res.data?.roomDetails,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const saveDescription = (descriptionData) => async (dispatch) => {
  try {
    const res = await api.post(`/room/save-description`, descriptionData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.data?.success) {
      dispatch({
        type: "CURRENT_NEW_ROOM",
        payload: res.data?.roomDetails,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const saveHighlight = (highlightData) => async (dispatch) => {
  console.log("The highlight data from roomActions : ", highlightData);
  try {
    const res = await api.post(`/room/save-highlight`, highlightData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.data?.success) {
      dispatch({
        type: "CURRENT_NEW_ROOM",
        payload: res.data?.roomDetails,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const saveGuestType = (guestTypeData) => async (dispatch) => {
  try {
    const res = await api.post(`/room/save-guest-type`, guestTypeData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.data?.success) {
      dispatch({
        type: "CURRENT_NEW_ROOM",
        payload: res.data?.roomDetails,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const savePrices = (priceData) => async (dispatch) => {
  try {
    const res = await api.post(`/room/save-prices`, priceData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.data?.success) {
      dispatch({
        type: "CURRENT_NEW_ROOM",
        payload: res.data?.roomDetails,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const saveSecurity = (securityData) => async (dispatch) => {
  try {
    const res = await api.post(`/room/save-security`, securityData, {
      headers: { "Content-Type": "application/json" },
    });
    if (res.data?.success) {
      dispatch({
        type: "CURRENT_NEW_ROOM",
        payload: res.data?.roomDetails,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const publishRoom = (publishRoomData) => async (dispatch) => {
  try {
    const res = await api.post(`/room/publish-room`, publishRoomData, {
      headers: { "Content-Type": "application/json" },
    });

    if (res.data?.success) {
      dispatch({
        type: "CURRENT_NEW_ROOM",
        payload: res.data?.roomDetails,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
