import { createContext } from 'react';

const NotesContext = createContext({
	notes: [],
	folders: [],
	deleteNote: () => {}
});

export default NotesContext;
