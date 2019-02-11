import React from 'react';
import { Link } from 'react-router-dom';
import './Heading.css';

export default function Heading() {
	return (
		<header>
			<h1>
				<Link to="/">Noteful</Link>
			</h1>
		</header>
	);
}
