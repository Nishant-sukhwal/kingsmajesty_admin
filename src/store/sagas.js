import { all } from 'redux-saga/effects'

//public
import accountSaga from './auth/register/saga';
import loginSaga from './auth/login/saga';
import forgetSaga from './auth/forgetpwd/saga';
import LayoutSaga from './layout/saga';
import facilitySaga from './facility/saga';
import sidebarSaga from './sidebarmenu/saga'
import roomCategorySaga from './roomCategory/saga';

export default function* rootSaga() {
    yield all([

        //public
        accountSaga(),
        loginSaga(),
        forgetSaga(),
        LayoutSaga(),

        // Facility
        facilitySaga(),
        sidebarSaga(),

        roomCategorySaga(),

    ])
}