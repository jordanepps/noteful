import React, { Component } from 'react';
import './NoteTabContainer.css';

import NoteTab from '../NoteTab/NoteTab';
import NotesContext from '../NotesContext';

export default class NoteTabContainer extends Component {
	static contextType = NotesContext;
	static defaultProps = { currentFolder: null };

	createNoteTabs = note => {
		return <NoteTab key={note.id} note={note} />;
	};

	filterNoteTabs = note => {
		return note.folderId === this.props.currentFolder;
	};

	render() {
		const { notes } = this.context;
		const { currentFolder } = this.props;
		const tabs = currentFolder
			? notes.filter(this.filterNoteTabs).map(this.createNoteTabs)
			: notes.map(this.createNoteTabs);
		return <div className="note-tab-container">{tabs}</div>;
	}
}
