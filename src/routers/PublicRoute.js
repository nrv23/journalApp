import React from 'react';
import { Redirect, Route } from 'react-router-dom';

export const PublicRoute = ({isAutenticated,component:Component, ...rest}) => {
    return (
        <Route {...rest}

            component = {
                    (props) => (
                        !isAutenticated 
                            ? <Component {...props} /> // le estoy pasando las props que vienen del componente route paraque retorne como una ruta
                            : <Redirect to="/" />
                    ) // los props de la propiedad component retornan el estado anterior
                }
            
        />
    )
}
