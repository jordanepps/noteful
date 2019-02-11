import React from 'react';
import './NotesFolder.css';

import Note from '../Note/Note';

export default function NotesFolder(props) {
	const notes = props.notesData.notes
		.filter(note => note.folderId === props.folderId)
		.map(note => <Note key={note.id} note={note} />);
	return <div className="folder-content">{notes}</div>;
}
