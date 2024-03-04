//import  action types

import { GET_DEALS, SAVE_DEALS, SET_DEALS } from "./actionTypes";

//initial values object
const INIT_STATE = {
  deals: [],
};

// reducer component

const Deals = (state = INIT_STATE, actions) => {
  switch (actions.type) {
    case SAVE_DEALS:
        return state;
    case GET_DEALS:
      return {
        ...state,
        deals: actions.payload,
      };
    case SET_DEALS:
      return {
        ...state,
        deals: actions.payload,
      };
    default:
      return state;
  }
};

export default Deals;
