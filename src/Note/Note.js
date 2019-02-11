import React from 'react';
import { Link } from 'react-router-dom';
import './Note.css';

export default function Note(props) {
	return (
		<div>
			<h2>
				<Link to={`/note/${props.note.id}`}>{props.note.name}</Link>
			</h2>
			<p>Date modified on: {props.note.modified}</p>
		</div>
	);
}
