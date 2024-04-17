import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Col, Label, Row } from "reactstrap";

const CkEditor = ({ initialData, label, onChange, fieldName, id ,defaultVal}) => {

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    onChange(fieldName, data); // Update the form data with CKEditor content
  };

  return (
    <Row className="mb-3">
      <Label htmlFor={id} className="col-md-1 col-form-label">
        {label}
      </Label>
      <Col>
        <CKEditor
          value={defaultVal}
          editor={ClassicEditor}
          data={defaultVal}
          onChange={handleEditorChange}
        />
      </Col>
    </Row>
  );
};

export default CkEditor;
