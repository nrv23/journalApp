import React from 'react'
import { Link } from 'react-router-dom';
import useForm from '../../hooks/useForm';
import  { useDispatch,useSelector  } from 'react-redux';
import { startLoginEmailPassword,startGoogleLogin } from '../../actions/auth';


export const LoginScreen = () => {


    const dispatch = useDispatch();

    const {loading,msgError} = useSelector(state=>state.ui);
    console.log({msgError})
    const [formValues,handleInputChange] = useForm({
        email: '',
        password: ''
    });

    const handleSubmit = e => {
        
        e.preventDefault();
       
        
        dispatch(startLoginEmailPassword(email,password))
  
    }

    const handleGoogleSigning = () => {
        dispatch(startGoogleLogin())
    }

    const { email, password } = formValues;
    return (
        <>
            <h3 className="auth__title">Login</h3>

            <form
                onSubmit={handleSubmit}
            >

                {
                    msgError && <div className="alert alert-danger">{msgError}</div>
                }

                <input type="email" 
                    name="email" 
                    id=""  
                    placeholder="Tu email" 
                    className="auth__input"
                    autoComplete="off" 
                    value={email}
                    onChange={handleInputChange}
                />

                <input 
                    type="password" 
                    name="password" 
                    id=""  
                    placeholder="Tu password" 
                    className="auth__input"
                    value={password}
                    onChange={handleInputChange}
                />

                <button 
                    type="submit"
                    className="btn btn-primary btn-block"
                    disabled={loading}
                    
                >
                    Login
                </button>

                <div className="auth__social-networks">
                    <p>Login With Social Networks</p>

                    <div 
                        className="google-btn"
                        onClick={handleGoogleSigning}
                    >
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                        </div>
                        <p className="btn-text" >
                            <b>Sign in with google</b>
                        </p>
                    </div>
                </div>

                <Link to = {"/auth/register"} className="link">Register</Link>
            </form>

        </>
    )
}
