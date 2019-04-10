import React, { Component } from 'react';
import './AddFolder.css';
import config from '../config';
import NotesContext from '../NotesContext';
import ValidationError from '../ValidationError/ValidationError';

export default class AddFolder extends Component {
	static contextType = NotesContext;
	constructor(props) {
		super(props);
		this.state = {
			folder_name: '',
			nameValid: false,
			formValid: false,
			validationMessage: '',
			formValidationMessage: '',
			successMessage: ''
		};
	}

	handleFormSubmit(e) {
		e.preventDefault();
		if (this.state.formValid) {
			const folder_name = this.state.folder_name;
			fetch(`${config.API_ENDPOINT}/api/folders`, {
				method: 'post',
				headers: {
					Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
					'content-type': 'application/json'
				},
				body: JSON.stringify({ folder_name })
			})
				.then(res => res.json())
				.then(() => {
					this.context.fetchNotes();
					this.setState({ successMessage: 'Folder added successfully!' });
					setTimeout(() => {
						this.props.history.push('/');
					}, 1500);
				});
		} else {
			this.setState({ formValidationMessage: 'Please enter a folder name' });
		}
	}

	titleCase(str) {
		return str.replace(
			/\w\S*/g,
			txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
		);
	}

	updateFolderName(input) {
		const folder_name = this.titleCase(input);
		this.setState({ folder_name }, () => this.validateFolderName(folder_name));
	}

	validateFolderName(name) {
		let validationMessage = this.state.validationMessage;
		let hasError = false;
		const currentFolders = this.getCurrentFolderNames();
		const doesFolderExist = currentFolders.find(folder => folder === name);
		if (name.length === 0) {
			validationMessage = 'Folder name is required';
			hasError = !hasError;
		} else if (doesFolderExist) {
			validationMessage = 'Folder name already exists. Please choose another';
			hasError = !hasError;
		}
		this.setState({
			validationMessage,
			nameValid: !hasError,
			formValid: !hasError,
			formValidationMessage: ''
		});
	}

	getCurrentFolderNames() {
		return this.context.folders.map(folder => folder.name);
	}

	render() {
		const {
			nameValid,
			formValid,
			validationMessage,
			formValidationMessage,
			successMessage
		} = this.state;
		this.getCurrentFolderNames();
		return (
			<div>
				<form onSubmit={e => this.handleFormSubmit(e)}>
					<div>
						<label htmlFor="folder-name">New Folder Name: </label>
						<input
							type="text"
							id="folder-name"
							onChange={e => this.updateFolderName(e.target.value)}
						/>
						<ValidationError
							hasError={!nameValid}
							message={validationMessage}
						/>
					</div>
					<button type="submit">Add Folder</button>
					<ValidationError
						hasError={!formValid}
						message={formValidationMessage}
					/>
				</form>
				<div>{successMessage}</div>
			</div>
		);
	}
}
