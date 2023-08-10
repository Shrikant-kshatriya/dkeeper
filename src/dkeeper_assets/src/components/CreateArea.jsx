import React, { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';


function CreateArea(props) {
    const [note, setNote] = useState({
        title:'',
        content:''
    });

    const [inFocus, setFocus] = useState(false);

function handleChange(event){
    const {name, value} = event.target;
    setNote(prevNote => {
        return {
            ...prevNote,
            [name]: value
        }
    });
}

function handleFocus(){
  setFocus(true);
}

function clearInput(){
  setNote({title:'',
content:''})
}

function preventdefault(e){
    e.preventDefault();
}

  return (
    <div>
      {inFocus?
      <form className="create-note" onSubmit={preventdefault}>
        <input value={note.title} onChange={handleChange} name="title" placeholder="Title" />
        <textarea onFocus={handleFocus} value={note.content} onChange={handleChange} name="content" placeholder="Take a note..." rows='3' />
        <Zoom in={true}>
          <Fab onClick={() => {
              props.addNote(note);
              clearInput()
          }}><AddIcon /></Fab>
        </Zoom>
      </form>:
      <form className="create-note" onSubmit={preventdefault}>
      <textarea onFocus={handleFocus} value={note.content} onChange={handleChange} name="content" placeholder="Take a note..." rows='1' />
    </form>}
    </div>
  );
}

export default CreateArea;
