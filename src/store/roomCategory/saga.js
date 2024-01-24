// saga.js
import { call, put, all, takeEvery, fork } from 'redux-saga/effects';
import { GET_CATEGORIES_LIST, SAVE_ROOMCATEGORY_DATA_REQUEST  } from './actionTypes';

import { setRooomCategoryResponse, setSidebarMenus } from './actions';
import { getRoomCategoryApi, saveRoomCategoryApi } from '../../services/api/roomCategory/roomCategoryApi';

function* addRooomCategoryData({payload: formData}) {
  try {
    // const token = JSON.parse(localStorage.getItem('token'));    
    const data = yield call(saveRoomCategoryApi, formData);    
    if (data.success) {      
    //   yield put(setRooomCategoryResponse(data));
    }
  } catch (error) {
    console.error('Error adding Room Category Data', error);
  }
}

function* getRooomCategory() {
    try {
      // const token = JSON.parse(localStorage.getItem('token'));    
      const data = yield call(getRoomCategoryApi);   
      console.log(data.data.category)
      if (data.data.success) {      
        yield put(setRooomCategoryResponse(data.data.category));
      }
    } catch (error) {
      console.error('Error adding Room Category Data', error);
    }
  }
  

export function* watchSaveRoomCategoryReq() {  
  yield takeEvery(SAVE_ROOMCATEGORY_DATA_REQUEST, addRooomCategoryData);
}

export function* watchViewCategory() {  
    yield takeEvery(GET_CATEGORIES_LIST, getRooomCategory);
  }

function* roomCategorySaga() {
  yield all([fork(watchSaveRoomCategoryReq), fork(watchViewCategory)] );
}
export default roomCategorySaga;
