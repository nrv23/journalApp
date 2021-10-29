import React from 'react'
import { Link } from 'react-router-dom';
import { setError, unSetError } from '../../actions/ui';
import useForm from '../../hooks/useForm';
import { useSelector,useDispatch } from 'react-redux';
import { startRegisterWithEmailPasswordName } from '../../actions/auth';

export const RegisterScreen = () => {

   const dispatch = useDispatch()
    const { msgError} = useSelector(state => state.ui); //seleccionar un state del state global

    const [formValues,handleInputChange ] = useForm({
        name: '',
        email: '',
        password: '',
        confirm_password: ''
    });

    const { name,email,password,confirm_password } = formValues;
    const handleSubmit = e => {

        e.preventDefault();

        if(isFormValid()) {
            dispatch(startRegisterWithEmailPasswordName(email,password,name));
        }
    }

    const isFormValid = () => {

        const regex = /^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/; // probar en el proyecto del brete

        if(name.trim().length === 0) {
            dispatch(setError('Nombre es requerido'));
            return false;
        } else if(email.trim().length === 0 || !regex.test(email)) {
            dispatch(setError('Email no es válido'));

            return false;
        } else if(password.trim().length === 0 || confirm_password.trim().length === 0 || password.trim() !== confirm_password.trim()){
            dispatch(setError('Contraseña no es válida')); 
            return false;
        }

        dispatch(unSetError());

        return true
        
    }

    return (
        <>
            <h3 className="auth__title">Register</h3>

            <form

                onSubmit={handleSubmit}
            >

                {

                    msgError && <div className="alert alert-danger">{msgError}</div>
                }


                <input 
                    type="email" 
                    name="email" 
                    id=""  
                    placeholder="Tu email" 
                    className="auth__input" 
                    autoComplete="off" 
                    onChange={handleInputChange}
                    value={email}
                />

                <input 
                    type="text" 
                    name="name" 
                    id=""  
                    placeholder="Tu nombre" 
                    className="auth__input" 
                    autoComplete="off" 
                    onChange={handleInputChange}
                    value={name}
                />

                <input 
                    type="password" 
                    name="password" 
                    id=""  
                    placeholder="Tu password" 
                    className="auth__input"
                    onChange={handleInputChange}
                    value={password}
                />

                <input 
                    type="password" 
                    name="confirm_password" 
                    id=""  
                    placeholder="Confirmar Password" 
                    className="auth__input"
                    onChange={handleInputChange}
                    value={confirm_password}
                />

                <button 
                    type="submit"
                    className="btn btn-primary btn-block mb-5"
                >
                    Register
                </button>
                <Link to = {"/auth/login"} className="link">Login</Link>
            </form>

        </>
    )
}
