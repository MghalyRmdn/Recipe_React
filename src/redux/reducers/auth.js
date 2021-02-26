import {
  LoginString,
  RegisterString,
  LogoutString,
  pending,
  rejected,
  fulfilled,
} from "../actionString";

const initialState = {
  data: {},
  isPending: false,
  isRejected: false,
  isFulfilled: false,
  err: {},
};

const authReducer = (prevState = initialState, action) => {
  switch (action.type) {
    case LoginString + pending:
      return {
        ...prevState,
        isPending: true,
        isRejected: false,
        isFulfilled: false,
      };
    case LoginString + rejected:
      return {
        ...prevState,
        isPending: false,
        isRejected: true,
        err: action.payload.data,
      };
    case LoginString + fulfilled:
      return {
        ...prevState,
        isPending: false,
        isFulfilled: true,
        data: action.payload.data,
      };
    case RegisterString + pending:
      return {
        ...prevState,
        isPending: true,
        isRejected: false,
        isFulfilled: false,
      };
    case RegisterString + rejected:
      return {
        ...prevState,
        isPending: false,
        isRejected: true,
        err: action.payload.data,
      };
    case RegisterString + fulfilled:
      return {
        ...prevState,
        isPending: false,
        isFulfilled: true,
        data: action.payload.data,
      };
    case LogoutString + pending:
      return {
        ...prevState,
        isPending: true,
        isRejected: false,
        isFulfilled: false,
      };
    case LogoutString + rejected:
      return {
        ...prevState,
        isPending: false,
        isRejected: true,
        err: action.payload.data,
      };
    case LogoutString + fulfilled:
      return {
        ...prevState,
        isPending: false,
        isFulfilled: true,
        data: action.payload.data,
      };

    case "Logout":
      return {
        ...prevState,
        isFulfilled: false,
      };
    default:
      return {
        ...prevState,
      };
  }
};

export default authReducer;
