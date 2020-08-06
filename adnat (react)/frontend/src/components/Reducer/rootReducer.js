
export const initialState = {
  username: "guest",
  hourlyRate: 0,
  organizationName: '',
  org:{}
};

const rootReducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_USER": {
      const payload = action.payload;
      return {
        ...state,
        username: payload
      }
    }
    case "SET_USER_ID": {
      const payload = action.payload;
      return {
        ...state,
        userId: payload
      }
    }
    case "SET_SESSION": {
      const payload = action.payload;
      return {
        ...state, 
        sessionId: payload
      }
    }
    case "SET_ORGANIZATION_ID": {
      const payload = action.payload;
      return {
        ...state,
        organizationId: payload
      }
    }
    case "SET_ORGANIZATION" : {
      const payload = action.payload;
      return {
        ...state,
        org: payload
      }
    }
    default:
      return state;
  }
};

export default rootReducer;