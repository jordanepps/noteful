import React, { Component } from 'react';
import './NoteSidebar.css';

import NotesContext from '../NotesContext';

export default class NoteSidebar extends Component {
	static contextType = NotesContext;

	findCurrentFolder(currentNote, folders) {
		if (currentNote) {
			return folders.find(folder => folder.id === currentNote.folderId);
		}
	}
	render() {
		const { notes, folders } = this.context;
		const currentNote = notes.find(
			note => note.id === this.props.currentNoteId
		);
		const currentFolder = this.findCurrentFolder(currentNote, folders);
		return (
			<nav className="note-sidebar">
				<button onClick={() => this.props.goBack()}>Go back</button>
				<h3>{currentFolder ? currentFolder.name : 'Loading...'}</h3>
			</nav>
		);
	}
}
