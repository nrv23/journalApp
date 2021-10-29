import { db } from '../firebase/firebaseConfig';
import { loadNotes } from '../helpers/loadNotes';
import { types } from '../types';

export const starNewNote = () =>  {

    return async (dispatch,getState) => { // el segundo parámetro del callback que devuelve la funcion asincrona, es una funcion
        // que devuelve todo el state global actual
        try {
            
            const { auth:{uid}  } = getState();

            const newNote = {

                title: '',
                body: '',
                date: new Date().getTime()
            }

            const docRef = await db.collection(`${uid}/journal/notes`).add(newNote);
            dispatch(activeNote(docRef.id,newNote));
        } catch (error) {
            console.log(error)
        }
    }
}

export const activeNote = (id,note) => {

    return {
        type: types.NOTESACTIVE,
        payload: {
            ...note,
            id
        }
    }
}

export const startLoadingNotes = (uid) => {

    return async dispatch => { // redux-thunk permite la ejecucion de dispatchs asincronos
        const notes = await loadNotes(uid);

        dispatch(setNotes(notes));
    }
}

export const setNotes = notes => ({
    type: types.NOTESLOAD,
    payload: notes
})