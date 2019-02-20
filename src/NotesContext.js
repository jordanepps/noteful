import { createContext } from 'react';

const NotesContext = createContext({
	notes: [],
	folders: [],
	deleteNote: () => {},
	fetchNotes: () => {}
});

export default NotesContext;
