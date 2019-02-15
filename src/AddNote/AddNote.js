import React, { Component } from 'react';
import './AddNote.css';

import NotesContext from '../NotesContext';
import ValidationError from '../ValidationError/ValidationError';

export default class AddNote extends Component {
	static contextType = NotesContext;
	constructor(props) {
		super(props);
		this.state = {
			title: '',
			body: '',
			selectedFolder: '',
			titleValid: false,
			bodyValid: false,
			folderValid: false,
			formValid: false,
			validationMessages: {
				title: '',
				body: '',
				selectedFolder: ''
			}
		};
	}

	handleFormSubmit(e) {
		e.preventDefault();
		console.log(this.state.formValid);
		// fetch('http://localhost:9090/notes', {})
	}

	updateTitle(title) {
		this.setState({ title }, () => this.validateTitle(title));
	}

	updateBody(body) {
		this.setState({ body }, () => this.validateBody(body));
	}

	updateSelectedFolder(selectedFolder) {
		const validationMessages = this.state.validationMessages;
		validationMessages.selectedFolder = 'Please select a folder';
		selectedFolder
			? this.setState({ selectedFolder, folderValid: true }, this.formValid)
			: this.setState({ folderValid: false, validationMessages });
	}

	validateTitle(title) {
		const validationMessages = this.state.validationMessages;
		let hasError = false;
		if (title.length === 0) {
			validationMessages.title = 'Title is required';
			hasError = !hasError;
		} else if (title.length < 3) {
			validationMessages.title = 'Title has to be 3 or more characters';
			hasError = !hasError;
		}
		this.setState(
			{ validationMessages, titleValid: !hasError },
			this.formValid
		);
	}

	validateBody(body) {
		const validationMessages = this.state.validationMessages;
		let hasError = false;
		if (body.length === 0) {
			validationMessages.body = 'Body cannot be empty';
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
						<label htmlFor="title">Note Title: </label>
						<input
							type="text"
							id="title"
							onChange={e => this.updateTitle(e.target.value)}
						/>
						<ValidationError
							hasError={!titleValid}
							message={validationMessages.title}
						/>
					</div>

					<div>
						<label htmlFor="body">Note Body: </label>
						<input
							type="text"
							id="body"
							onChange={e => this.updateBody(e.target.value)}
						/>
						<ValidationError
							hasError={!bodyValid}
							message={validationMessages.body}
						/>
					</div>

					<div>
						<select
							id="selectedFolder"
							onChange={e => this.updateSelectedFolder(e.target.value)}
						>
							{this.renderSelectOptions(folders)}
						</select>
						<ValidationError
							hasError={!folderValid}
							message={validationMessages.selectedFolder}
						/>
					</div>

					<button type="submit">Add Note</button>
				</form>
			</div>
		);
	}
}
