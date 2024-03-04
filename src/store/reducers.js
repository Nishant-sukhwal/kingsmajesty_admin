import { combineReducers } from 'redux';

// Front
import Layout from './layout/reducer';

// Authentication Module
import Account from './auth/register/reducer';
import Login from './auth/login/reducer';
import Forget from './auth/forgetpwd/reducer';

// Facility Module
import Facility from './facility/reducer'
import sidebarMenu from './sidebarmenu/reducer'
import Hotel from './hotel/reducer'
import RoomCategory from './roomCategory/reducer'
import Room  from './room/reducer'
import Deals from './deals/reducer'

const rootReducer = combineReducers({

    // public
    Layout,

    // Authentication
    Account,
    Login,
    Forget,

    // Facility
    Facility,
    
    //sidebar
    sidebarMenu,

    //Hotel
    Hotel,

    //RoomCategory
    RoomCategory,

    
    //Room
    Room,

    //Deals
    Deals,

});

export default rootReducer;