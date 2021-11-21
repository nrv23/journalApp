import { mount } from 'enzyme';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store' //ES6 modules
//const { configureStore } = require('redux-mock-store') //CommonJS
import thunk from 'redux-thunk'; // middleware para acciones asincronas
import { logout,startLogout } from '../../../actions/auth';
import { starNewNote } from '../../../actions/notes';
import { Sidebar } from '../../../Components/journal/Sidebar';

jest.mock('../../../actions/auth',() => ({
    startLogout: jest.fn(),
}))


jest.mock('../../../actions/notes',() => ({
    starNewNote: jest.fn(),
}))


const middlewares = [thunk]
const mockStore = configureStore(middlewares);
const initState = {
    auth:{

        uid: '1',
        name: "Testing"
     },
    ui:{
        msgError: null,
        loading: false
    },
    notes: {
        active : null,
        notes: []
    }
 }
let store = mockStore(initState);
store.dispatch= jest.fn();




const wrapper = mount( // cuando da el error del router, usa el memoryRouter para simular una ruta
    <Provider store= {store}>
        <Sidebar />
    </Provider>
);


describe('Pruebas en <Sidebar />', () => {
    
    test('debe mostrarse correctamente', () => {
        
         expect(wrapper).toMatchSnapshot();
    })

    test('Debe llamar el logout', () => {
        
        wrapper.find('button').simulate('click');


        expect(startLogout).toHaveBeenCalled();
    })
    
    
    test('Debe de llamar startNewNote', () => {
        wrapper.find('.journal__new-entry').simulate('click');

        expect(starNewNote).toHaveBeenCalled()
    })

})
