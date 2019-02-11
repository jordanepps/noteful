import React from 'react';
import './CurrentNote.css';

import Note from '../Note/Note';

export default function CurrentNote(props) {
	const currentNote = props.notesData.notes.find(
		note => note.id === props.noteId
	);
	return (
		<div className="current-note">
			<Note note={currentNote} />
			<p>{currentNote.content}</p>
		</div>
	);
}
