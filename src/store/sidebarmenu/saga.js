// saga.js
import { call, put, all, takeEvery, fork } from 'redux-saga/effects';
import { GET_SIDEBAR_MENUS } from './actionTypes';
import getSidebarMenus from '../../services/api/authentication/sidebarMenuApi'; // Import your API function
import { setSidebarMenus } from './actions';

function* fetchSidebarMenusSaga() {
  try {
    const token = JSON.parse(localStorage.getItem('token'));    
    const data = yield call(getSidebarMenus, token);    
    if (data.success) {      
      yield put(setSidebarMenus(data.sidebarMenus));
    }
  } catch (error) {
    console.error('Error fetching sidebar menus:', error);
  }
}

export function* watchSidebarList() {  
  yield takeEvery(GET_SIDEBAR_MENUS, fetchSidebarMenusSaga);
}

export function* watchCreateSidebar() {  
    // yield takeEvery(CREATE_FACILITY, createNewFacility);
  }

function* sidebarSaga() {
  yield all([fork(watchSidebarList), fork(watchCreateSidebar)] );
}
export default sidebarSaga;
