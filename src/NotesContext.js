import { createContext } from 'react';

const NotesContext = createContext({
	notes: [],
	folders: []
});

export default NotesContext;
