const initialState = {
  newRoom: null,
  currentListingRoom: null,
  roomsData: [],
  listingDetails: {},
};

const roomReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "CREATE_NEW_ROOM":
      return {
        ...state,
        newRoom: payload,
      };
    case "SAVE_ROOM_DATA":
      return {
        ...state,
        roomsData: payload,
      };
    case "CURRENT_NEW_ROOM":
      return {
        ...state,
        currentListingRoom: payload,
      };
    case "GET_LISTING_DETAILS":
      return {
        ...state,
        listingDetails: payload,
      };
    default:
      return state;
  }
};

export default roomReducer;
