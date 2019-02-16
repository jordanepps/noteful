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

	render() {
		const { folders } = this.context;
		const tabs = folders.map(folder => (
			<FolderTab key={folder.id} id={folder.id} name={folder.name} />
		));
		return (
			<nav className="sidenav">
				{tabs}
				<div>
					<Link to="/add-folder">Add folder</Link>
				</div>
			</nav>
		);
	}
}
