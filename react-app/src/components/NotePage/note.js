import React, {useState, useEffect} from "react";
import { render } from "react-dom";
import {useDispatch} from 'react-redux'
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { createNote, editNote, deleteNote, saveNote }  from "../../store/notes"
import { useSelectedNote } from '../../context/NoteContext';
import "../Note/index.css"
import "./index.css";
let editorId = "editor__container"

const CustomUndo = () => (
  <svg viewBox="0 0 18 18">
    <polygon className="ql-fill ql-stroke" points="6 10 4 12 2 10 6 10" />
    <path
      className="ql-stroke"
      d="M8.09,13.91A4.6,4.6,0,0,0,9,14,5,5,0,1,0,4,9"
    />
  </svg>
);

function undoChange() {
  this.quill.history.undo();
}

function redoChange() {
  this.quill.history.redo();
}




const CustomToolbar = () => (
  <div id="toolbar" className="toolbar">
  
<span class="ql-formats">
<button className="ql-undo">
        <CustomUndo />
      </button>
<select class="ql-font">
        <option selected>Sans Serif</option>
        <option value="inconsolata">Inconsolata</option>
        <option value="mirza">Mirza</option>
        <option value="arial">Arial</option>
</select>
</span>


<span class="ql-formats">
<select class="ql-size"></select>
<button class="ql-bold"></button>
<button class="ql-italic"></button>
<button class="ql-underline"></button>
<select class="ql-color"></select>
<button class="ql-header" value="1"></button>
{/* <button class="ql-header" value="2"></button> */}
<button class="ql-blockquote"></button>
{/* <button class="ql-strike"></button> */}
</span>



<span class="ql-formats">
<button class="ql-list" value="ordered"></button>
<button class="ql-list" value="bullet"></button>
<button class="ql-indent" value="-1"></button>
<button class="ql-indent" value="+1"></button>
</span>
<span class="ql-formats">
<button class="ql-direction" value="rtl"></button>
<select class="ql-align"></select>
</span>
<span class="ql-formats">
<button class="ql-link"></button>
<button class="ql-image"></button>
<button class="ql-video"></button>

</span>
  </div>
);

// Add sizes to whitelist and register them
const Size = Quill.import("formats/size");
Size.whitelist = ["extra-small", "small", "medium", "large"];
const registerSize = () => Quill.register(Size, true);


// Add fonts to whitelist and register them
const Font = Quill.import("formats/font");
Font.whitelist = [
  "arial",
  "mirza",
  "sans serif",
  "inconsolata",
];
const registerFont = () => Quill.register(Font, true);


function Note(props) {
  const dispatch = useDispatch()

  const {selectedNote, setSelectedNote} = useSelectedNote()
  const [editorHtml, setEditorHtml] = useState("")
  const [loaded, setLoaded] = useState(false)


  useEffect(()=>{
    if(selectedNote && selectedNote.text){
      setEditorHtml(selectedNote.text)
      setLoaded(true)
      console.log("YOU WORKING if selectednote && ")
      const Size = Quill.import("formats/size");
      registerSize()
      registerFont()
    }
    if (editorHtml){
      console.log("YOU WORKING if editorHtml")
      const Size = Quill.import("formats/size");
      registerSize()
      registerFont()

      return 
    }
    registerSize()
    registerFont()
    
  },[selectedNote])
  
  function autoSave() {

  }
  const handleSubmit = (e) => {
    e.preventDefault()
  }
  // let quill = new Quill('#editor__container', { 
    
  // });


  const modules = {
    toolbar: {
      container: "#toolbar",
      handlers: {
        undo: undoChange,
        autoSave: autoSave
      },
      history: {
        delay: 500,
        maxStack: 20,
        userOnly: true
      },
    },
  }
  
  let formats=[
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "color"
  ]
  Quill.import()

       return (
      <div>
      <div className="text-editor" id="editor__container">
      
        <div className="editor__container" >

        
        {editorHtml? <CustomToolbar /> : null }
        
      {editorHtml?
        <ReactQuill
          value={editorHtml}
          bounds={"#editor__container"}
          onChange={()=>autoSave()}
          placeholder={props.placeholder}
          modules={modules}
          formats={formats}
        />
        :null}
        </div>
        <div className="editor-footer">
          <div className="footer__save__text">
            <p>all changes saved.</p>
          </div>
          <div className="footer-right">
            <button className="footer__button" type="button"><p className="Footer_button_text">New Note <i className="fas fa-caret-down"></i></p></button>
          </div>
        </div>
      </div>
      </div>
    ) 
   
    
}






export default Note