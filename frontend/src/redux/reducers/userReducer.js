const initialState = {
  userDetails: null,
  loginResponse: Number,
  responseMessage: "",
  wishlist: [],
};

const userReducer = (state = initialState, { type, payload }) => {
  console.log("User Reducer called");
  switch (type) {
    case "USER_SIGN_UP":
      return {
        ...state,
        userDetails: payload.user_details,
        loginResponse: payload.success,
        responseMessage: payload.message,
      };

    case "USER_LOG_IN":
      return {
        ...state,
        userDetails: payload.user_details,
        loginResponse: payload.success,
        responseMessage: payload.message,
      };

    case "USER_LOG_OUT":
      // Remove the accessToken and refreshToken from the local storage
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      return {
        ...state,
        userDetails: null,
        loginResponse: 0,
        responseMessage: "",
        wishlist: [],
      };

    case "GET_USER_DETAILS":
      return {
        ...state,
        userDetails: payload,
      };
    case "CHANGE_USER_ROLE":
      return {
        ...state,
        userDetails: payload.updatedUserDetails,
      };

    case "ADD_TO_WISHLIST":
      return {
        ...state,
        wishlist: [...state.wishlist, payload],
      };
    case "REMOVE_FROM_WISHLIST":
      return {
        ...state,
        wishlist: state.wishlist.filter((roomId) => roomId !== payload),
      };
    default:
      return state;
  }
};

export default userReducer;
