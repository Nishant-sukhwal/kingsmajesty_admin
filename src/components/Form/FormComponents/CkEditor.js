import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Col, Label } from "reactstrap";

const CkEditor = ({ initialData, label, id, onChange }) => {
  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    onChange(id, data); // Update the form data with CKEditor content
  };

  return (
    <div className="d-flex flex-row mb-3">
      <Label htmlFor={id} className="col-md-1 col-form-label">
        {label}
      </Label>
      <Col>
        <CKEditor
          editor={ClassicEditor}
          data={initialData}
          onChange={handleEditorChange}
        />
      </Col>
    </div>
  );
};

export default CkEditor;


// import React from "react";
// import { CKEditor } from "@ckeditor/ckeditor5-react";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import { Col, Label } from "reactstrap";

// const CkEditor = ({ initialData, onReady, label, id }) => {
//     return (
//         <div className="d-flex flex-row mb-3">
//             <Label htmlFor={id} className="col-md-1 col-form-label">
//                 {label}
//             </Label>
//             <Col >
//             <CKEditor
//                 editor={ClassicEditor}
//                 data={initialData}
//                 onReady={onReady}
//             />
//             </Col>
          
//         </div>
//     );
// };

// export default CkEditor;




// how to use above CK editor in code Anywhere:-> 
// <Row>
// <CkEditor
//     label="Ck Editor Name" 
//     id="ck-editor-input"
//     initialData="<p>Hello from CKEditor 5!</p>"
//     onReady={(editor) => {
//         // You can store the "editor" and use when it is needed.
//     }}
// />
// </Row>

