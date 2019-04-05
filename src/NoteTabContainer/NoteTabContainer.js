import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './NoteTabContainer.css';

import NoteTab from '../NoteTab/NoteTab';
import NotesContext from '../NotesContext';

export default class NoteTabContainer extends Component {
	static contextType = NotesContext;
	static defaultProps = { currentFolder: {}, history: {} };
	constructor() {
		super();
		this.filterNoteTabs = this.filterNoteTabs.bind(this);
		this.createNoteTab = this.createNoteTab.bind(this);
	}

	redirectToRoot() {
		this.props.history.push('/');
	}

	createNoteTab(note, history) {
		return (
			<NoteTab
				key={note.id}
				note={note}
				handleRedirectToRoot={() => this.redirectToRoot(history)}
			/>
		);
	}

	filterNoteTabs(note) {
		return note.folder_id === Number(this.props.currentFolder);
	}

	renderNoteTabComponents(currentFolder, notes, history) {
		return Object.keys(currentFolder).length !== 0
			? notes.filter(this.filterNoteTabs).map(this.createNoteTab)
			: notes.map(note => this.createNoteTab(note, history));
	}

	render() {
		const { notes } = this.context;
		const { currentFolder, history } = this.props;
		return (
			<div className="note-tab-container">
				<Link to="/add-note">Add Note</Link>
				{this.renderNoteTabComponents(currentFolder, notes, history)}
			</div>
		);
	}
}
