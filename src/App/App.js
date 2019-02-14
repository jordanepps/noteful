import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';

import NotesContext from '../NotesContext';
import Heading from '../Heading/Heading';
import HomePage from '../HomePage/HomePage';
import FolderPage from '../FolderPage/FolderPage';
import NotePage from '../NotePage/NotePage';

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = { notes: [], folders: [] };
	}

	componentDidMount() {
		fetch('http://localhost:9090/folders')
			.then(res => res.json())
			.then(folders => this.setState({ folders }));
		fetch('http://localhost:9090/notes')
			.then(res => res.json())
			.then(notes => this.setState({ notes }));
	}

	handleDeleteNote = noteId => {
		this.setState({
			notes: this.state.notes.filter(note => note.id !== noteId)
		});
	};

	render() {
		const { notes, folders } = this.state;
		const contextValue = {
			notes,
			folders,
			deleteNote: this.handleDeleteNote
		};
		return (
			<div className="App">
				<Heading />
				<NotesContext.Provider value={contextValue}>
					<Switch>
						<Route exact path="/" component={HomePage} />
						<Route
							path="/folder/:folderId"
							render={props => <FolderPage {...props} />}
						/>
						<Route
							path="/note/:noteId"
							render={props => <NotePage {...props} />}
						/>
					</Switch>
				</NotesContext.Provider>
			</div>
		);
	}
}
