import React from 'react';
import './SelectedFolder.css';

import NoteTab from '../NoteTab/NoteTab';

export default function SelectedFolder(props) {
	const notes = props.notesData.notes
		.filter(note => note.folderId === props.folderId)
		.map(note => <NoteTab key={note.id} note={note} />);
	return <div className="folder-content">{notes}</div>;
}
