import { types } from "../types";

const initialState = {
    notes: [],
    active: null // nota active o seleccionada
}

export const notesReducer = (state = initialState,action) => {

    switch (action.type) {
        
        case types.NOTESACTIVE:
            return {
                ...state,
                active: {
                    ...action.payload
                }
            }
        case types.NOTESLOAD: 
            return {
                ...state,
                notes: action.payload
            }
        case types.NOTESUPDATED:
            return {
                ...state,
                active: state.notes.map(note => 
                    note.id === action.payload.id
                    ? action.payload.note
                    : note
                )[0],
                notes: state.notes.map(note => 
                    note.id === action.payload.id
                    ? action.payload.note
                    : note
                )
            }
        case types.NOTEDELETE:
            return {
                ...state,
                active: null,
                notes: state.notes.filter(note => note.id !== action.payload)       
            }
        case types.NOTESLOGOUTCLEANING:
            return {
                ...state,
                active: null,
                notes: []
            }
        case types.NOTESADDNEW:
            return {
                ...state,
                notes: [action.payload, ...state.notes]
            }   
        default:
            return state;
    }
}