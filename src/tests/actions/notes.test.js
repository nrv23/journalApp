/**

* @jest-environment node // agregar esta documentacion para evitar el error de firestore

*/
import configureStore from 'redux-mock-store' //ES6 modules
//const { configureStore } = require('redux-mock-store') //CommonJS
import thunk from 'redux-thunk'; // middleware para acciones asincronas
import { starNewNote, startLoadingNotes, startSaveNote, startUploadingFile } from '../../actions/notes';
import { db } from '../../firebase/firebaseConfig';
import { fileUpload } from '../../helpers/fileUpload';
import { types } from '../../types';
import * as fs from 'fs';

jest.mock('../../helpers/fileUpload',() => ({ // crear un mock que simule la subida de archivos 
    fileUpload : jest.fn()  
}))

global.scrollTo = jest.fn(); 

const middlewares = [thunk]
const mockStore = configureStore(middlewares);

const initState = { // cargar un store
    auth: {
        uid: "Testing"
    },
    notes: {
        active: {
            id:"q3a9ddv06BKefl4egPyn",
            title: "title1",
            body: "body"
        }
    } 
}

let store = mockStore(initState) 



describe('Pruebas en el action de notes', () => {
    beforeEach(() => {
        store =  mockStore(initState) ;
    })
    
    //tests asincronos con las funciones de firebase y el dispatch de action ascrinonas de redux

    test('Debe crear una nueva nota en el startNewNote ',async () => {
        
        await store.dispatch(starNewNote() ); // disparar una accion asicrona pero como depende de firestore entonces se denegó la acció
        // de guardar la nota

        const actions = store.getActions();//obtener las acciones del store que se dispararon al ejecutar la prueba
        //validar que las acciones devuelven objetos con informacion que genera firestore
         expect(actions[0]).toEqual({
             type: types.NOTESACTIVE,
             payload: {
                title: '',
                body: '',
                date: expect.any(Number), // cualquier cosa de tipo number,
                id: expect.any(String) // cualquier cosa de tipo string
              }
      
         })

         expect(actions[1]).toEqual({
            type: types.NOTESADDNEW,
            payload: {
               title: '',
               body: '',
               date: expect.any(Number), // cualquier cosa de tipo number,
               id: expect.any(String) // cualquier cosa de tipo string ds
             }
     
        })

        //borrar registro despues de haberlo creado como prueba

        const {payload: {id}} = actions[0];

        await db.doc(`Testing/journal/notes/${id}`).delete();
    })


    test('Debe cargar todas las notas', async () => {


        await store.dispatch(startLoadingNotes('Testing'));

        const actions = store.getActions();


        expect(actions[0]).toEqual({
            type: types.NOTESLOAD,
            payload: expect.any(Array)
        });

        const expectedObject =  {
            id: expect.any(String),
            title: expect.any(String),
            body: expect.any(String),
            date: expect.any(Number)
        }
        //toMatchObject comparar que ambos objetos sean exactamente iguales
        expect(actions[0].payload[0]).toMatchObject(expectedObject);
    });

    test('startSaveNote debe actualizar la nota actual', async () => {

        const note = {
            id:"q3a9ddv06BKefl4egPyn",
            title: "title1",
            body: "body"
        }

        await store.dispatch(startSaveNote(note));

        const actions = store.getActions();
        
        expect(actions[0].type).toBe(types.NOTESUPDATED);

        const docRef = await db.doc(`Testing/journal/notes/${note.id}`).get();

        expect(docRef.data().title).toBe(note.title);
    })

    test('startUploading debe de actualizar la url del entry', async () => {
        fileUpload.mockReturnValue('https://hola-mundo.com')
        fs.writeFileSync('foto.jpg', '')
        const file = fs.readFileSync('foto.jpg')
        await store.dispatch(startUploadingFile(file));
 
        const docRef = await db.doc(`/Testing/journal/notes/${initState.notes.active.id}`).get()
        expect(docRef.data().url).toBe('https://hola-mundo.com')
    })    
})
