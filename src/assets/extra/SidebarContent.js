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
  const [pathName, setPathName] = useState(router.location.pathname);  
  const dispatch = useDispatch();
  // const {sidebarMenu: {sidebarMenus}, Login: {tokens}}  = useSelector((state) => state);
  // const menus = useSelector((state) => state);
  // console.log(sidebarMenus,tokens);

  const [sidebarMenus, token] = useSelector((state) => [
    state.sidebarMenu.sidebarMenus,
    state.Login.tokens.token,
  ]);
  console.log(sidebarMenus,token)
  console.log(sidebarMenus)
  
  useEffect(() => {
    if(token){      
      dispatch(getSidebarMenus());       
    }    
  }, [token]);

  useEffect(() => {
    new MetisMenu("#side-menu");
  }, [sidebarMenus]); // Initialize MetisMenu whenever sidebarMenus change

  useEffect(() => {
    if (router.location.pathname !== pathName) {
      setPathName(router.location.pathname);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [router.location.pathname, pathName]);

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

 <div>
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
</div>
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











     {/* <div id="sidebar-menu">
        <ul className="metismenu list-unstyled" id="side-menu">

         <li className="menu-title">{t('Menu')}</li>

          {sidebarMenus && sidebarMenus.map((menu, index) => (
            <li key={index}>
              {menu.subMenus && menu.subMenus.length > 0 ? (
                <Link  to={`/${menu.route}`} className="has-arrow waves-effect">
                  {menu.menu && <i className={`ri-${menu.icon}-fill`}></i>}
                  <span className="ms-1">{t(menu.menu)}</span>
                </Link>
              ) : (
                <Link  to={`/${menu.route}`} className="waves-effect">
                  {menu.menu && <i className={`ri-${menu.icon}-fill`}></i>}
                  <span className="ms-1">{t(menu.menu)}</span>
                </Link>
              )}
              {menu.subMenus && menu.subMenus.length > 0 && (
                <ul className="sub-menu">
                  {menu.subMenus.map((subMenu, subIndex) => (
                    <li key={subIndex}>
                      <Link to={subMenu.link}>{t(subMenu.menu)}</Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))} 

        </ul>
      </div>   */}







{/*
 <div id="sidebar-menu">
  <ul className="metismenu list-unstyled" id="side-menu">
     
     <li className="menu-title">{t`Menu`}</li> 
     {sidebarMenus && sidebarMenus.map((menuCategoryItem, index) => (
      <React.Fragment key={index}>
        {/* {menuCategoryItem.menuCategory === "Menu" && (
          <li className="menu-title">{t(menuCategoryItem.menuCategory)}</li>
        )} 

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
</div>  

*/}




{/* <div id="sidebar-menu">
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





    {/* {sidebarMenus.map(menuItem => (
      <li key={menuItem._id}>
        <Link to={`/${menuItem.route}`} className="has-arrow waves-effect">
          <i className={`ri-${menuItem.icon}`}></i>
          <span className="ms-1">{t(menuItem.menu)}</span>
        </Link>
        
     
        {menuItem.type === 'mainMenu' && menuItem.subMenu && (
          <ul className="sub-menu">
            {menuItem.subMenu.map(subMenuItem => (
              <li key={subMenuItem._id}>
                <Link to={`/${subMenuItem.route}`}>{t(subMenuItem.menu)}</Link>
              </li>
            ))}
          </ul>
        )}
      </li>
    ))} */}


      {/* <div id="sidebar-menu">
        <ul className="metismenu list-unstyled" id="side-menu">
        <li className="menu-title">{t('Menu')}</li>
          {sidebarMenus && sidebarMenus.map((menu, index) => (
            <li key={index}>
              {menu.subMenus && menu.subMenus.length > 0 ? (
                <Link  to={`/${menu.route}`} className="has-arrow waves-effect">
                  {menu.menu && <i className={`ri-${menu.icon}-fill`}></i>}
                  <span className="ms-1">{t(menu.menu)}</span>
                </Link>
              ) : (
                <Link  to={`/${menu.route}`} className="waves-effect">
                  {menu.menu && <i className={`ri-${menu.icon}-fill`}></i>}
                  <span className="ms-1">{t(menu.menu)}</span>
                </Link>
              )}
              {menu.subMenus && menu.subMenus.length > 0 && (
                <ul className="sub-menu">
                  {menu.subMenus.map((subMenu, subIndex) => (
                    <li key={subIndex}>
                      <Link to={subMenu.link}>{t(subMenu.menu)}</Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))} 
        </ul>
      </div> */}



























// import React, { useEffect, useState } from "react";
// import MetisMenu from "metismenujs";
// import { Link } from "react-router-dom";
// import { withTranslation } from 'react-i18next';
// import { connect } from "react-redux";
// import {
//   changeLayout,
//   changeLayoutWidth,
//   changeSidebarTheme,
//   changeSidebarType,
//   changePreloader
// } from "../../store/actions";
// import withRouter from "../Common/withRouter";
// import getSidebarMenus from "../../services/api/authentication/sidebarMenuApi";

// const SidebarContent = ({ t, router, type, changeLayout, changeSidebarTheme, changeSidebarType, changeLayoutWidth, changePreloader, userID }) => {
//   const [pathName, setPathName] = useState(router.location.pathname);
//   const [sidebarMenus, setSidebarMenus] = useState([]);

//   const token = localStorage.getItem('token');
  
//   useEffect(() => {
//     const fetchSidebarMenus = async () => {
//       try {
//         const data = await getSidebarMenus(token);
//         // const token = localStorage.getItem('token');
//         // const data = await response.json();
//         if (data.success) {
//           console.log(data);
//           setSidebarMenus(data.sidebarMenus);
//         }
//       } catch (error) {
//         console.error("Error fetching sidebar menus:", error);
//       }
//     };
//     fetchSidebarMenus();
//   }, [token]);

//   useEffect(() => {
//     new MetisMenu("#side-menu");
//   }, [sidebarMenus]); // Initialize MetisMenu whenever sidebarMenus change

//   useEffect(() => {
//     if (router.location.pathname !== pathName) {
//       setPathName(router.location.pathname);
//       window.scrollTo({ top: 0, behavior: 'smooth' });
//     }
//   }, [router.location.pathname, pathName]);

//   return (
//     <>
//       <div id="sidebar-menu">
//         <ul className="metismenu list-unstyled" id="side-menu">

//         <li className="menu-title">{t('Menu')}</li>

//           {sidebarMenus.map((menu, index) => (
            
//             <li key={index}>
//               {menu.subMenus && menu.subMenus.length > 0 ? (
//                 <Link  to={`/${menu.route}`} className="has-arrow waves-effect">
//                   {menu.menu && <i className={`ri-${menu.icon}-fill`}></i>}
//                   <span className="ms-1">{t(menu.menu)}</span>
//                 </Link>
//               ) : (
//                 <Link  to={`/${menu.route}`} className="waves-effect">
//                   {menu.menu && <i className={`ri-${menu.icon}-fill`}></i>}
//                   <span className="ms-1">{t(menu.menu)}</span>
//                 </Link>
//               )}

//               {menu.subMenus && menu.subMenus.length > 0 && (
//                 <ul className="sub-menu">
//                   {menu.subMenus.map((subMenu, subIndex) => (
//                     <li key={subIndex}>
//                       <Link to={subMenu.link}>{t(subMenu.menu)}</Link>
//                     </li>
//                   ))}
//                 </ul>
//               )}
//             </li>
//           ))}


//             <li>
//               <Link to="/#" className="waves-effect">
//                 <i className="ri-eraser-fill"></i>
//                 <span className="badge rounded-pill bg-danger float-end">6</span>
//                 <span className="ms-1">{t('Forms')}</span>
//               </Link>
//               <ul className="sub-menu">
//                 <li><Link to="/form-elements">{t('Form Elements')}</Link></li>
//                 <li><Link to="/form-validation">{t('Form Validation')}</Link></li>
//                 <li><Link to="/form-advanced">{t('Form Advanced Plugins')}</Link></li>
//                 <li><Link to="/form-editors">{t('Form Editors')}</Link></li>
//                 <li><Link to="/form-file-upload">{t('Form File Upload')}</Link></li>
//                 <li><Link to="/form-xeditable">{t('Form X-editable')}</Link></li>
//                 <li><Link to="/form-wizard">{t('Form Wizard')}</Link></li>
//                 <li><Link to="/form-mask">{t('Form Mask')}</Link></li>
//               </ul>
//             </li>
//         </ul>
//       </div>
//     </>
//   );
// };


// const mapStateToProps = (state) => {
//   console.log(state);
//   return { ...state.Layout, userID: state.Login.userID , sidebarMenus: state.sidebarMenus};
// };


// export default withRouter(connect(mapStateToProps, {
//   changeLayout,
//   changeSidebarTheme,
//   changeSidebarType,
//   changeLayoutWidth,
//   changePreloader
// })(withTranslation()(SidebarContent)));










// //last code
// import React, { useEffect, useState, useCallback } from "react";
// import MetisMenu from "metismenujs";
// import { Link } from "react-router-dom";
// import { withTranslation } from 'react-i18next';
// import { connect } from "react-redux";
// import {
//   changeLayout,
//   changeLayoutWidth,
//   changeSidebarTheme,
//   changeSidebarType,
//   changePreloader
// } from "../../store/actions";
// import withRouter from "../Common/withRouter";

// const SidebarContent = ({ t, router, type, changeLayout, changeSidebarTheme, changeSidebarType, changeLayoutWidth, changePreloader,userID }) => {
//   const [pathName, setPathName] = useState(router.location.pathname);
//   const [sidebarMenus, setSidebarMenus] = useState([]);
  

//   const activateParentDropdown = useCallback((item) => {
//     item.classList.add("active");
//     let parent = item.parentElement;

//     while (parent) {
//       parent.classList.add("mm-active");
//       parent = parent.parentElement;
//     }
//   }, []);

//   const initMenu = useCallback(() => {
//     new MetisMenu("#side-menu");

//     const matchingMenuItem = Array.from(document.getElementById("side-menu").getElementsByTagName("a")).find(item => pathName === item.pathname);

//     if (matchingMenuItem) {
//       activateParentDropdown(matchingMenuItem);
//     }
//   }, [activateParentDropdown, pathName]);


//   useEffect(() => {
//     const fetchSidebarMenus = async () => {
//       try {
//         const response = await fetch("http://localhost:8086/v1/api/admin/auth/sidebar-menus", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json", // Specify content type as JSON
//           },
//           body: JSON.stringify({
//             userid: userID,
//           }),
//         });
//         const data = await response.json();
//         if (data.success) {
//           setSidebarMenus(data.sidebarMenus);
//         }
//       } catch (error) {
//         console.error("Error fetching sidebar menus:", error);
//       }
//     };

//     fetchSidebarMenus();
//   }, [userID]);

//   useEffect(() => {
//     initMenu();
//   }, [type, initMenu]);

//   useEffect(() => {
//     if (router.location.pathname !== pathName) {
//       setPathName(router.location.pathname);
//       initMenu();
//       window.scrollTo({ top: 0, behavior: 'smooth' });
//     }
//   }, [router.location.pathname, pathName, initMenu]);

//   return (
//     <>
      // <div id="sidebar-menu">
      //   <ul className="metismenu list-unstyled" id="side-menu">
      //     <li className="menu-title">{t('Pages')}</li>

      //     <li>
      //       <Link to="/#" className="has-arrow waves-effect">
      //         <i className="ri-account-circle-line"></i>
      //         <span className="ms-1">{t('Authentication')}</span>
      //       </Link>
            
      //       <ul className="sub-menu">
      //         <li><Link to="/login">{t('Login')}</Link></li>
      //         <li><Link to="/register">{t('Register')}</Link></li>
      //         <li><Link to="/forgot-password">{t('Recover Password')}</Link></li>
      //         <li><Link to="/lock-screen">{t('Lock Screen')}</Link></li>
      //       </ul>
      //     </li>
      //   </ul>
      // </div>
//     </>
//   );
// };

// const mapStateToProps = (state) => {
  
//   return { ...state.Layout, userID: state.Login.userID, };
// };

// export default withRouter(connect(mapStateToProps, {
//   changeLayout,
//   changeSidebarTheme,
//   changeSidebarType,
//   changeLayoutWidth,
//   changePreloader
// })(withTranslation()(SidebarContent)));















// import React, { useEffect, useState, useCallback } from "react";
// import MetisMenu from "metismenujs";
// import { Link } from "react-router-dom";
// import { withTranslation } from 'react-i18next';
// import { connect } from "react-redux";
// import {
//   changeLayout,
//   changeLayoutWidth,
//   changeSidebarTheme,
//   changeSidebarType,
//   changePreloader
// } from "../../store/actions";
// import withRouter from "../Common/withRouter";

// const SidebarContent = ({ t, router, type, changeLayout, changeSidebarTheme, changeSidebarType, changeLayoutWidth, changePreloader }) => {
//   const [pathName, setPathName] = useState(router.location.pathname);

//   const activateParentDropdown = useCallback((item) => {
//     item.classList.add("active");
//     const parent = item.parentElement;

//     if (parent) {
//       parent.classList.add("mm-active");
//       const parent2 = parent.parentElement;

//       if (parent2) {
//         parent2.classList.add("mm-show");

//         const parent3 = parent2.parentElement;

//         if (parent3) {
//           parent3.classList.add("mm-active"); // li
//           parent3.childNodes[0].classList.add("mm-active"); //a
//           const parent4 = parent3.parentElement;
//           if (parent4) {
//             parent4.classList.add("mm-active");
//           }
//         }
//       }
//       return false;
//     }
//     return false;
//   }, []);

//   const initMenu = useCallback(() => {
//     new MetisMenu("#side-menu");
//     const matchingMenuItem = Array.from(document.getElementById("side-menu").getElementsByTagName("a")).find(item => pathName === item.pathname);

//     if (matchingMenuItem) {
//       activateParentDropdown(matchingMenuItem);
//     }
//   }, [activateParentDropdown, pathName]);

//   useEffect(() => {
//     initMenu();
//   }, [type, initMenu]);

//   useEffect(() => {
//     if (router.location.pathname !== pathName) {
//       setPathName(router.location.pathname);
//       initMenu();
//       window.scrollTo({ top: 0, behavior: 'smooth' });
//     }
//   }, [router.location.pathname, pathName, initMenu]);

//   return (
//     <>
//       <div id="sidebar-menu">
//         <ul className="metismenu list-unstyled" id="side-menu">
//           <li className="menu-title">{t('Menu')}</li>

//           <li>
//             <Link to="#" className="waves-effect">
//               <i className="ri-dashboard-line"></i><span className="badge rounded-pill bg-success float-end">3</span>
//               <span className="ms-1">{t('Dashboard')}</span>
//             </Link>
//           </li>

//           <li>
//               <Link to="#" className=" waves-effect">
//                 <i className="ri-calendar-2-line"></i>
//                 <span className="ms-1">{t('Calendar')}</span>
//               </Link>
//           </li>

//           <li className="menu-title">{t('Pages')}</li>

//           <li>
//               <Link to="/#" className="has-arrow waves-effect">
//                 <i className="ri-account-circle-line"></i>
//                 <span className="ms-1">{t('Authentication')}</span>
//               </Link>
//               <ul className="sub-menu">
//                 <li><Link to="/login">{t('Login')}</Link></li>
//                 <li><Link to="/register">{t('Register')}</Link></li>
//                 <li><Link to="/forgot-password">{t('Recover Password')}</Link></li>
//                 <li><Link to="/lock-screen">{t('Lock Screen')}</Link></li>
//               </ul>
//             </li>

//         </ul>
//       </div>
//     </>
//   );
// };

// const mapStateToProps = (state) => {
//   return { ...state.Layout };
// };

// export default withRouter(connect(mapStateToProps, {
//   changeLayout,
//   changeSidebarTheme,
//   changeSidebarType,
//   changeLayoutWidth,
//   changePreloader
// })(withTranslation()(SidebarContent)));
