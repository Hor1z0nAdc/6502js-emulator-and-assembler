import React from 'react'
import AceEditor from "react-ace";
import 'ace-builds/src-noconflict/theme-monokai'

const Editor = ({code, setCode}) => {

  return (
    <div className='editor-div'>
        <AceEditor
            width='40vw'
            height='40vh'
            value={code} 
            onChange={currentCode => setCode(currentCode)}
            theme='monokai'
            fontSize={14}
            showGutter={true}
            highlightActiveLine={true}
         />
    </div>
  )
}

export default Editor