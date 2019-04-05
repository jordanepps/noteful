import React, { Component, Fragment } from 'react';
import './CurrentNoteContainer.css';

import NotesContext from '../NotesContext';

import NoteTab from '../NoteTab/NoteTab';

export default class CurrentNoteContainer extends Component {
	static contextType = NotesContext;
	static defaultProps = {
		currentNoteId: '',
		history: {}
	};

	handleDeleteNote(history) {
		history.push('/');
	}

	renderNoteData(notes, history) {
		const currentNote = notes.find(
			note => note.id === Number(this.props.currentNoteId)
		);
		const element = currentNote ? (
			<Fragment>
				<NoteTab
					note={currentNote}
					handleDeleteNote={() => this.handleDeleteNote(history)}
				/>
				<p>{currentNote.content}</p>
			</Fragment>
		) : (
			<p>Loading...</p>
		);
		return element;
	}

	render() {
		const { notes } = this.context;
		const { history } = this.props;
		return (
			<div className="current-note">{this.renderNoteData(notes, history)}</div>
		);
	}
}
