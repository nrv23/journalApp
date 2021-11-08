import { mount } from 'enzyme';

import {Provider} from 'react-redux';

import configureStore from 'redux-mock-store' //ES6 modules
//const { configureStore } = require('redux-mock-store') //CommonJS
import thunk from 'redux-thunk'; // middleware para acciones asincronas
import { MemoryRouter } from 'react-router-dom';
import {RegisterScreen} from '../../../Components/auth/RegisterScreen'
import { types } from '../../../types';



const middlewares = [thunk]
const mockStore = configureStore(middlewares);
const initState = {
    auth:{ },
    ui:{
        msgError: null,
        loading: false
    }
 }
let store = mockStore(initState);
//store.dispatch= jest.fn();

const wrapper = mount( // cuando da el error del router, usa el memoryRouter para simular una ruta
    <Provider store= {store}>
        <MemoryRouter> 
            <RegisterScreen />
        </MemoryRouter>
    </Provider>
);

describe('Pruebas en <RegisterScreen >', () => {
    
    test('Debe cargar bien el componente', () => {

         expect(wrapper).toMatchSnapshot()
    });

    test('Deebe hacer el dispatch de la accion respectiva', () => {

        const emailField = wrapper.find('input[name="email"]')

        emailField.simulate('change',{
            target: {
                value: 'prueba@hotmail.com',
                name: 'email'
            }
        })

        wrapper.find('form').simulate('submit',{
            preventDefault(){}
        });
        
        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: types.UISETERROR,
            payload: expect.any(String)
        })
    }) 
    
    test('Debe mostrar la caja con el error', () => {
        
        const initState = {
            auth:{ },
            ui:{
                msgError: 'Nombre es requerido',
                loading: false
            }
         }
        let store = mockStore(initState);
        //store.dispatch= jest.fn();
        
        const wrapper = mount( // cuando da el error del router, usa el memoryRouter para simular una ruta
            <Provider store= {store}>
                <MemoryRouter> 
                    <RegisterScreen />
                </MemoryRouter>
            </Provider>
        );

        expect(wrapper.find("#error").text()).toBe(initState.ui.msgError)

    })
    
})
