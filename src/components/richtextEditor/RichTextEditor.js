
import Trix from "trix";
import React, { useState } from "react";
import { ReactTrixRTEInput, ReactTrixRTEToolbar } from "react-trix-rte";
  
  const RichTextEditor = ({value, updateDescription}) => {
  
    const handleChange = (event, newValue) => {
      updateDescription(newValue)
    }
  
    return (
      <>
        <ReactTrixRTEToolbar 
          toolbarId="react-trix-rte-editor" 
          toolbarActions={["bold", "italic", "strike", "heading1", "quote", "code", "bullet", "number", "outdent", "indent", "undo", "redo"]}
        />
        <ReactTrixRTEInput
          toolbarId="react-trix-rte-editor"
          defaultValue={"<div>"+(value ? value : "" )+"</div>"}
          onChange={handleChange}
        />
      </>
    )
  }

  export default RichTextEditor;