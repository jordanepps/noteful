import React, { Component, Fragment } from 'react';
import './NotePage.css';

import NoteTab from '../NoteTab/NoteTab';
import NotesContext from '../NotesContext';
import NoteSidebar from '../NoteSidebar/NoteSidebar';

export default class NotePage extends Component {
	static contextType = NotesContext;

	filterNotes = note => {
		return note.id === this.props.match.params.noteId;
	};

	render() {
		const { notes } = this.context;
		const currentNote = notes.find(this.filterNotes);
		return (
			<Fragment>
				<NoteSidebar />
				<div className="current-note">
					<NoteTab note={currentNote} />
					<p>{currentNote.content}</p>
				</div>
			</Fragment>
		);
	}
}
