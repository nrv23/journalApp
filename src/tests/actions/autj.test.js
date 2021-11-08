import { login, logout, startLoginEmailPassword, startLogout } from "../../actions/auth";
import { types } from "../../types";

/**

* @jest-environment node // agregar esta documentacion para evitar el error de firestore

*/
import configureStore from 'redux-mock-store' //ES6 modules
//const { configureStore } = require('redux-mock-store') //CommonJS
import thunk from 'redux-thunk'; // middleware para acciones asincronas


const middlewares = [thunk]
const mockStore = configureStore(middlewares);
const initState = { }

let store = mockStore(initState) 

describe('Pruebas con acciones de auth', () => {
    beforeEach(() => {
        store =  mockStore(initState) ;
    })
    test('Login y logout deben de crear la accion respectiva', () => {

        const uid = '1234';
        const displayName="hola";

        const loginAction = login(uid,displayName);
        const logoutAction = logout();


         expect(loginAction).toEqual({
             type: types.LOGIN,
             payload: {
                 uid,
                 displayName
             }
         })

         expect(logoutAction).toEqual({
             type: types.LOGOUT
         })
    })   
    
    test('Debe realizar el startLogout', async () => {
        
        await store.dispatch(startLogout());

        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: types.LOGOUT
        })

        expect(actions[1]).toEqual({
            type: types.NOTESLOGOUTCLEANING
        })
    })
    
    test('Debe realizar el startLoginEmailAndPassword', async () => {
        
        await store.dispatch(startLoginEmailPassword('test1@gmail.com','123456'));

        const actions = store.getActions();

        expect(actions[0]).toEqual( {
            type: types.UISTARTLOADING,
            payload: true
        })

        expect(actions[1]).toEqual( {
            type: types.LOGIN,
            payload: {
                uid: expect.any(String),
                displayName: actions[1].payload.displayName ? expect.any(String): null
            }
        })
    },8000)
    
})
