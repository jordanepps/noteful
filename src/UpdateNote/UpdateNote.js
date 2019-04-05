import React, { Component } from 'react';
import './UpdateNote.css';

import NotesContext from '../NotesContext';
import ValidationError from '../ValidationError/ValidationError';

export default class UpdateNote extends Component {
	static contextType = NotesContext;
	constructor(props) {
		super(props);
		this.state = {
			note_name: '',
			content: '',
			folder_id: '',
			nameValid: false,
			contentValid: false,
			validationMessages: {
				note_name: '',
				content: '',
				form: ''
			}
		};
	}

	componentDidMount() {
		const currentNoteId = Number(this.props.match.params.noteId);

		if (!this.context.notes.length) {
			fetch(`http://localhost:8000/api/notes/${currentNoteId}`)
				.then(res => res.json())
				.then(note => {
					this.setState({
						note_name: note.note_name,
						content: note.content,
						folder_id: note.folder_id
					});
				})
				.catch(err => {
					console.log(err);
				});
		} else {
			const currentNote = this.context.notes.find(
				note => note.id === currentNoteId
			);
			this.setState({
				note_name: currentNote.note_name,
				content: currentNote.content,
				folder_id: currentNote.folder_id
			});
		}
	}

	handleFormSubmit(e) {
		e.preventDefault();
	}

	titleCase(str) {
		return str.replace(
			/\w\S*/g,
			txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
		);
	}

	updateNoteName(input) {
		const note_name = this.titleCase(input);
		this.setState({ note_name }, this.validateNoteName(note_name));
	}

	validateNoteName(note_name) {
		const validationMessages = this.state.validationMessages;
		validationMessages.form = '';
		let hasError = false;
		if (note_name.length === 0) {
			validationMessages.note_name = 'Title is required';
			hasError = !hasError;
		} else if (note_name.length < 3) {
			validationMessages.note_name = 'Title has to be 3 or more characters';
			hasError = !hasError;
		}
		this.setState({ validationMessages, nameValid: !hasError }, this.formValid);
	}

	updateContent(content) {
		this.setState({ content }, () => this.validateContent(content));
	}

	validateContent(content) {
		const validationMessages = this.state.validationMessages;
		validationMessages.form = '';
		let hasError = false;
		if (content.length === 0) {
			validationMessages.content = 'Body cannot be empty';
			hasError = !hasError;
		}
		this.setState(
			{ validationMessages, contentValid: !hasError },
			this.formValid
		);
	}

	getCurrentNote() {}

	render() {
		const {
			note_name,
			content,
			nameValid,
			contentValid,
			validationMessages
		} = this.state;
		return (
			<div>
				<form onSubmit={e => this.handleFormSubmit(e)}>
					<div>
						<label htmlFor="note_name">Note Title: </label>
						<input
							type="text"
							name="note_name"
							id="note_name"
							value={note_name}
							onChange={e => this.updateNoteName(e.target.value)}
						/>
						<ValidationError
							hasError={!nameValid}
							message={validationMessages.note_name}
						/>
					</div>

					<div>
						<label htmlFor="content">Note Body: </label>
						<input
							type="text"
							id="content"
							value={content}
							onChange={e => this.updateContent(e.target.value)}
						/>
						<ValidationError
							hasError={!contentValid}
							message={validationMessages.content}
						/>
					</div>
				</form>
			</div>
		);
	}
}
