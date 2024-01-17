import { SET_SIDEBAR_MENUS, GET_SIDEBAR_MENUS } from './actionTypes';

export const getSidebarMenus = () => {
  return {
    type: GET_SIDEBAR_MENUS,
  };
};

export const setSidebarMenus = (sidebarMenus) => {
  return {
    type: SET_SIDEBAR_MENUS,
    payload: sidebarMenus,
  };
};


