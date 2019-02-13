import React from 'react';
import './SelectedNote.css';

import NoteTab from '../NoteTab/NoteTab';

export default function SelectedNote(props) {
	const currentNote = props.notesData.notes.find(
		note => note.id === props.noteId
	);
	return (
		<div className="current-note">
			<NoteTab note={currentNote} />
			<p>{currentNote.content}</p>
		</div>
	);
}
