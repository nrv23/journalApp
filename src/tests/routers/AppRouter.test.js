import { mount } from 'enzyme';

import {Provider} from 'react-redux';

import configureStore from 'redux-mock-store' //ES6 modules
//const { configureStore } = require('redux-mock-store') //CommonJS
import thunk from 'redux-thunk'; // middleware para acciones asincronas
import { MemoryRouter } from 'react-router-dom';
import { login } from '../../actions/auth';
import AppRouter  from '../../routers/AppRouter';
import { act } from '@testing-library/react';

import {firebase } from '../../firebase/firebaseConfig';
import Swal from 'sweetalert2';

//mock para sweetalert

jest.mock('sweetalert2', () => {

    fire: jest.fn()
})

jest.mock('../../actions/auth',() => ({
    login: jest.fn(),
}))


const middlewares = [thunk]
const mockStore = configureStore(middlewares);
const initState = {
    auth:{ },
    ui:{
        msgError: null,
        loading: false
    },
    notes: {
        active : {
            id: 12332

        },
        notes: []
    }
 }
let store = mockStore(initState);
store.dispatch= jest.fn();




describe('Pruebas en <AppRouter />', () => {
    

    test('Debe llamar el login si estoy autenticado ', async () => {
        let user = null;
       await act (async () => {

            const userCred = await firebase.auth().signInWithEmailAndPassword('test1@gmail.com','123456')
            user = userCred.user;

            const wrapper = mount( // cuando da el error del router, usa el memoryRouter para simular una ruta
                <Provider store= {store}>
                    <MemoryRouter> 
                        <AppRouter />
                    </MemoryRouter>
                </Provider>
            );
        })

         expect(login).toHaveBeenCalledWith('gPda4t87lHNEMCyPjeso5n6Tghp2',null);
    },6000)
})
