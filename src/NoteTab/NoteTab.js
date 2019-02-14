import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './NoteTab.css';

export default class NoteTab extends Component {
	static defaultProps = {
		note: {}
	};
	render() {
		return (
			<div>
				<h2>
					<Link to={`/note/${this.props.note.id}`}>{this.props.note.name}</Link>
				</h2>
				<p>Date modified on: {this.props.note.modified}</p>
				<button>Delete Note</button>
			</div>
		);
	}
}
