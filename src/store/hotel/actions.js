import {  GET_HOTEL_ID } from "./actionTypes";

export const getHotelId = (id) => {    
    return ({
	    type: GET_HOTEL_ID,
        payload: id,
    })
};

