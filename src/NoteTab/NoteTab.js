import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './NoteTab.css';

import config from '../config';
import NotesContext from '../NotesContext';

export default class NoteTab extends Component {
	static contextType = NotesContext;
	static defaultProps = {
		note: {}
	};

	handleClickDelete(noteId) {
		fetch(`${config.API_ENDPOINT}/api/notes/${noteId}`, {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
				'content-type': 'application/json'
			}
		}).then(() => {
			this.context.deleteNote(noteId);
			this.props.handleRedirectToRoot();
			this.context.fetchNotes();
		});
	}

	convertModifiedTimeStamp(isoStr) {
		const modified = new Date(isoStr);
		const date = this.getOrdinalDate(modified.getDate());
		const month = this.getMonthAbbr(modified.getMonth());
		return `${date} ${month} ${modified.getFullYear()}`;
	}

	getOrdinalDate(d) {
		if (d > 3 && d < 21) return `${d}th`;
		switch (d % 10) {
			case 1:
				return `${d}st`;
			case 2:
				return `${d}nd`;
			case 3:
				return `${d}rd`;
			default:
				return `${d}th`;
		}
	}

	getMonthAbbr(m) {
		return [
			'Jan',
			'Feb',
			'Mar',
			'Apr',
			'May',
			'Jun',
			'Jul',
			'Aug',
			'Sept',
			'Oct',
			'Nov',
			'Dec'
		][m];
	}

	render() {
		const { note } = this.props;
		return (
			<div>
				<h2>
					<Link to={`/note/${note.id}`}>{note.note_name}</Link>
				</h2>
				<p>
					Last modified on {this.convertModifiedTimeStamp(note.date_published)}
				</p>
				<Link to={`/update-note/${note.id}`}>Update Note</Link>
				<button onClick={() => this.handleClickDelete(note.id)}>
					Delete Note
				</button>
			</div>
		);
	}
}
