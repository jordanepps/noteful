import React from 'react';
import { Link } from 'react-router-dom';
import './FolderTab.css';

export default function FolderTab(props) {
	return (
		<Link to={`/folder/${props.id}`} className={props.class}>
			{props.name}
		</Link>
	);
}
