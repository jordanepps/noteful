import React, { Component, Fragment } from 'react';
import './CurrentNoteContainer.css';

import NotesContext from '../NotesContext';

import NoteTab from '../NoteTab/NoteTab';

export default class CurrentNoteContainer extends Component {
	static contextType = NotesContext;
	static defaultProps = {
		currentNoteId: ''
	};

	renderNoteData(notes) {
		const currentNote = notes.find(
			note => note.id === this.props.currentNoteId
		);
		const element = currentNote ? (
			<Fragment>
				<NoteTab note={currentNote} />
				<p>{currentNote.content}</p>
			</Fragment>
		) : (
			<p>Loading...</p>
		);
		return element;
	}

	render() {
		const { notes } = this.context;
		return <div className="current-note">{this.renderNoteData(notes)}</div>;
	}
}
