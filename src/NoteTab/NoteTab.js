import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './NoteTab.css';

import NotesContext from '../NotesContext';

export default class NoteTab extends Component {
	static defaultProps = {
		note: {}
	};
	static contextType = NotesContext;

	handleClickDelete(noteId) {
		fetch(`http://localhost:9090/notes/${noteId}`, {
			method: 'DELETE',
			headers: {
				'content-type': 'application/json'
			}
		})
			.then(res => res.json())
			.then(() => {
				this.context.deleteNote(noteId);
				this.props.handleDeleteNote();
			});
	}
	render() {
		const { note } = this.props;
		return (
			<div>
				<h2>
					<Link to={`/note/${note.id}`}>{note.name}</Link>
				</h2>
				<p>Date modified on: {note.modified}</p>
				<button onClick={() => this.handleClickDelete(note.id)}>
					Delete Note
				</button>
			</div>
		);
	}
}
