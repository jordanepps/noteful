import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './NoteTabContainer.css';

import NoteTab from '../NoteTab/NoteTab';
import NotesContext from '../NotesContext';

export default class NoteTabContainer extends Component {
	static contextType = NotesContext;
	static defaultProps = { currentFolder: {}, history: {} };

	handleDeleteNote() {
		this.props.history.push('/');
	}

	createNoteTabs = (note, history) => {
		return (
			<NoteTab
				key={note.id}
				note={note}
				handleDeleteNote={() => this.handleDeleteNote(history)}
			/>
		);
	};

	filterNoteTabs = note => {
		return note.folderId === this.props.currentFolder;
	};

	render() {
		const { notes } = this.context;
		const { currentFolder, history } = this.props;
		const tabs =
			Object.keys(currentFolder).length !== 0
				? notes.filter(this.filterNoteTabs).map(this.createNoteTabs)
				: notes.map(note => this.createNoteTabs(note, history));
		return (
			<div className="note-tab-container">
				<button>
					<Link to="/add-note">Add Note</Link>
				</button>
				{tabs}
			</div>
		);
	}
}
