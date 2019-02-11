import React from 'react';
import './NotesFolder.js';

export default function NotesFolder(props) {
	// console.log(
	// 	this.props.notesData.folders.find(
	// 		folder => folder.name === this.props.match.params.folderId
	// 	)
	// );
	const folder = props.notesData.folders.find(
		folder => folder.name === props.folderId
	);
	const notes = props.notesData.notes
		.filter(note => note.folderId === folder.id)
		.map(note => (
			<div key={note.id}>
				<h2>{note.name}</h2>
				<p>{note.content}</p>
			</div>
		));
	return <div>{notes}</div>;
}
