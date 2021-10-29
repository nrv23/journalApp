import { createStore,combineReducers,applyMiddleware,compose } from 'redux';
import { authReducer } from '../reducers/authReducer';
import thunk from 'redux-thunk';
import { uiReducer } from '../reducers/uiReducer';
import { notesReducer } from '../reducers/notesReducer';

//configuracion para activar redux dev tools y utilizar middlewares en redux

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const reducer= combineReducers({ // todos los reducers deben estar dentro de combineReducer para poder crear el store
    auth: authReducer,
    ui: uiReducer,
    notes: notesReducer
});

export const store = createStore(
    reducer,
    composeEnhancers(
        applyMiddleware(thunk)
    )
); // recibe solamente 1 o muchos combinados en uno