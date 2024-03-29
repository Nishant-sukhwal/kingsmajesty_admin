import React from "react";
import { Navigate } from "react-router-dom";

// Authentication related pages
import Login from "../pages/Authentication/Login";
import Logout from "../pages/Authentication/Logout";
import Register from "../pages/Authentication/Register";
import ForgetPwd from "../pages/Authentication/ForgetPassword";
import AuthLockScreen from "../pages/Authentication/AuthLockScreen";
import Dashboard from "../pages/Dashboard";


// Forms
import FormElements from "../pages/Forms/FormElements";
import FormAdvanced from "../pages/Forms/FormAdvanced";
import FormEditors from "../pages/Forms/FormEditors";
import FormValidations from "../pages/Forms/FormValidations";
import FormMask from "../pages/Forms/FormMask";
import FormUpload from "../pages/Forms/FormUpload";
import FormWizard from "../pages/Forms/FormWizard";
import FormXeditable from "../pages/Forms/FormXeditable";

// import HotelCreateForm from "../pages/Hotel/CreateHotelForm";
import CreateFacility from "../pages/Facilities/CreateFacility";
import ViewFacility from "../pages/Facilities/ViewFacility";
import UpdateFacility from "../pages/Facilities/UpdateFacility";
import CreateNewHotel from "../pages/Hotel/NewHotelCreate";
// import EcommerceOrders from "../pages/Ecommerce/EcommerceAddProduct"
// import EcommerceProductDetail from "../pages/Ecommerce/EcommerceProducts/EcommerceProductDetail";
import EcommerceOrderss from "../pages/Ecommerce/EcommerceOrders";
import EcommerceOrders from "../pages/Ecommerce/EcommerceCustomers";
import HotelCreateForm from "../pages/Deals/CreateHotelForm";
import ViewDeals from "../pages/Deals/ViewDeals";
import CreateDeals from "../pages/Deals/CreateDeals";
import ViewHotels from "../pages/Hotels/ViewHotel";
import ViewRooms from "../pages/Room/ViewRooms";
import CommingSoon from "../pages/Utils/CommingSoon";
import Maintenance from "../pages/Utils/Maintenance";
import CreateHotel from "../pages/Hotels/CreateHotelForm";
import CreateRoomForm from "../pages/Room/CreateRoomForm";
import ViewRoomCategory from "../pages/RoomCategory/ViewRoomCategory";
import CreateRoomCategoryForm from "../pages/RoomCategory/CreateRoomCategoryForm";
import CreateRoom from "../pages/Room/CreateRoom";
import ViewPayment from "../pages/PaymentMethod/ViewPaymentMethods";
import CreatePaytmentMethodForm from "../pages/PaymentMethod/CreatePaytmentMethodForm";
import ViewHotelCategories from "../pages/HotelCategory/ViewHotelCategories";
import CreateHotelCategoryForm from "../pages/HotelCategory/CreateHotelCategoryForm";
import UpdateHotelCategoryForm from "../pages/HotelCategory/UpdateHotelCategoryForm";



const authProtectedRoutes = [
	{ path: "/dashboard", component: <Dashboard /> },
	{ path: "/", exact: true, component: <Navigate to="/login" /> },

	//Hotel 
	{ path: "/hotels", exact: true, component: <ViewHotels /> },
	{ path: "/hotels/create", exact: true, component: <CreateHotel /> },

	//Paymentmethods
	{ path: "/paymentmethods", exact: true, component: <ViewPayment /> },
	{ path: "/paymentmethods/create", exact: true, component: <CreatePaytmentMethodForm /> },

	//Hotel Categories
	{ path: "/hotelcategories", exact: true, component: <ViewHotelCategories /> },
	{ path: "/hotelcategories/create", exact: true, component: <CreateHotelCategoryForm /> },
	{ path: "/hotelcategories/update", exact: true, component: <UpdateHotelCategoryForm /> },

	//Facilities
	{ path: "/facilities", exact: true, component: <ViewFacility /> },
	{ path: "/facility/update", exact: true, component: <UpdateFacility /> },
	{ path: "/facility/create", exact: true, component: <CreateFacility /> },

	//Rooms	
	{ path: "/rooms", exact: true, component: <ViewRooms /> },
	// { path: "/facility/update", exact: true, component: <UpdateDeals /> },
	{ path: "/room/create", exact: true, component: <CreateRoom /> },
	{ path: "/room/creates", exact: true, component: <CreateRoomForm /> },

	//Deals	
	{ path: "/deals", exact: true, component: <ViewDeals /> },
	{ path: "/deals/create", exact: true, component: <CreateDeals /> },

	//Rooms	Category
	{ path: "/roomcategory", exact: true, component: <ViewRoomCategory /> },
	{ path: "/roomcategory/create", exact: true, component: <CreateRoomCategoryForm /> },






	//Packages	
	{ path: "/packages", exact: true, component: <Maintenance /> },
	{ path: "/activity", exact: true, component: <Maintenance /> },
	{ path: "/booking", exact: true, component: <Maintenance /> },
	{ path: "/services", exact: true, component: <Maintenance /> },



	// Forms
	{ path: "/form-elements", component: <FormElements /> },
	{ path: "/form-advanced", component: <FormAdvanced /> },
	{ path: "/form-editors", component: <FormEditors /> },
	{ path: "/form-mask", component: <FormMask /> },
	{ path: "/form-file-upload", component: <FormUpload /> },
	{ path: "/form-wizard", component: <FormWizard /> },
	{ path: "/form-validation", component: <FormValidations /> },
	{ path: "/form-xeditable", component: <FormXeditable /> },

];

const publicRoutes = [
	{ path: "/logout", component: <Logout /> },
	{ path: "/login", component: <Login /> },
	{ path: "/forgot-password", component: <ForgetPwd /> },
	{ path: "/register", component: <Register /> },
	{ path: "/lock-screen", component: <AuthLockScreen /> },
];

export { authProtectedRoutes, publicRoutes };
