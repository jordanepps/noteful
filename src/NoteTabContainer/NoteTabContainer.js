import React, { Component } from 'react';
import './NoteTabContainer.css';

import NoteTab from '../NoteTab/NoteTab';
import NotesContext from '../NotesContext';

export default class NoteTabContainer extends Component {
	static contextType = NotesContext;
	render() {
		const { notes } = this.context;
		console.log(notes);
		const tabs = notes.map(note => <NoteTab key={note.id} note={note} />);
		return <div className="note-tab-container">{tabs}</div>;
	}
}
