import React, { Component } from 'react';
import './NoteSidebar.css';

import NotesContext from '../NotesContext';

export default class NoteSidebar extends Component {
	static contextType = NotesContext;
	render() {
		const { folders } = this.context;
		const currentFolder = folders.find(
			folder => folder.id === this.props.currentFolderId
		);
		return (
			<nav className="note-sidebar">
				<button onClick={() => this.props.goBack()}>Go back</button>
				<h3>{currentFolder.name}</h3>
			</nav>
		);
	}
}
