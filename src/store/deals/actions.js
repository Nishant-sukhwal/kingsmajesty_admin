import { GET_DEALS, SAVE_DEALS, SET_DEALS } from "./actionTypes";

export const saveDeals = (formData) => {
  return ({
    type: SAVE_DEALS,
    payload: formData,
  });
};

export const getDeals = () => {
    return({
        type: GET_DEALS,
    })
};

export const setDeals = (data) => {
    return({
        type: SET_DEALS,
        payload: data
    })
};