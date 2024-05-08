const initialState = {
  userDetails: null,
  loginResponse: Number,
  responseMessage: "",
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
      };

    case "GET_USER_DETAILS":
      return {
        userDetails: payload,
      };

    case "CHANGE_USER_ROLE":
      return {
        userDetails: payload.updatedUserDetails,
      };

    default:
      return state;
  }
};

export default userReducer;
