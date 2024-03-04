// saga.js
import { call, put, all, takeEvery, fork } from 'redux-saga/effects';
import { FETCH_HOTEL_DROPDOWN_OPTIONS, SAVE_ROOM_DATA, } from './actionTypes';
import { addRoomApi, fetchHotelsDropdownListApi } from '../../services/api/room/roomsApi';
import { setHotelsDropdownOptions } from './actions';
import toastr from "toastr";
import "toastr/build/toastr.min.css";

function* fetchHotelDropdownOption() {
    try {
      // const token = JSON.parse(localStorage.getItem('token'));    
      const data = yield call(fetchHotelsDropdownListApi);
      if (data.success) {      
        yield put(setHotelsDropdownOptions(data));
      }
    } catch (error) {
      console.error('Error adding Room Category Data', error);
    }
  }
  
  function* saveRoom({payload: formdata}) {
    try{
      const data = yield call(addRoomApi, formdata);
      console.log(data);
      // toastr.success(data.message);
    }catch(error){
        console.log("Error is here", error);
    }
  }

export function* watchSaveRoomReq() {  
  yield takeEvery(SAVE_ROOM_DATA, saveRoom);
}

export function* watchHotelDropdownOption() {  
    yield takeEvery(FETCH_HOTEL_DROPDOWN_OPTIONS, fetchHotelDropdownOption);
  }

function* roomSaga() {
  yield all([fork(watchSaveRoomReq), fork(watchHotelDropdownOption)] );
}
export default roomSaga;
