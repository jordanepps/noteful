import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

import NotesContext from '../NotesContext';
import FolderTab from '../FolderTab/FolderTab';

export default class Sidebar extends Component {
	static contextType = NotesContext;
	static defaultProps = {
		currentFolder: null
	};

	renderFolderTabComponent(folders) {
		return folders.map(folder => (
			<FolderTab key={folder.id} id={folder.id} name={folder.name} />
		));
	}

	render() {
		const { folders } = this.context;
		return (
			<nav className="sidenav">
				{this.renderFolderTabComponent(folders)}
				<div>
					<Link to="/add-folder">Add folder</Link>
				</div>
			</nav>
		);
	}
}
