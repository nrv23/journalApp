import React from 'react';
import AppRouter from './routers/AppRouter';
import { Provider } from 'react-redux'; // este provider se comporta como el provider del contextAPI, 
// un hoc que rodea demas componentes y como tiene un store, ese store seria global en toda la aplicacion
import { store } from './store/store';

const App = () => {
    return ( 
        <Provider store={store}>
            <AppRouter />
        </Provider>
     );
}
 
export default App;