import {  GET_HOTEL_ID,GET_HOTEL_BY_ID } from "./actionTypes";

export const getHotelId = (id) => {    
    return ({
	    type: GET_HOTEL_ID,
        payload: id,
    })
};

export const getHotelById = (data) => {
    return ({
       type: GET_HOTEL_BY_ID,
       payload: data
    })
};

