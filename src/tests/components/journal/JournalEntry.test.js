
import { mount } from 'enzyme';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store' //ES6 modules
//const { configureStore } = require('redux-mock-store') //CommonJS
import thunk from 'redux-thunk'; // middleware para acciones asincronas
import { activeNote } from '../../../actions/notes';
import { JournalEntry } from '../../../Components/journal/JournalEntry';

const middlewares = [thunk]
const mockStore = configureStore(middlewares);
const initState = {}
let store = mockStore(initState);
store.dispatch= jest.fn();

const newNote= {
    id: "12345",
    title:"hola",
    body:"mundo",
    date: Date.now()
}

const wrapper = mount( // cuando da el error del router, usa el memoryRouter para simular una ruta
    <Provider store= {store}>
        <JournalEntry {...newNote}/>
    </Provider>
);

describe('Prueba es <JournalEntry />', () => {
    
    test('Debe mostrarse correctamente ', () => {
         expect(wrapper).toMatchSnapshot()
    })
    

    test('Debe activar la nota', () => {
        
        wrapper.find('.journal__entry').simulate('click');


        expect(store.dispatch).toHaveBeenCalledWith(activeNote(newNote.id,{...newNote}));
    })
    
})
