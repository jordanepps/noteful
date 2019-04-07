import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';

import NotesContext from '../NotesContext';
import Heading from '../Heading/Heading';
import HomePage from '../HomePage/HomePage';
import FolderPage from '../FolderPage/FolderPage';
import NotePage from '../NotePage/NotePage';
import AddNote from '../AddNote/AddNote';
import AddFolder from '../AddFolder/AddFolder';
import UpdateNote from '../UpdateNote/UpdateNote';

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = { notes: [], folders: [] };
	}

	componentDidMount() {
		this.fetchNoteData();
	}

	fetchNoteData() {
		const folderReq = fetch('http://localhost:8000/api/folders', {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`
			}
		});
		const noteReq = fetch('http://localhost:8000/api/notes', {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`
			}
		});
		Promise.all([folderReq, noteReq])
			.then(responses => Promise.all(responses.map(res => res.json())))
			.then(([folders, notes]) =>
				this.setState({
					folders,
					notes
				})
			);
	}

	handleDeleteNote(noteId) {
		this.setState({
			notes: this.state.notes.filter(note => note.id !== noteId)
		});
	}

	render() {
		const { notes, folders } = this.state;
		const contextValue = {
			notes,
			folders,
			deleteNote: () => {
				this.handleDeleteNote();
			},
			fetchNotes: () => {
				this.fetchNoteData();
			}
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
						<Route path="/add-note" component={AddNote} />
						<Route path="/add-folder" component={AddFolder} />
						<Route path="/update-note/:noteId" component={UpdateNote} />
					</Switch>
				</NotesContext.Provider>
			</div>
		);
	}
}
