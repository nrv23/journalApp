import  { firebase,googleAuthProvider } from '../firebase/firebaseConfig';
import { types } from '../types/index';
import { clearNotes } from './notes';
import { startLoading,finishLoading, setError,unSetError } from './ui';


export const startLoginEmailPassword = (email, pass) => {
    
    return dispatch => { // retornar un callback para ejecutar un action asincrono
        dispatch(startLoading());
        firebase.auth().signInWithEmailAndPassword(email,pass).then(({user:{uid,displayName}}) => {
            dispatch(login(uid,displayName))
            dispatch(finishLoading());
            dispatch(unSetError());
        })
        .catch(e => {
            dispatch(finishLoading());
            console.log(e.code)

            if(e.code === 'auth/invalid-email'|| e.code === 'auth/wrong-password') { 
                dispatch(setError('Credenciales incorrectos'))
            } else {

                dispatch(setError("Hubo un error en el login"));
            }

        })
    }
}

export const login = (uid, displayName) => {

    return {
        type: types.LOGIN,
        payload: {
            uid,
            displayName
        }
    }
}

export const startGoogleLogin = () => {


    return dispatch => {
        firebase.auth().signInWithPopup(googleAuthProvider)
        .then(({user:{uid,displayName}}) => {
            dispatch(login(uid,displayName))
        })
    }
}

export const startRegisterWithEmailPasswordName = (email,password,name) => {

    return dispatch => {

        firebase.auth().createUserWithEmailAndPassword(email,password)
            .then(async ({user}) => {

                await user.updateProfile({displayName: name});
                dispatch(login(user.uid,user.displayName))
            })
            .catch(e => {
                console.log(e.code)
            })
    }

}

export const startLogout = () => {

    return async dispatch => {

        await firebase.auth().signOut();
        dispatch(logout());
        dispatch(clearNotes());
    }
}

export const logout = () => {

    return {
        type: types.LOGOUT
    }
}