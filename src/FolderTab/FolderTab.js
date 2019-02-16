import React from 'react';
import { NavLink } from 'react-router-dom';
import './FolderTab.css';

export default function FolderTab(props) {
	return (
		<NavLink to={`/folder/${props.id}`} className="folder-tab">
			{props.name}
		</NavLink>
	);
}
