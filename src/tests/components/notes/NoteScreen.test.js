import { mount } from 'enzyme';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store' //ES6 modules
//const { configureStore } = require('redux-mock-store') //CommonJS
import thunk from 'redux-thunk'; // middleware para acciones asincronas
import { activeNote } from '../../../actions/notes';
import { NoteScreen } from '../../../Components/notes/NoteScreen';

jest.mock('../../../actions/notes',() => {
    activeNote: jest.fn()
})

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
        active : {
            id: '1234',
            title: 'Hola',
            body: 'Mundo',
            date: Date.now()
        },
        notes: []
    }
 }
let store = mockStore(initState);
store.dispatch= jest.fn();




const wrapper = mount( // cuando da el error del router, usa el memoryRouter para simular una ruta
    <Provider store= {store}>
        <NoteScreen />
    </Provider>
);
describe('Pruebas en <NoteScreen />', () => {
    

    test('Debe mostrarse correctamente ', () => {
        
        expect(wrapper).toMatchSnapshot();
    })
    
})
