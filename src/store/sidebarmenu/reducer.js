import {
    SET_SIDEBAR_MENUS,
    GET_SIDEBAR_MENUS
} from "./actionTypes";

const initialState = {
    sidebarMenus: [],
};

const sidebarMenu = (state = initialState, action) => {
    switch (action.type) {
        case SET_SIDEBAR_MENUS:
            state = {
                ...state,
                sidebarMenus: action.payload,
            };
            break;
        case GET_SIDEBAR_MENUS:
            break;
        default:
            state = { ...state };
            break;
    }
    return state;
};
export default sidebarMenu;
