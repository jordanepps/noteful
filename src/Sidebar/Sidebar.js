import React, { Component } from 'react';
import './Sidebar.css';

import NotesContext from '../NotesContext';
import FolderTab from '../FolderTab/FolderTab';

export default class Sidebar extends Component {
	static contextType = NotesContext;
	render() {
		const { folders } = this.context;
		const tabs = folders.map(folder => (
			<FolderTab key={folder.id} id={folder.id} name={folder.name} />
		));
		return (
			<nav className="sidenav">
				{tabs}
				<div>
					<button>Add folder</button>
				</div>
			</nav>
		);
	}
}
