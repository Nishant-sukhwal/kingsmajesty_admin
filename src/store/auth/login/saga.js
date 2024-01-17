import { takeEvery, fork, put, all, call } from "redux-saga/effects";

// Login Redux States
import { CHECK_LOGIN, LOGIN_USER, LOGOUT_USER } from "./actionTypes";
import { apiError, loginUserSuccessful, logoutUserSuccess } from "./actions";
// import login from "../../../services/api/authentication/authApi"
import  { login, logout } from '../../../services/api/authentication/authApi';

function* loginUser(data) {
  
  try {
    const response = yield call(login, {
      username: data.payload.username,
      password: data.payload.password,
    });
    localStorage.setItem("authUser", JSON.stringify(response));
    localStorage.setItem("token", JSON.stringify(response.tokens.token));
    yield put(loginUserSuccessful(response));
    
    
  } catch (error) {
    yield put(apiError(error));
  }
}

function* logoutUser() {  
  try { 
    const token = JSON.parse(localStorage.getItem('token'));  
    const response = yield call(logout, token)    
    localStorage.removeItem("authUser");
    localStorage.removeItem("token"); 
    yield put(logoutUserSuccess());  
  } catch (error) {
    yield put(apiError(error));
  }
}

function* checkLogin() {  
  try {
    const response = JSON.parse(localStorage.getItem("authUser"));
    yield put(loginUserSuccessful(response));    
  } catch (error) {
    yield put(apiError(error));
  }
}

export function* watchUserLogin() {
  yield takeEvery(LOGIN_USER, loginUser);
}

export function* watchUserLogout() {  
  yield takeEvery(LOGOUT_USER, logoutUser);
}

export function* watchCheckLogin() {  
  yield takeEvery(CHECK_LOGIN, checkLogin);
}

function* loginSaga() {
  yield all([fork(watchUserLogin), fork(watchUserLogout), fork(watchCheckLogin)]);
}

export default loginSaga;
