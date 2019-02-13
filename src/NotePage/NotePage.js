import React, { Component, Fragment } from 'react';
import './NotePage.css';

import NoteTab from '../NoteTab/NoteTab';
import NotesContext from '../NotesContext';
import NoteSidebar from '../NoteSidebar/NoteSidebar';

export default class NotePage extends Component {
	static contextType = NotesContext;
	constructor(props) {
		super(props);
		this.filterNotes = this.filterNotes.bind(this);
	}

	filterNotes(note) {
		return note.id === this.props.match.params.noteId;
	}

	handleGoBack() {
		console.log('click');
		this.props.history.goBack();
	}

	render() {
		const { notes } = this.context;
		const currentNote = notes.find(this.filterNotes);
		console.log(currentNote.folderId);
		return (
			<Fragment>
				<NoteSidebar
					goBack={() => this.handleGoBack()}
					currentFolderId={currentNote.folderId}
				/>
				<div className="current-note">
					<NoteTab note={currentNote} />
					<p>{currentNote.content}</p>
				</div>
			</Fragment>
		);
	}
}
