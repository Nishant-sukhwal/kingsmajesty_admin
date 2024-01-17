import React, { useState, useEffect } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { withTranslation } from "react-i18next";
import avatar2 from '../../../assets/images/users/avatar-2.jpg';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../../store/actions';



const ProfileMenu = ({ t,  }) => {
  const navigate = useNavigate();
  const [menu, setMenu] = useState(false);
  const dispatch = useDispatch();

  const user = useSelector((state) => state.Login.user);



  const handleLogout = () => {
    try {
      dispatch(logoutUser())
      navigate('/login')
    } catch (error) {
      console.log("Logout failed!")
    }
  }

  useEffect(() => {
    // const authUser = localStorage.getItem("authUser");
    // if (authUser) {
    //   const { email } = JSON.parse(authUser);
    //   const uNm = email.split("@")[0];
    //   setUsername(uNm.charAt(0).toUpperCase() + uNm.slice(1));
    // }
  }, []);

  const toggle = () => {
    setMenu(prevMenu => !prevMenu);
  };

  return (
    <React.Fragment>
      <Dropdown isOpen={menu} toggle={toggle} className="d-inline-block user-dropdown">
        <DropdownToggle tag="button" className="btn header-item waves-effect" id="page-header-user-dropdown">
          <img className="rounded-circle header-profile-user me-1" src={avatar2} alt="Header Avatar" />
          <span className="d-none d-xl-inline-block ms-1 text-transform">{user.firstname}</span>
          <i className="mdi mdi-chevron-down d-none ms-1 d-xl-inline-block"></i>
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-end">
          <DropdownItem href="#"><i className="ri-user-line align-middle me-1"></i> {t('Profile')}</DropdownItem>
          <DropdownItem href="#"><i className="ri-wallet-2-line align-middle me-1"></i> {t('My Wallet')}</DropdownItem>
          <DropdownItem className="d-block" href="#"><span className="badge badge-success float-end mt-1">11</span><i className="ri-settings-2-line align-middle me-1"></i> {t('Settings')}</DropdownItem>
          <DropdownItem href="#"><i className="ri-lock-unlock-line align-middle me-1"></i> {t('Lock screen')}</DropdownItem>
          <DropdownItem divider />
          <DropdownItem className="text-danger" onClick={handleLogout} ><i className="ri-shut-down-line align-middle me-1 text-danger"></i> {t('Logout')}</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return { token: state.Login.tokens.token };

};


export default connect(mapStateToProps)(withTranslation()(ProfileMenu));
