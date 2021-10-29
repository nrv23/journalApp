import React from 'react';
import { Redirect, Route } from 'react-router-dom';

export const PrivateRoute = ({isAutenticated,component:Component, ...rest}) => {
    //grabar la ultima ruta visitada en el localStorage 

    return (
        <Route {...rest}

            component = {
                    (props) => (
                        isAutenticated 
                            ? <Component {...props} /> // le estoy pasando las props que vienen del componente route paraque retorne como una ruta
                            : <Redirect to="/auth/login" />
                    ) // los props de la propiedad component retornan el estado anterior
                }
            
        />
    )
}
