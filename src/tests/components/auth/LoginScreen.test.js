import { mount } from 'enzyme';
import { LoginScreen } from '../../../Components/auth/LoginScreen';
import {Provider} from 'react-redux';

import configureStore from 'redux-mock-store' //ES6 modules
//const { configureStore } = require('redux-mock-store') //CommonJS
import thunk from 'redux-thunk'; // middleware para acciones asincronas
import { MemoryRouter } from 'react-router-dom';
import { startGoogleLogin,startLoginEmailPassword } from '../../../actions/auth';

jest.mock('../../../actions/auth',() => ({
    startGoogleLogin: jest.fn(),
    startLoginEmailPassword: jest.fn()
}))


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
store.dispatch= jest.fn();


const wrapper = mount( // cuando da el error del router, usa el memoryRouter para simular una ruta
    <Provider store= {store}>
        <MemoryRouter> 
            <LoginScreen />
        </MemoryRouter>
    </Provider>
);

describe('Pruebas en <LoginScreen />', () => {
    
    beforeEach(() => {
        store =  mockStore(initState) ;
        jest.clearAllMocks();
    })


    test('Cargar bien el compoente', () => {

         expect(wrapper).toMatchSnapshot();
    })
    
    test('Deebe disparar la accion de startLoginScreen', () => {
        
       
        const btn = wrapper.find('.google-btn');

        btn.simulate('click');

        expect(startGoogleLogin).toHaveBeenCalled();

    })
    
    test('Debe disparar el startLogin con los respectivos argumentos', () => {
           
        const btn = wrapper.find('form');

        btn.simulate('submit',{preventDefault:() => {}}); 
        expect(startLoginEmailPassword).toHaveBeenCalled();

    })
    
})
