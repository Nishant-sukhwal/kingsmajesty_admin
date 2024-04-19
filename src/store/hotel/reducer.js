import { GET_HOTEL_BY_ID, GET_HOTEL_ID } from "./actionTypes";

const INIT_STATE = {
	id: "",
	data: ""
};

const Hotel = (state = INIT_STATE, action) => {
	switch (action.type) {
		case GET_HOTEL_ID:
			return {
				...state,
				id: action.payload
			};		
			case GET_HOTEL_BY_ID:
				return {
					...state,
					data: action.payload
				};		
		default:
			return state;
	}
};

export default Hotel;