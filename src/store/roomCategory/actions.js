import {  SAVE_ROOMCATEGORY_DATA_REQUEST, GET_CATEGORIES_LIST,SET_CATEGORIES } from "./actionTypes";

export const saveRoomCategoryReq = (formData) =>{
   return ({
    type: SAVE_ROOMCATEGORY_DATA_REQUEST,
    payload: formData,
   })
}

export const getCategories = () => {
    return({
        type: GET_CATEGORIES_LIST,
    })
}

export const setRooomCategoryResponse = (data) => {
    return({
        type: SET_CATEGORIES,
        payload: data
        
    })
}


