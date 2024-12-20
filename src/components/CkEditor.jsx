"use client"
import React from 'react';
import { CKEditor, useCKEditorCloud } from '@ckeditor/ckeditor5-react';

const CKEditorDemo = ({value , onChange}) => {
    const cloud = useCKEditorCloud( {
        version: '44.1.0',
        premium: true
    } );

    if ( cloud.status === 'error' ) {
        return <div>Error!</div>;
    }

    if ( cloud.status === 'loading' ) {
        return <div>Loading...</div>;
    }

    const {
        ClassicEditor,
        Essentials,
        Paragraph,
        Bold,
        Italic
    } = cloud.CKEditor;

    const { FormatPainter } = cloud.CKEditorPremiumFeatures;

    return (
        <CKEditor
            onChange={(event,editor)=>onChange(editor.getData())}
            editor={ ClassicEditor }
            data={value}
            config={ {
                licenseKey: 'eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3NjYyNzUxOTksImp0aSI6IjQ3MDBiZTFkLTEzZDAtNGYzYS1hZjM4LWJjOGU0ZDkwNTkxNyIsInVzYWdlRW5kcG9pbnQiOiJodHRwczovL3Byb3h5LWV2ZW50LmNrZWRpdG9yLmNvbSIsImRpc3RyaWJ1dGlvbkNoYW5uZWwiOlsiY2xvdWQiLCJkcnVwYWwiXSwiZmVhdHVyZXMiOlsiRFJVUCJdLCJ2YyI6ImJmZDYwZDg1In0.UaGE9iuGSNQMJC-DdLJiwE0rgme9QynsO-Hayj40DAN5uxDaRzMxVIXLqeLsQI6pbhi6nG6bzFJQ6ZSZU8BwCg',
                plugins: [ Essentials, Paragraph, Bold, Italic, FormatPainter ],
                toolbar: [ 'undo', 'redo', '|', 'bold', 'italic', '|', 'formatPainter' ]
            } }
        />
    );
};
export default CKEditorDemo