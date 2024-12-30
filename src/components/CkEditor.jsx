import CKEditor from "ckeditor4-react";
import React from "react";

const CkEditor = ({ value, onChange, index }) => {
  return (
    <CKEditor
      onChange={(event, editor) => {
        console.log(event.editor.getData(), index, "CKE log");
        if (index) {
          onChange(index, event.editor.getData());
          return;
        }
        onChange(event.editor.getData());
      }}
      data={value}
    />
  );
};

export default CkEditor;
