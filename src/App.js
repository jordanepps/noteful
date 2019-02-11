import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';

import STORE from './dummy-store';
import Heading from './Heading/Heading';
import Sidebar from './Sidebar/Sidebar';
import NotesFolder from './NotesFolder/NotesFolder';
import CurrentNote from './CurrentNote/CurrentNote';

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = { STORE };
	}
	render() {
		return (
			<div className="App">
				<Heading />
				<Sidebar folders={this.state.STORE.folders} />
				<Route
					path="/folder/:folderId"
					render={props => (
						<NotesFolder
							notesData={this.state.STORE}
							folderId={props.match.params.folderId}
						/>
					)}
				/>
				<Route
					path="/note/:noteId"
					render={props => (
						<CurrentNote
							notesData={this.state.STORE}
							noteId={props.match.params.noteId}
						/>
					)}
				/>
			</div>
		);
	}
}
