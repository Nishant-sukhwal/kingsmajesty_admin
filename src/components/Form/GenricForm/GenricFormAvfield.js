// GenericFormAvfield.js

import React from "react";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { Button, Col, Row, FormGroup, Label, Input } from "reactstrap";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const GenericFormAvfield = ({
  fields,
  onInputChange,
  fieldOptions,
  prefilledvalue,
  onCKEditorChange,
  prefilledDetails,
}) => {
  const handleChange = (event, editor, fieldName) => {
    // Handle CKEditor changes
    const data = editor.getData();

    console.log(data);
    onCKEditorChange(fieldName, data);
  };

  const renderField = (field) => {  
    
    switch (field.type) {
      case "select":
        return (
          <Col md={6} key={field.name}>
            <FormGroup>
              <Label for={field.name}>{field.label}</Label>
              <Input
                type="select"
                name={field.name}
                id={field.name}
                required={field.required}
                value={field.value}
                onChange={(event) =>
                  onInputChange(event, field.name, event.target.value)
                }                
              >
                <option value="">Select an option</option>
                {field.options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Input>
            </FormGroup>
          </Col>
        );
      // case "select":
      //   return (
      //     <Col md={6} key={field.name}>
      //       <FormGroup>
      //         <Label for={field.name}>{field.label}</Label>
      //         <Input
      //           type="select"
      //           name={field.name}
      //           id={field.name}
      //           required={field.required}
      //         >
      //           <option value="">Select an option</option>
      //           {fieldOptions[field.name].map((option) => (
      //             <option key={option.value} value={option.value}>
      //               {option.label}
      //             </option>
      //           ))}
      //         </Input>
      //       </FormGroup>
      //     </Col>
      //   );

      case "ckeditor":
        return (
          <Col md={12} key={field.name}>
            <FormGroup>
              <Label for={field.name}>{field.label}</Label>
              <CKEditor
                editor={ClassicEditor}
                data=""
                onChange={(event, editor) =>
                  handleChange(event, editor, field.name)
                }
              />
            </FormGroup>
          </Col>
        );

      case "radio":
        return (
          <Col md={6} key={field.name}>
            <FormGroup
              tag="fieldset"
              className="d-flex flex-row align-items-center justify-content-start "
            >
              <legend className="col-2 col-form-label">{field.label}</legend>
              {field.options.map((option) => (
                <FormGroup check inline key={option}>
                  <Label check>
                    <Input
                      className="form-check-input"
                      type="radio"
                      name={field.name}
                      value={option}
                      onChange={(event) => onInputChange(event, field.name)}
                    />
                    {option}
                  </Label>
                </FormGroup>
              ))}
            </FormGroup>
          </Col>
        );
      // Add similar cases for other field types

      default:
        return (
          <Col md={6} key={field.name}>
            <AvField
              name={field.name || prefilledvalue}
              label={field.label}
              type={field.type || "text"}
              placeholder={field.placeholder}
              required={field.required}
              validate={field.required}
              onChange={(event) => onInputChange(event, field.name)}
              value={field.value}
              // value={prefilledDetails ? prefilledDetails[field.name] || "" : ""}
              // value={fieldValue}
              // value={fieldValue !== "" ? fieldValue : ""}
            />
          </Col>
        );
    }
  };

  return (
    <Row className="d-flex flex-row">
      {fields.map((field) => renderField(field))}
    </Row>
  );
};

export default GenericFormAvfield;

// // GenericFormAvfield.js

// import React from "react";
// import { AvForm, AvField } from "availity-reactstrap-validation";
// import { Button, Col, Row, FormGroup, Label, Input } from "reactstrap";

// const GenericFormAvfield = ({ fields, onSubmit, fieldOptions }) => {
//   const renderField = (field) => {
//     switch (field.type) {
//       case "select":
//         return (
//           <Col md={6} key={field.name}>
//             <FormGroup>
//               <Label for={field.name}>{field.label}</Label>
//               <Input
//                 type="select"
//                 name={field.name}
//                 id={field.name}
//                 required={field.required}
//               >
//                 <option value="">Select an option</option>
//                 {fieldOptions[field.name].map((option) => (
//                   <option key={option.value} value={option.value}>
//                     {option.label}
//                   </option>
//                 ))}
//               </Input>
//             </FormGroup>
//           </Col>
//         );

//       // Add similar cases for other field types

//       default:
//         return (
//           <Col md={6} key={field.name}>
//             <AvField
//               name={field.name}
//               label={field.label}
//               type={field.type || "text"}
//               placeholder={field.placeholder}
//               required={field.required}
//               validate={field.required}
//             />
//           </Col>
//         );
//     }
//   };

//   return (
//     <AvForm onValidSubmit={onSubmit}>
//       <Row className="d-flex flex-row">
//         {fields.map((field) => renderField(field))}
//       </Row>
//       <Button color="primary" type="submit">
//         Submit
//       </Button>
//     </AvForm>
//   );
// };

// export default GenericFormAvfield;

// import React from "react";
// import { AvForm, AvField } from "availity-reactstrap-validation";
// import { Button, Col, Row } from "reactstrap";

// const GenericFormAvfield = ({ fields, onSubmit, fileValidation }) => {
//   return (
//     <AvForm onValidSubmit={onSubmit}>
//       <Row className="d-flex flex-row">

//           {fields.map((field) => (
//             <Col md={6}>
//             <AvField
//               key={field.name}
//               name={field.name}
//               label={field.label}
//               type={field.type || "text"}
//               placeholder={field.placeholder}
//               required={field.required}
//               validate={field.required}
//             />
//             </Col>
//           ))}

//       </Row>
//       {/* <Button color="primary" type="submit">
//         Submit
//       </Button> */}
//     </AvForm>
//   );
// };

// export default GenericFormAvfield;
