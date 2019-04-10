import React, { Component } from 'react';
import './AddNote.css';

import config from '../config';
import NotesContext from '../NotesContext';
import ValidationError from '../ValidationError/ValidationError';

export default class AddNote extends Component {
	static contextType = NotesContext;
	constructor(props) {
		super(props);
		this.state = {
			note_name: '',
			content: '',
			folder_id: '',
			author_id: 1,
			titleValid: false,
			bodyValid: false,
			folderValid: false,
			formValid: false,
			successMessage: '',
			validationMessages: {
				note_name: '',
				content: '',
				folder_id: '',
				form: ''
			}
		};
	}

	handleFormSubmit(e) {
		e.preventDefault();
		const { note_name, content, folder_id, author_id, formValid } = this.state;
		if (formValid) {
			fetch(`${config.API_ENDPOINT}/api/notes`, {
				method: 'POST',
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
			})
				.then(res => res.json())
				.then(() => {
					this.context.fetchNotes();
					this.setState({ successMessage: 'Note added successfully' });
					setTimeout(() => {
						this.props.history.push('/');
					}, 1500);
				});
		} else {
			this.setState({
				validationMessages: { form: 'Please complete form and try again.' }
			});
		}
	}

	//TODO:Show success message on the home page for update and new note

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

	updateTitle(input) {
		const note_name = this.titleCase(input);
		this.setState({ note_name }, () => this.validateTitle(note_name));
	}

	updateBody(content) {
		this.setState({ content }, () => this.validateBody(content));
	}

	updateSelectedFolder(folder_id) {
		const validationMessages = this.state.validationMessages;
		validationMessages.form = '';
		validationMessages.folder_id = 'Please select a folder';
		folder_id
			? this.setState({ folder_id, folderValid: true }, this.formValid)
			: this.setState({ folderValid: false, validationMessages });
	}

	validateTitle(note_name) {
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
		this.setState(
			{ validationMessages, titleValid: !hasError },
			this.formValid
		);
	}

	validateBody(content) {
		const validationMessages = this.state.validationMessages;
		validationMessages.form = '';
		let hasError = false;
		if (content.length === 0) {
			validationMessages.content = 'Body cannot be empty';
			hasError = !hasError;
		}
		this.setState({ validationMessages, bodyValid: !hasError }, this.formValid);
	}

	formValid() {
		const { titleValid, bodyValid, folderValid } = this.state;
		this.setState({ formValid: titleValid && bodyValid && folderValid });
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

	render() {
		const { folders } = this.context;
		const {
			titleValid,
			bodyValid,
			folderValid,
			formValid,
			successMessage,
			validationMessages
		} = this.state;
		return (
			<div>
				<form onSubmit={e => this.handleFormSubmit(e)}>
					<div>
						<label htmlFor="note_name">Note Title: </label>
						<input
							type="text"
							id="note_name"
							onChange={e => this.updateTitle(e.target.value)}
						/>
						<ValidationError
							hasError={!titleValid}
							message={validationMessages.note_name}
						/>
					</div>

					<div>
						<label htmlFor="content">Note Body: </label>
						<input
							type="text"
							id="content"
							onChange={e => this.updateBody(e.target.value)}
						/>
						<ValidationError
							hasError={!bodyValid}
							message={validationMessages.content}
						/>
					</div>

					<div>
						<select
							id="folder_id"
							onChange={e => this.updateSelectedFolder(e.target.value)}
						>
							{this.renderSelectOptions(folders)}
						</select>
						<ValidationError
							hasError={!folderValid}
							message={validationMessages.folder_id}
						/>
					</div>

					<button type="submit">Add Note</button>
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
