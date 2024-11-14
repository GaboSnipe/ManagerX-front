import React, { useState } from 'react'
import { NotesListComponent } from '../components';

const NotesPage = () => {
const [notesList, setNotesList] = useState([{id: 1, title: "title#1", content: "quilleditortext"},{id: 2, title: "title#2", content: "quilleditortext"},{id: 3, title: "title#3", content: "quilleditortext"}]);

    return (
    <div className=''>
        <NotesListComponent notesList={notesList}/>
    </div>
  )
}

export default NotesPage;