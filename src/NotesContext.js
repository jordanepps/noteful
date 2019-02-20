import { createContext } from 'react';

const NotesContext = createContext({
	notes: [],
	folders: [],
	deleteNote: () => {},
	fetchNotes: () => {},
	toTitleCase: () => {}
});

export default NotesContext;
