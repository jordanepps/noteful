import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

export default class Sidebar extends Component {
	render() {
		const folders = this.props.folders.map(folder => (
			<Link key={folder.id} to={`/folder/${folder.name}`}>
				{folder.name}
			</Link>
		));
		return <nav className="sidenav">{folders}</nav>;
	}
}
