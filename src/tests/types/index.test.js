import { types } from "../../types"

const typesTst = {
    LOGIN : '[Auth] LOGIN',
    LOGOUT : '[Auth] LOGOUT',
    UISETERROR : '[UI] SET ERROR',
    UIUNSETERROR : '[UI] UNSET ERROR',
    UISTARTLOADING : '[UI] STAR LOADING',
    UIFINISHLOADING : '[UI] FINISH LOADING',

    NOTESADDNEW: '[NOTES] NEW NOTE',
    NOTESACTIVE: '[NOTES] SET NOTE ACTIVE',
    NOTESLOAD: '[NOTES] LOAD NOTES',
    NOTESUPDATED: '[NOTES] UPDATE NOTE',
    NOTEFILEURL: '[NOTES] UPDATED IMAGE URL',
    NOTEDELETE: '[NOTES] DELETED NOTE',
    NOTESLOGOUTCLEANING: '[NOTES] LOGOUT CLEANING',
}

describe('Pruebas en types', () => {
    
    test('Debe cargar correctamente el objeto types', () => {

         expect(types).toEqual(typesTst);
    })
    
})
