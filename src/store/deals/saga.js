import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { addDealsApi, getDealsApi } from "../../services/api/deals/dealsApi";
import { setDeals } from "./actions";
import { GET_DEALS, SAVE_DEALS } from "./actionTypes";

function* saveDeals({ payload: formData }) {
  try {
     yield call(addDealsApi, formData);
  } catch (error) {
    console.error("Error adding deals", error);
  }
}

function* getDeals() {
    
  try {
    const data = yield call(getDealsApi);
    if (data.data.success) {
      yield put(setDeals(data.data.deals));
    }
  } catch (error) {
    console.error("Error in Fetching Deals from DB", error);
  }
}

export function* watchSaveDealsAction() {
  yield takeEvery(SAVE_DEALS, saveDeals);
}

export function* watchGetDealsAction() {
  yield takeEvery(GET_DEALS, getDeals);
}

function* dealsSaga() {
  yield all([fork(watchSaveDealsAction), fork(watchGetDealsAction)]);
}

export default dealsSaga;
