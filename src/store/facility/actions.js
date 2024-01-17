import { CREATE_FACILITY, FACILITY_LIST, SET_FACILITY_LIST } from "./actionTypes";

export const getFacilityList = () => {    
    return ({
	    type: FACILITY_LIST,
    })
};

export const createFacility = (formdata) => {    
    return ({
	    type: CREATE_FACILITY,
	    payload: {formdata}
    })
};

export const setFacilityList = data => {    
    return ({
	    type: SET_FACILITY_LIST,
	    payload: data
    })
};