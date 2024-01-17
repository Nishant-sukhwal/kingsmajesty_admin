import { CHECK_LOGIN, LOGIN_USER_SUCCESSFUL, API_ERROR,LOGOUT_USER, LOGOUT_USER_SUCCESS, LOGIN_USER } from './actionTypes';

export const checkLogin = () => {  
    return {
        type: CHECK_LOGIN        
    }
}

export const loginUser = (user) => {
    return {
        type: LOGIN_USER,
        payload: user
    }
   
}

export const loginUserSuccessful = (user) => {
    return {
        type: LOGIN_USER_SUCCESSFUL,
        payload: user
    }
   
}

export const apiError = (error) => {

    return {
        type: API_ERROR,
        payload: error
    }
}

export const logoutUser = () => {
    
    return {
        type: LOGOUT_USER
    }
}

export const logoutUserSuccess = () => {
    return {
        type: LOGOUT_USER_SUCCESS,        
    }
}
