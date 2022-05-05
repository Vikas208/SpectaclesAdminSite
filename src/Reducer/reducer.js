import { action } from "./action";

const reducer = (state, actionParam) => {
  // console.log(state);
  // console.log(actionParam);
  switch (actionParam.type) {
    case action.LOGINUSER:
      return {
        ...state,
        user: actionParam.user,
      };
    case action.SETTOKEN:
      return {
        ...state,
        token: actionParam.token,
      };
    case action.SHOPDETAILS:
      return {
        ...state,
        shopDetails: actionParam.shopDetails,
      };
    case action.SETDATA:
      return {
        ...state,
        data: actionParam.data,
      };
    case action.RELOADDETAILS:
      return {
        ...state,
        reloadDetails: actionParam.reloadDetails,
      };
    default:
      return {
        ...state,
      };
  }
};
export default reducer;
