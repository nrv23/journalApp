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
    
        default:
            return state;
    }
}