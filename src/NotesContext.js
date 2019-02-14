import { createContext } from 'react';

const NotesContext = createContext({
	notes: null,
	folders: null
});

export default NotesContext;
