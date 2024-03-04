import { SET_HOTEL_DROPDOWN_OPTIONS } from "./actionTypes";

const INIT_STATE = {
  hotelDropdownOptions: [],
};

const Room = (state = INIT_STATE, action) => {
  switch (action.type) {
    case SET_HOTEL_DROPDOWN_OPTIONS:
      return {
        ...state,
        hotelDropdownOptions: action.payload,
      };
    default:
      return state;
  }
};

export default Room;
