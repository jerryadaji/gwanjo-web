
import Trix from "trix";
import React, { useState } from "react";
import { ReactTrixRTEInput, ReactTrixRTEToolbar } from "react-trix-rte";
  
  const RichTextEditor = (props) => {
  
    const handleChange = (event, newValue) => {
      props.updateDescription(newValue)
    }
  
    return (
      <>
        <ReactTrixRTEToolbar 
          toolbarId="react-trix-rte-editor" 
          toolbarActions={["bold", "italic", "strike", "heading1", "quote", "code", "bullet", "number", "outdent", "indent", "undo", "redo"]}
        />
        <ReactTrixRTEInput
          toolbarId="react-trix-rte-editor"
          defaultValue={"<div>"+(props.value ? props.value : "" )+"</div>"}
          onChange={handleChange}
        />
      </>
    )
  }

  export default RichTextEditor;