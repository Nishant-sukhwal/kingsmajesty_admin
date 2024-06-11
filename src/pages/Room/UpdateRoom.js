import React, { useEffect, useState } from "react";
import { Button, Card, CardBody, Container } from "reactstrap";
import GenralForm from "../../components/Form/GenricForm/GenralForm";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
    fetchHotelDropdownOptions,
    getCategories,
    getDeals,
    getFacilityList,
    saveRoom,
} from "../../store/actions";
import SubHeader from "../../components/Common/SubHeader";
import { getRoomByIdApi, updateRoomByIdApi } from "../../services/api/room/roomsApi";
import { getServicesApi } from "../../services/api/servicesApi";
import { getAmenitiesApi } from "../../services/api/amenitiesApi";

const UpdateRoom = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get("id")
    const [rooms, setRooms] = useState([]);
    const dispatch = useDispatch();
    const [services, setServices] = useState([]);
    const [amenities, setAmenities] = useState([]);
    const [
        hotelDropdownOptions,
        categories,
        facilitiesDropdownOptions,
        DealsDropdownOptions,
    ] = useSelector((state) => [
        state.Room.hotelDropdownOptions.hotels,
        state.RoomCategory.category,
        state.Facility.facilities,
        state.Deals.deals,
    ]);

    const [formData, setFormData] = useState({
        hotel: "",
        category: "",
        facilities: [],
        amenities: [],
        services: [],
        deals: [],
        gallery: [],
        thumbnail: "",
        banner: "",
        description: "",
        min_people: "",
        max_adults: "",
        base_Price: "",
        todays_price: "",
        max_children: "",
        rooms_stock: "",
        room_size: "",
        room_size_unit: "",
        beds: "",
    });
    console.log(formData)
    const [fetchedData, setFetchedData] = useState({
        hotel: "",
        category: "",
        facilities: [],
        deals: [],
        gallery: [],
        thumbnail: "",
        description: "",
        min_people: "",
        max_adults: "",
        base_Price: "",
        todays_price: "",
        max_children: "",
        rooms_stock: "",
    });

    const fetchAminities = async () => {
        try {
            const response = await getAmenitiesApi();
            console.log(response);
            const filteredData = response.amenities.filter((item) => !item.deleted);
            const formattedServices = filteredData.map(data => ({
                value: data.name,
                label: data.name
            }));
            setAmenities(formattedServices);
        } catch (error) {
            console.error("Error fetching facilities:", error);
        }
    }

    const fetchServices = async () => {
        try {
            const response = await getServicesApi();
            const filteredData = response.services.filter((item) => !item.deleted);
            const formattedServices = filteredData.map(data => ({
                value: data.title,
                label: data.title
            }));
            setServices(formattedServices);
        } catch (error) {
            console.error("Error fetching facilities:", error);
        }
    }

    const handleFormChange = (fieldName, value) => {
        setFormData(formData => ({
            ...formData,
            [fieldName]: value,
        }));
    };

    useEffect(() => {
        dispatch(fetchHotelDropdownOptions());
        dispatch(getCategories());
        dispatch(getFacilityList());
        dispatch(getDeals());
        fetchServices();
        fetchAminities();
    }, []);


    useEffect(() => {
        const fetchRooms = async () => {
            try {
                // Fetch data from your API endpoint
                const data = await getRoomByIdApi(id)

                setFetchedData(prevData => ({
                    ...prevData,
                    category: data.rooms?.category,
                    hotel: data.rooms?.hotel,
                    facilities: data.rooms?.facilities,
                    deals: data.rooms?.deals,
                    description: data.rooms?.description,
                    thumbnail: data.rooms?.thumbnail,
                    gallery: data.rooms?.gallery,
                    min_people: data.rooms?.min_people,
                    max_adults: data.rooms?.max_adults,
                    base_Price: data.rooms?.base_Price,
                    todays_price: data.rooms?.todays_price,
                    max_children: data.rooms?.max_children,
                    rooms_stock: data.rooms?.rooms_stock,
                }));

                setFormData(prevData => ({
                    ...prevData,
                    category: data.rooms?.category,
                    hotel: data.rooms?.hotel,
                    facilities: data.rooms?.facilities,
                    deals: data.rooms?.deals,
                    description: data.rooms?.description,
                    thumbnail: data.rooms?.thumbnail,
                    gallery: data.rooms?.gallery,
                    min_people: data.rooms?.min_people,
                    max_adults: data.rooms?.max_adults,
                    base_Price: data.rooms?.base_Price,
                    todays_price: data.rooms?.todays_price,
                    max_children: data.rooms?.max_children,
                    rooms_stock: data.rooms?.rooms_stock,
                }));
                // setRooms(data.rooms);
            } catch (error) {
                console.error("Error fetching rooms:", error);
            }
        };

        fetchRooms();
    }, [id]);


    const [
        hotelsListOption,
        roomCategoryOptions,
        facilitiesOptions,
        dealsOptions,
    ] = [
            hotelDropdownOptions?.map((hotel) => ({
                value: hotel.name,
                label: hotel.name,
            })),
            categories?.map((category) => ({
                value: category.name,
                label: category.name,
            })),
            facilitiesDropdownOptions?.map((facilities) => ({
                value: facilities.facilityName,
                label: facilities.facilityName,
            })),
            DealsDropdownOptions?.map((deals) => ({
                value: deals.name,
                label: deals.name,
            })),
        ];
    console.log(facilitiesOptions)
    const formFields = {
        backbutton: "/rooms",
        form: [
            {
                fieldName: "hotel",
                label: "Hotel",
                type: "select",
                errorMessage: "Please Select Hotel",
                value: formData.hotel,
                defaultValue: formData.hotel,
                options: hotelsListOption,
            },
            {
                fieldName: "category",
                label: "Room Category",
                type: "singleselect",
                errorMessage: "Select Room Category Name",
                value: formData.category,
                placeholder: "Select Room Category Name eg: Delux,SuperDelux...",
                options: roomCategoryOptions,
                defaultValue: formData.category,
            },
            {
                fieldName: "beds",
                label: "Beds",
                type: "singleselect",
                errorMessage: "Select Bed Type",
                value: formData.beds,
                placeholder: "Select Bed Type",
                options: roomCategoryOptions,
                defaultValue: formData.beds,
            },
            {
                fieldName: "price_type",
                label: "Price Type",
                type: "singleselect",
                errorMessage: "Select Price Type",
                value: formData.price_type,
                placeholder: "Select Price Type",
                options: roomCategoryOptions,
                defaultValue: formData.price_type,
            },
            {
                fieldName: "min_people",
                label: "Min People",
                type: "number",
                errorMessage: "Enter Minimum People",
                placeholder: "Enter Minimum Number of People in Room",
                value: "",
                defaultValue: formData.min_people,
            },
            {
                fieldName: "max_adults",
                label: "Max Adults",
                type: "number",
                errorMessage: "Enter Max Adults",
                placeholder: "Enter Maximum Number of Adults in Room",
                // value: formData?.max_adults,
                defaultValue: formData.max_adults,
            },
            {
                fieldName: "max_children",
                label: "Max Children",
                type: "number",
                errorMessage: "Enter Max. Children in Room",
                placeholder: "Enter Max. Children in Room",
                value: "",
                defaultValue: formData.max_children,
            },
            {
                fieldName: "base_Price",
                label: "Base Price",
                type: "number",
                errorMessage: "Enter Base Price",
                placeholder: "Enter Base Price",
                value: "",
                defaultValue: formData.base_Price,
            },
            {
                fieldName: "todays_price",
                label: "Todays Price",
                type: "number",
                errorMessage: "Enter Todays Price",
                placeholder: "Enter Todays Price",
                value: "",
                defaultValue: formData.todays_price,
            },  
            {
                fieldName: "rooms_stock",
                label: "Rooms Stock",
                type: "number",
                errorMessage: "Enter Number of Rooms Available in stock ",
                placeholder: "Enter Number of Rooms in stock",
                value: "",
                defaultValue: formData.rooms_stock,
            },                     
            {
                fieldName: "room_size",
                label: "Room Size",
                type: "number",
                errorMessage: "Room Size",
                placeholder: "Enter Room Size",
                value: "",
                defaultValue: formData.room_size,
            },
            {
                fieldName: "room_size_unit",
                label: "Room Size Unit",
                type: "text",
                errorMessage: "Room Size Unit",
                placeholder: "Enter Room Size Unit",
                value: "",
                defaultValue: formData.room_size_unit,
            },
           
            {
                fieldName: "facilities",
                label: "Facilities",
                type: "select",
                errorMessage: "Select Facilities For Room",
                value: formData.facilities,
                placeholder: "Select Facilities For Room eg: TV,AC,WiFi...",
                isMulti: true,
                options: facilitiesOptions,
                defaultValue: formData.facilities,
            },
            {
                fieldName: "amenities",
                label: "Amenities",
                type: "select",
                errorMessage: "Select Amenities For Room",
                value: formData.facilities,
                placeholder: "Select Amenities For Room",
                isMulti: true,
                options: amenities,
                defaultValue: formData.facilities,
            },
            {
                fieldName: "services",
                label: "Services",
                type: "select",
                errorMessage: "Select Services For Room",
                value: formData.facilities,
                placeholder: "Select Services For Room",
                isMulti: true,
                options: services,
                defaultValue: formData.facilities,
            },
            {
                fieldName: "deals",
                label: "Deals",
                type: "select",
                errorMessage: "Select Deals For Room",
                // value: formData.facilities,
                placeholder: "Select Deals For Room",
                isMulti: true,
                options: dealsOptions,
                defaultValue: formData.deals,
            },
            {
                fieldName: "thumbnail",
                label: "Thumbnail",
                type: "file",
                errorMessage: "Select File",
                value: formData.thumbnail,
                placeholder: "Select Image...",
                defaultValue: formData.thumbnail,
                imageViewer: true, // Enable image viewer for this field
            },
            {
                fieldName: "banner",
                label: "Banner",
                type: "file",
                errorMessage: "Select File",
                value: formData.banner,
                placeholder: "Select Image...",
                defaultValue: formData.thumbnail,
                imageViewer: true, // Enable image viewer for this field
            },
            {
                fieldName: "gallery",
                label: "Gallery",
                type: "file",
                errorMessage: "Select File",
                placeholder: "Select Image...",
                value: formData.gallery,
                defaultValue: formData.gallery,
                multiple: true,
                imageViewer: true, // Enable image viewer for this field
            },
            {
                fieldName: "description",
                label: "Description",
                type: "editor",
                defaultValue: formData.description,
            },
        ],
    };

    const handleSubmit = async () => {
        console.log("Update this data in DB", id, formData)
        const res = updateRoomByIdApi(id, formData)
        console.log("Api response is here in componet", res);
        // dispatch(saveRoom(formData));
    };

    return (
        <div className="page-content">
            <Container fluid={true}>
                <Card>
                    <CardBody>
                        <SubHeader value="/rooms" />
                        <GenralForm formFields={formFields} onChange={handleFormChange} />
                        <Button color="primary" type="submit" onClick={handleSubmit}>
                            Update
                        </Button>
                    </CardBody>
                </Card>
            </Container>
        </div>
    );
};

export default UpdateRoom;
