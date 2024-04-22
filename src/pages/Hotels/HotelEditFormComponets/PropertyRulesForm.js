import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import { AvForm } from "availity-reactstrap-validation";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import GenericFormAvfield from "../../../components/Form/GenricForm/GenricFormAvfield";
import MultipleSelector from "../../../components/Form/FormSelectorComponent/MultipleSelector";
import { useSelector } from "react-redux";
import { PropertyRulesAddApi } from "../../../services/api/hotel/hotelCreateApi";
import GenralForm from "../../../components/Form/GenricForm/GenralForm";
import { useLocation } from "react-router-dom";
import { getPaymentMethodsApi, getPaymentMethodsByIdApi } from "../../../services/api/paymentMethods/paymentMethodsApi";
// import { PropertyRulesAddApi } from "../../../services/api/hotel/hotelCreateApi"; // Import the API for Property Rules


const PropertyRulesForm = forwardRef((props, ref) => {
  const hotelId = useSelector((state) => state.Hotel.id);
  const [selectedFacilities, setSelectedFacilities] = useState(null);
  const hotel = useSelector((state) => state.Hotel.data);
  console.log("hotel hotel hotel hotel hotel", hotel)
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id")
  const [paymentOptions, setPaymentOptions] = useState();
  console.log("paymentOptions paymentOptions paymentOptions paymentOptions paymentOptions paymentOptions", paymentOptions)
  const [formData, setFormData] = useState({
    paymentPolicy: "",
    ageRestriction: "",
    checkintime: "",
    checkouttime: "",
    paymentMethods: [],
    petsRules: "",
    childRules: "",
  });
  console.log(formData);


  useEffect(() => {
    const data = hotel?.paymentMethods
    const allOptions = [];

    // data.forEach(method => {
    //   method.options.forEach(option => {
    //     allOptions.push(option.label);
    //   });
    // });
   console.log("-00-0-0-0--0-0-0-0-0-0-0-0-0-0-0-0-0-0-0-9578700-",allOptions);

    setFormData(prevData => ({
      ...prevData,
      paymentPolicy: hotel?.paymentPolicy,
      ageRestriction: hotel?.ageRestriction,
      checkintime: hotel?.checkintime,
      checkouttime: hotel?.checkouttime,

      paymentMethods: allOptions,
      petsRules: hotel?.petsRules,
      childRules: hotel?.childRules,
    }))
  }, [hotel, id])

  const handleFormChange = (fieldName, value) => {
    console.log(fieldName, value);
    setFormData({
      ...formData,
      [fieldName]: value,
    });
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPaymentMethodsApi();
        console.log("data data data data&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&", data)
        // Categorize payment methods into groups
        const formattedOptions = [
          {
            label: "Card",
            options: data.paymentMethods
              .filter(method => method.name.includes("Card"))
              .map(method => ({ label: method.name, value: method.name }))
          },
          {
            label: "Online",
            options: data.paymentMethods
              .filter(method => !method.name.includes("Card") && !method.name.includes("COD"))
              .map(method => ({ label: method.name, value: method.name }))
          },
          {
            label: "COD",
            options: data.paymentMethods
              .filter(method => method.name.includes("COD"))
              .map(method => ({ label: method.name, value: method.name }))
          }
        ];




        // const allOptions = [];

        // formattedOptions.forEach(method => {
        //   method.options.forEach(option => {
        //     allOptions.push(option.label);
        //   });
        // });

        // const jsonString = (JSON.stringify(allOptions))
        // const options = (jsonString);
        // const formattedArray = JSON.stringify([options]);

        // setPaymentOptions(allOptions);
        setPaymentOptions(formattedOptions);

      } catch (error) {
        console.error("Error fetching Payment method data:", error);
      }
    };


    fetchData();
  }, [id]);


  // const paymentOptions = [
  //   {
  //     label: "Card",
  //     options: [
  //       { label: "Visa", value: "Visa" },
  //       { label: "Master", value: "Master" },
  //       { label: "Credit", value: "Credit" },
  //     ],
  //   },
  //   {
  //     label: "Online",
  //     options: [
  //       { label: "UPI", value: "UPI" },
  //       { label: "Paypal", value: "Paypal" },
  //     ],
  //   },
  //   {
  //     label: "COD",
  //     options: [
  //       { label: "Cash On Delivery", value: "swimmingPool" },
  //     ],
  //   },
  // ];

  const formFields = {
    form: [
      { fieldName: "checkintime", label: "Check-In Time", type: 'time', required: true, errorMessage: "Please Enter Check-In Time", placeholder: "Enter Check-In Time", defaultValue: hotel?.checkintime, },
      { fieldName: "checkouttime", label: "Check-Out Time", type: 'time', required: true, errorMessage: "Please Enter Check-Out Time", placeholder: "Enter Check-Out Time", defaultValue: hotel?.checkouttime, },
      { fieldName: "paymentPolicy", label: "Cancellation / Payment Policy", type: 'address', required: true, errorMessage: "Please Enter Cancellation/Payment Policy", placeholder: "Enter Cancellation/Payment Policy", defaultValue: hotel?.paymentPolicy },
      { fieldName: "ageRestriction", label: "Age Restriction", type: 'address', required: true, errorMessage: "Please Enter Age Restriction ploicy", placeholder: "Enter Age Restriction Policy", defaultValue: hotel?.ageRestriction },
      { fieldName: "petsRules", label: "Pets", type: 'address', required: true, errorMessage: "Please Enter Pets Policy", placeholder: "Enter Pets Policy", defaultValue: hotel?.petsRules, },
      { fieldName: "childRules", label: "Child Policies", type: 'address', required: true, errorMessage: "Please Enter Child policies", placeholder: "Enter Child policies", defaultValue: hotel?.childRules },
      { fieldName: "paymentMethods", label: "PaymentMethods", type: "select", errorMessage: "Select Payment Methods", value: formData.paymentMethods, placeholder: "Select Payment Methods", isMulti: true, options: paymentOptions, defaultValue: hotel?.paymentMethods, },
    ],
  };

  const submitForm = async () => {
    const errors = {};
    formFields.form.forEach(field => {
      if (field.required && !formData[field.fieldName]) {
        errors[field.fieldName] = field.label;
      }
    });
    if (Object.keys(errors).length > 0) {
      const errorMessages = Object.values(errors).join(" ,");
      toastr.error(`Please ensure all required fields are filled. Missing fields: : ${errorMessages}`);
      return;
    }

    // Implement the API call for Property Rules form submission
    try {
      const res = await PropertyRulesAddApi(formData, hotelId);
      console.log(res);
      if (res.status === 200) {
        toastr.success(res.data.message);
        if (props.onSubmitSuccess) {
          props.onSubmitSuccess();
        }
      } else {
        if (props.onSubmitSuccess) {
          props.onSubmitSuccess();
        }
      }

    } catch (error) {
      console.error(error);
      toastr.error("Failed to create Property Rules");
    }
  };

  useImperativeHandle(ref, () => ({
    submitForm,
  }));

  return (
    <div>
      <Container fluid={true}>
        <GenralForm formFields={formFields} onChange={handleFormChange} />
      </Container>
    </div>
  );
});

export default PropertyRulesForm;
