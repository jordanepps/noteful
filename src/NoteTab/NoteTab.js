import React from 'react';
import { Link } from 'react-router-dom';
import './NoteTab.css';

export default function NoteTab(props) {
	console.log(props);
	return (
		<div>
			<h2>
				<Link to={`/note/${props.note.id}`}>{props.note.name}</Link>
			</h2>
			<p>Date modified on: {props.note.modified}</p>
			<button>Delete Note</button>
		</div>
	);
}
