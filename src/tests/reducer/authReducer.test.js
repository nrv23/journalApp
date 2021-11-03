import { authReducer } from "../../reducers/authReducer";
import { types } from "../../types";

describe('Pruebas en authReducer', () => {
    
    test('Devolver informacion para login', () => {
        
        const state = authReducer({},{type: types.LOGIN,payload: {uid:1234,displayName:'nvm23'}});

         expect(state).toEqual({uid:1234,name:'nvm23'})
    })

    test('Devolver objeto vacio para logout', () => {
        const state = authReducer({uid:1234,displayName:'nvm23'},{type: types.LOGOUT });

         expect(state).toEqual({});
    })
    
    test('Devolver state por default', () => {
        const state = authReducer({uid:1234,displayName:'nvm23'},{type: 'otracosa' });
        expect(state).toEqual({uid:1234,displayName:'nvm23'});
    })
    
    
})
