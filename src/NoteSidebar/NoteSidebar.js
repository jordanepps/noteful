import React, { Component } from 'react';
import './NoteSidebar.css';

export default class NoteSidebar extends Component {
	render() {
		return (
			<nav className="note-sidebar">
				<button>Go back</button>
				<h3>Current Folder</h3>
			</nav>
		);
	}
}
