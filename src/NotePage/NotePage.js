import React, { Component, Fragment } from 'react';
import './NotePage.css';

import NotesContext from '../NotesContext';
import NoteSidebar from '../NoteSidebar/NoteSidebar';
import CurrentNoteContainer from '../CurrentNoteContainer/CurrentNoteContainer';

export default class NotePage extends Component {
	static contextType = NotesContext;
	handleGoBack() {
		this.props.history.goBack();
	}

	render() {
		const currentNoteId = this.props.match.params.noteId;
		return (
			<Fragment>
				<NoteSidebar
					goBack={() => this.handleGoBack()}
					currentNoteId={currentNoteId}
				/>

				<CurrentNoteContainer currentNoteId={currentNoteId} />
			</Fragment>
		);
	}
}
