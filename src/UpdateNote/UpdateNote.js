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
			author_id: 1,
			nameValid: true,
			contentValid: true,
			folderValid: true,
			formValid: false,
			noteUpdated: false,
			successMessage: '',
			validationMessages: {
				note_name: '',
				content: '',
				folder_id: '',
				form: ''
			}
		};
	}

	componentDidMount() {
		const currentNoteId = Number(this.props.match.params.noteId);

		this.context.notes.length
			? this.getCurrentNoteFromContext(currentNoteId)
			: this.fetchCurrentNote(currentNoteId);
	}

	fetchCurrentNote(noteId) {
		fetch(`http://localhost:8000/api/notes/${noteId}`, {
			method: 'get',
			headers: {
				Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`
			}
		})
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
	}

	getCurrentNoteFromContext(noteId) {
		const currentNote = this.context.notes.find(note => note.id === noteId);
		this.setState({
			note_name: currentNote.note_name,
			content: currentNote.content,
			folder_id: currentNote.folder_id
		});
	}

	handleFormSubmit(e) {
		e.preventDefault();
		const {
			note_name,
			content,
			folder_id,
			author_id,
			noteUpdated,
			formValid
		} = this.state;
		if (formValid) {
			fetch(
				`http://localhost:8000/api/notes/${this.props.match.params.noteId}`,
				{
					method: 'PATCH',
					headers: {
						Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
						'content-type': 'application/json'
					},
					body: this.createJsonNoteObject({
						note_name,
						content,
						folder_id,
						author_id
					})
				}
			).then(() => {
				this.context.fetchNotes();
				this.setState({ successMessage: 'Note updated successfully' });
				setTimeout(() => {
					this.props.history.push('/');
				}, 1500);
			});
		} else {
			const msg = noteUpdated
				? 'Please complete form and try again.'
				: 'Please update the note.';
			this.setState({
				validationMessages: { form: `${msg}` }
			});
		}
	}

	createJsonNoteObject({ note_name, content, folder_id, author_id }) {
		const newNote = {
			note_name,
			folder_id,
			content,
			author_id,
			date_published: this.updateModifiedTimeStamp()
		};
		return JSON.stringify(newNote);
	}

	updateModifiedTimeStamp() {
		const date = new Date();
		return date.toISOString();
	}

	titleCase(str) {
		return str.replace(
			/\w\S*/g,
			txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
		);
	}

	updateNoteName(input) {
		const note_name = this.titleCase(input);
		this.setState(
			{ note_name, noteUpdated: true },
			this.validateNoteName(note_name)
		);
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
		this.setState({ content, noteUpdated: true }, () =>
			this.validateContent(content)
		);
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

	renderSelectOptions(folders) {
		let options;
		if (folders.length === 0) {
			options = <option value="">Loading...</option>;
		} else {
			options = folders.map(folder => (
				<option key={folder.id} value={folder.id}>
					{folder.folder_name}
				</option>
			));
			options.unshift(
				<option key="select" value="">
					Select a folder...
				</option>
			);
		}
		return options;
	}

	updateSelectedFolder(folder_id) {
		const validationMessages = this.state.validationMessages;
		validationMessages.form = '';
		validationMessages.folder_id = 'Please select a folder';
		folder_id
			? this.setState(
					{ folder_id, folderValid: true, noteUpdated: true },
					this.formValid
			  )
			: this.setState({ folderValid: false, validationMessages });
	}

	formValid() {
		const { nameValid, contentValid, folderValid } = this.state;
		this.setState({ formValid: nameValid && contentValid && folderValid });
	}

	render() {
		const { folders } = this.context;
		const {
			note_name,
			content,
			folder_id,
			nameValid,
			contentValid,
			folderValid,
			formValid,
			validationMessages,
			successMessage
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
						<textarea
							name="content"
							id="content"
							cols="30"
							rows="10"
							value={content}
							onChange={e => this.updateContent(e.target.value)}
						/>
						<ValidationError
							hasError={!contentValid}
							message={validationMessages.content}
						/>
					</div>

					<div>
						<select
							id="folder_id"
							value={folder_id}
							onChange={e => this.updateSelectedFolder(e.target.value)}
						>
							{this.renderSelectOptions(folders)}
						</select>
						<ValidationError
							hasError={!folderValid}
							message={validationMessages.folder_id}
						/>
					</div>
					<button type="submit">Update Note</button>
					<ValidationError
						hasError={!formValid}
						message={validationMessages.form}
					/>
				</form>
				<div>{successMessage}</div>
			</div>
		);
	}
}
