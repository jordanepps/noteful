import React, { Component } from 'react';
import './AddFolder.css';

import NotesContext from '../NotesContext';
import ValidationError from '../ValidationError/ValidationError';

export default class AddFolder extends Component {
	static contextType = NotesContext;
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			nameValid: false,
			validationMessage: ''
		};
	}

	handleFormSubmit(e) {
		e.preventDefault();
		// const name = this.state.name;
		// fetch('http://localhost:9090/folders', {
		// 	method: 'post',
		// 	headers: {
		// 		'content-type': 'application/json'
		// 	},
		// 	body: JSON.stringify({ name })
		// }).then(res => console.log(res.json()));
	}

	titleCase(string) {
		let splitStr = string.toLowerCase().split(' ');
		//TODO: Create function that capitalizes the first word
		return splitStr;
	}

	updateFolderName(name) {
		const newName = this.titleCase(name);
		console.log(newName);
		this.setState({ name }, () => this.validateFolderName(name));
	}

	validateFolderName(name) {
		let validationMessage = this.state.validationMessage;
		let hasError = false;
		// const currentFolders = this.getCurrentFolderNames();
		//TODO:Check if an a folder exists with the same name
		// console.log(currentFolders.find(folder => folder === name));
		if (name.length === 0) {
			validationMessage = 'Folder name is required';
			hasError = !hasError;
		}
		this.setState({ validationMessage, nameValid: !hasError });
	}

	getCurrentFolderNames() {
		return this.context.folders.map(folder => folder.name);
	}

	render() {
		const { nameValid, validationMessage } = this.state;
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
				</form>
			</div>
		);
	}
}
