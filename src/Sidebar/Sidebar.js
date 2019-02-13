import React, { Component } from 'react';
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
			<FolderTab
				key={folder.id}
				id={folder.id}
				name={folder.name}
				class={
					this.props.currentFolder === folder.id
						? 'selected folder-tab'
						: 'folder-tab'
				}
			/>
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
