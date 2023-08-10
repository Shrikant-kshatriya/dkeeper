import React, { useEffect, useState } from 'react'
import Header from './Header.jsx'
import Note from './Note.jsx'
import Footer from './Footer.jsx'
import CreateArea from './CreateArea.jsx'
import { dkeeper } from '../../../declarations/dkeeper';

function App(){

    const [notesArray, setNotesArray] = useState([]);

    useEffect(() => {
        fetchData();
    },[]);

    async function fetchData(){
        const notesArray = await dkeeper.readNotes();
        setNotesArray(notesArray);
    };

    function deleteNote(id){
        setNotesArray(prevNotes => {
            dkeeper.removeNote(id);
            return prevNotes.filter((note, index) => {
                return (id !== index);
            });
        });
    }
    function addNote(note){
        setNotesArray( prevNotes => {
           dkeeper.createNote(note.title, note.content);
            return [note, ...prevNotes];
        });
    }

    return (
    <div>
        <Header />
        <CreateArea  addNote={addNote} />
        {notesArray.map((note, index) => {
            return (
                <Note key={index} id={index} deleteNote={deleteNote} title={note.title} content={note.content} />
            )
        })}
        
        <Footer />
    </div>
    );
}

export default App;