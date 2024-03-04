import {
  SAVE_ROOMCATEGORY_DATA_REQUEST,
  GET_CATEGORIES_LIST,
  SET_CATEGORIES,
} from "./actionTypes";

const INIT_STATE = {
  category: [],
};

const RoomCategory = (state = INIT_STATE, action) => {
  switch (action.type) {
    case SAVE_ROOMCATEGORY_DATA_REQUEST:
      return state;
    case GET_CATEGORIES_LIST:
      return {
        ...state,
        category: action.payload,
      };
    case SET_CATEGORIES:
      return {
        ...state,
        category: action.payload,
      };
    default:
      return state;
  }
};

export default RoomCategory;
