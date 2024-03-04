import {  
    FETCH_HOTEL_DROPDOWN_OPTIONS, 
    SAVE_ROOM_DATA, 
    SET_HOTEL_DROPDOWN_OPTIONS,
 } from "./actionTypes";

export const fetchHotelDropdownOptions = () =>{
    return ({
     type: FETCH_HOTEL_DROPDOWN_OPTIONS,
    })
 }

 export const setHotelsDropdownOptions = (data) => {
    return ({
        type: SET_HOTEL_DROPDOWN_OPTIONS,
        payload: data,
    })
 }
 
export const saveRoom = (formdata) => {
    console.log(formdata);
    return({
        type: SAVE_ROOM_DATA,
        payload: formdata,
    })
}