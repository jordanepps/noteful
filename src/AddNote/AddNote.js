import React, { Component } from 'react';
import './AddNote.css';

import NotesContext from '../NotesContext';
import ValidationError from '../ValidationError/ValidationError';

export default class AddNote extends Component {
	static contextType = NotesContext;
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			content: '',
			folderId: '',
			titleValid: false,
			bodyValid: false,
			folderValid: false,
			formValid: false,
			validationMessages: {
				name: '',
				content: '',
				folderId: ''
			}
		};
	}

	//TODO:Let user know if addNote was successful or not
	//TODO:add a error catch if user submits with missing input

	handleFormSubmit(e) {
		e.preventDefault();
		const { name, content, folderId } = this.state;
		fetch('http://localhost:9090/notes', {
			method: 'POST',
			headers: {
				'content-type': 'application/json'
			},
			body: this.createJsonNoteObject({ name, content, folderId })
		})
			// .then(() => {
			// 	throw new Error('Something went wrong');
			// })
			.then(res => res.json())
			.then(() => {
				this.context.fetchNotes();
				this.props.history.push('/');
			});
	}

	createJsonNoteObject({ name, content, folderId }) {
		const newNote = {
			// name,
			folderId,
			content,
			modified: this.updateModifiedTimeStamp()
		};
		return JSON.stringify(newNote);
	}

	updateModifiedTimeStamp() {
		const date = new Date();
		return date.toISOString();
	}

	updateTitle(name) {
		this.setState({ name }, () => this.validateTitle(name));
	}

	updateBody(content) {
		this.setState({ content }, () => this.validateBody(content));
	}

	updateSelectedFolder(folderId) {
		const validationMessages = this.state.validationMessages;
		validationMessages.folderId = 'Please select a folder';
		folderId
			? this.setState({ folderId, folderValid: true }, this.formValid)
			: this.setState({ folderValid: false, validationMessages });
	}

	validateTitle(name) {
		const validationMessages = this.state.validationMessages;
		let hasError = false;
		if (name.length === 0) {
			validationMessages.name = 'Title is required';
			hasError = !hasError;
		} else if (name.length < 3) {
			validationMessages.name = 'Title has to be 3 or more characters';
			hasError = !hasError;
		}
		this.setState(
			{ validationMessages, titleValid: !hasError },
			this.formValid
		);
	}

	validateBody(content) {
		const validationMessages = this.state.validationMessages;
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
					{folder.name}
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
			validationMessages
		} = this.state;
		return (
			<div>
				<form onSubmit={e => this.handleFormSubmit(e)}>
					<div>
						<label htmlFor="name">Note Title: </label>
						<input
							type="text"
							id="name"
							onChange={e => this.updateTitle(e.target.value)}
						/>
						<ValidationError
							hasError={!titleValid}
							message={validationMessages.name}
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
							id="folderId"
							onChange={e => this.updateSelectedFolder(e.target.value)}
						>
							{this.renderSelectOptions(folders)}
						</select>
						<ValidationError
							hasError={!folderValid}
							message={validationMessages.folderId}
						/>
					</div>

					<button type="submit">Add Note</button>
				</form>
			</div>
		);
	}
}
