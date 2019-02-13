import React, { Component, Fragment } from 'react';
import './HomePage.css';

import Sidebar from '../Sidebar/Sidebar';
import NoteTabContainer from '../NoteTabContainer/NoteTabContainer';

export default class HomePage extends Component {
	render() {
		return (
			<Fragment>
				<Sidebar />
				<NoteTabContainer />
			</Fragment>
		);
	}
}
