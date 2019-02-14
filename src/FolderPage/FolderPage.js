import React, { Component, Fragment } from 'react';
import './FolderPage.css';

import Sidebar from '../Sidebar/Sidebar';
import NoteTabContainer from '../NoteTabContainer/NoteTabContainer';

export default class FolderPage extends Component {
	render() {
		const currentFolderId = this.props.match.params.folderId;
		return (
			<Fragment>
				<Sidebar currentFolder={currentFolderId} />
				<NoteTabContainer
					currentFolder={currentFolderId}
					history={this.props.history}
				/>
			</Fragment>
		);
	}
}
