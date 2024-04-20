import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Col, Label, Row } from "reactstrap";

const CkEditor = ({ initialData, label, onChange, fieldName, id ,defaultVal}) => {
  const prefilledValue = defaultVal ? defaultVal : '';

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    onChange(fieldName, data); 
  };

  return (
    <Row className="mb-3">
      <Label htmlFor={id} className="col-md-1 col-form-label">
        {label}
      </Label>
      <Col>
        <CKEditor
          // value={prefilledValue}
          editor={ClassicEditor}
          data={prefilledValue}
          onChange={handleEditorChange}
        />
      </Col>
    </Row>
  );
};

export default CkEditor;
