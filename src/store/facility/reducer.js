import { FACILITY_LIST, SET_FACILITY_LIST } from "./actionTypes";

const INIT_STATE = {
	facilities: []
};

const Facility = (state = INIT_STATE, action) => {
	switch (action.type) {
		case SET_FACILITY_LIST:
			return {
				...state,
				facilities: action.payload
			};		
		case FACILITY_LIST:
			return {
				...state,
				facilities: action.payload
			};
		default:
			return state;
	}
};

export default Facility;