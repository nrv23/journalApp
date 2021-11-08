import { setError,unSetError,startLoading,finishLoading } from '../../actions/ui';
import { types } from '../../types';

describe('Pruebas en ui action', () => {
    //test en actions que son sincronas
    test('Todas las acciones deben de crearse', () => {
        
        const setErrorAction = setError('Error');

        expect(setErrorAction).toEqual({
            type: types.UISETERROR,
            payload: 'Error'
        })

        const unSetErrorAction = unSetError();

        expect(unSetErrorAction).toEqual( {
            type: types.UIUNSETERROR
        })

        const startLoadingAction = startLoading();

        expect(startLoadingAction).toEqual( {
            type: types.UISTARTLOADING,
            payload: true
        });

        const finishLoadingAction = finishLoading();
        expect(finishLoadingAction).toEqual( {
            type: types.UISTARTLOADING,
            payload: false
        })
    })
})
