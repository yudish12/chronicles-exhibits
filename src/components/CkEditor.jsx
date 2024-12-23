import CKEditor from "ckeditor4-react";
import React from "react";

const CkEditor = ({ value, onChange }) => {
  return (
    <CKEditor
      onChange={(event, editor) => {
        console.log(event, event.editor.getData());
        onChange(event.editor.getData());
      }}
      data={value}
    />
  );
};

export default CkEditor;
