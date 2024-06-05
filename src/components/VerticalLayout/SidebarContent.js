import React, { useEffect, useMemo, useState } from "react";
import MetisMenu from "metismenujs";
import { Link } from "react-router-dom";
import { withTranslation } from 'react-i18next';
import { connect, useDispatch, useSelector } from "react-redux";
import {
  changeLayout,
  changeLayoutWidth,
  changeSidebarTheme,
  changeSidebarType,
  changePreloader,
  getSidebarMenus
} from "../../store/actions";
import withRouter from "../Common/withRouter";


const SidebarContent = ({ t, router, type, changeLayout, changeSidebarTheme, changeSidebarType, changeLayoutWidth, changePreloader, userID }) => {
  console.log("type is here",type)
  const [pathName, setPathName] = useState(router.location.pathname);
  const dispatch = useDispatch();
  // const {sidebarMenu: {sidebarMenus}, Login: {tokens}}  = useSelector((state) => state);
  // const menus = useSelector((state) => state);
  // console.log(sidebarMenus,tokens);

  const [sidebarMenus, token] = useSelector((state) => [
    state.sidebarMenu.sidebarMenus,
    state.Login.tokens.token,
  ]);
  console.log(sidebarMenus, token)
  console.log(sidebarMenus)

  useEffect(() => {
    if (token) {
      dispatch(getSidebarMenus());
    }
  }, [token]);

  useEffect(() => {
    new MetisMenu("#side-menu");
  }, [sidebarMenus]); // Initialize MetisMenu whenever sidebarMenus change

  // useEffect(() => {
  //   if (router.location.pathname !== pathName) {
  //     setPathName(router.location.pathname);
  //     window.scrollTo({ top: 0, behavior: 'smooth' });
  //   }
  // }, [router.location.pathname, pathName]);

  // useEffect(() => {
  //   initMenu();
  // }, [sidebarMenus]);

  // useEffect(() => {
  //   if (router.location.pathname !== pathName) {
  //     setPathName(router.location.pathname);
  //     initMenu();
  //     window.scrollTo({ top: 0, behavior: 'smooth' });
  //   }
  // }, [router.location.pathname]);

  // useEffect(() => {
  //   if (type === "condensed") {
  //     console.log("inside-----")
  //     initMenu();
  //   }
  // }, [type]);

  // const initMenu = () => {
  //   console.log("im inside init Menu")
  //   new MetisMenu("#side-menu");
  //   const ul = document.getElementById("side-menu");
  //   const items = ul.getElementsByTagName("a");
  //   let matchingMenuItem = null;
  //   for (let i = 0; i < items.length; ++i) {
  //     if (pathName === items[i].pathname) {
  //       matchingMenuItem = items[i];
  //       break;
  //     }
  //   }
  //   if (matchingMenuItem) {
  //     console.log("matchingMenuItem",matchingMenuItem)
  //     activateParentDropdown(matchingMenuItem);
  //   }
  // };

  // const activateParentDropdown = (item) => {
  //   item.classList.add("active");
  //   const parent = item.parentElement;
  //   console.log("parent", parent)
  //   if (parent) {
  //     parent.classList.add("mm-active");
  //     const parent2 = parent.parentElement;
  //     console.log("parent2", parent2)
  //     if (parent2) {
  //       parent2.classList.add("mm-show");
        
  //       const parent3 = parent2.parentElement;
  //       console.log("parent3", parent3)
  //       if (parent3) {
  //         parent3.classList.add("mm-active");
  //         parent3.childNodes[0].classList.add("mm-active");
  //         const parent4 = parent3.parentElement;
  //         if (parent4) {
  //           parent4.classList.add("mm-active");
  //         }
  //       }
  //     }
  //     return false;
  //   }
  //   return false;
  // };


  return (
    <div id="sidebar-menu">
      <div>
        <ul className="metismenu list-unstyled" id="side-menu">
          <li className="menu-title">{t`Menu`}</li>
          {sidebarMenus && sidebarMenus
            .filter(menuCategoryItem => menuCategoryItem.menuCategory === "Menu")
            .sort((a, b) => a.priority - b.priority) // Sort by priority
            .map((menuCategoryItem, index) => (
              <React.Fragment key={index}>
                {menuCategoryItem.type === "mainMenu" && (
                  <li>
                    {menuCategoryItem.subMenu && menuCategoryItem.subMenu.length > 0 ? (
                      <Link to={`/${menuCategoryItem.route}`} className="has-arrow waves-effect">
                        <i className={`ri-${menuCategoryItem.icon}-fill`}></i>
                        <span className="ms-1">{t(menuCategoryItem.menu)}</span>
                      </Link>
                    ) : (
                      <Link to={`/${menuCategoryItem.route}`} className="waves-effect">
                        <i className={`ri-${menuCategoryItem.icon}-fill`}></i>
                        <span className="ms-1">{t(menuCategoryItem.menu)}</span>
                        {/* <span className={`ms-1 ${type === 'condensed' ? 'hide' : ''}`}>{t(menuCategoryItem.menu)}</span> */}
                      </Link>
                    )}

                    {menuCategoryItem.subMenu && menuCategoryItem.subMenu.length > 0 && (
                      <ul className="sub-menu">
                        {menuCategoryItem.subMenu.map((subMenuItem, subIndex) => (
                          <li key={subIndex}>
                            <Link to={`/${subMenuItem.route}`}>{t(subMenuItem.menu)}</Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                )}
              </React.Fragment>
            ))}

          <li className="menu-title">{t`Settings`}</li>
          {sidebarMenus && sidebarMenus
            .filter(menuCategoryItem => menuCategoryItem.menuCategory === "Settings")
            .sort((a, b) => a.priority - b.priority) // Sort by priority
            .map((menuCategoryItem, index) => (
              <React.Fragment key={index}>
                {menuCategoryItem.type === "mainMenu" && (
                  <li>
                    {menuCategoryItem.subMenu && menuCategoryItem.subMenu.length > 0 ? (
                      <Link to={`/${menuCategoryItem.route}`} className="has-arrow waves-effect">
                        <i className={`ri-${menuCategoryItem.icon}-fill`}></i>
                        <span className="ms-1" >{t(menuCategoryItem.menu)}</span>
                      </Link>
                    ) : (
                      <Link to={`/${menuCategoryItem.route}`} className="waves-effect">
                        <i className={`ri-${menuCategoryItem.icon}-fill`}></i>
                        <span className="ms-1" >{t(menuCategoryItem.menu)}</span>
                      </Link>
                    )}

                    {menuCategoryItem.subMenu && menuCategoryItem.subMenu.length > 0 && (
                      <ul className="sub-menu">
                        {menuCategoryItem.subMenu.map((subMenuItem, subIndex) => (
                          <li key={subIndex}>
                            <Link to={`/${subMenuItem.route}`}>{t(subMenuItem.menu)}</Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                )}

              </React.Fragment>
            ))}

        </ul>
      </div>

      {/* <div>
        <ul className="metismenu list-unstyled" id="side-menu">
          <li className="menu-title">{t`Settings`}</li>
          {sidebarMenus && sidebarMenus
            .filter(menuCategoryItem => menuCategoryItem.menuCategory === "Settings")
            .sort((a, b) => a.priority - b.priority) // Sort by priority
            .map((menuCategoryItem, index) => (
              <React.Fragment key={index}>
                {menuCategoryItem.type === "mainMenu" && (
                  <li>
                    {menuCategoryItem.subMenu && menuCategoryItem.subMenu.length > 0 ? (
                      <Link to={`/${menuCategoryItem.route}`} className="has-arrow waves-effect">
                        <i className={`ri-${menuCategoryItem.icon}-fill`}></i>
                        <span className="ms-1">{t(menuCategoryItem.menu)}</span>
                      </Link>
                    ) : (
                      <Link to={`/${menuCategoryItem.route}`} className="waves-effect">
                        <i className={`ri-${menuCategoryItem.icon}-fill`}></i>
                        <span className="ms-1">{t(menuCategoryItem.menu)}</span>
                      </Link>
                    )}

                    {menuCategoryItem.subMenu && menuCategoryItem.subMenu.length > 0 && (
                      <ul className="sub-menu">
                        {menuCategoryItem.subMenu.map((subMenuItem, subIndex) => (
                          <li key={subIndex}>
                            <Link to={`/${subMenuItem.route}`}>{t(subMenuItem.menu)}</Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                )}
              </React.Fragment>
            ))}
        </ul>
      </div> */}
    </div>
  );
};


const mapStateToProps = (state) => {
  return { ...state.Layout, userID: state.Login.userID };
};


export default withRouter(connect(mapStateToProps, {
  changeLayout,
  changeSidebarTheme,
  changeSidebarType,
  changeLayoutWidth,
  changePreloader
})(withTranslation()(SidebarContent)));
