import { useEffect,useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Redirect
} from 'react-router-dom';
import { JournalScreen } from '../Components/journal/JournalScreen';
import { AuthRouter } from './AuthRouter';
import { firebase } from '../firebase/firebaseConfig';
import { useDispatch } from 'react-redux';
import { login } from '../actions/auth';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { startLoadingNotes } from '../actions/notes';

const AppRouter = () => {

    const dispatch = useDispatch();
    const [checking, setChecking] = useState(true);
    const [isLogeedIn, setisLogeedIn] = useState(false);
    useEffect(() => {
        firebase.auth().onAuthStateChanged(async (user) => { // mantener la sesion activa

            if(user?.uid){
                dispatch(login(user.uid,user.displayName));
                setisLogeedIn(true)
                dispatch(startLoadingNotes(user.uid))

            } else {
                setisLogeedIn(false);
            }
            setChecking(false);
            
        });
    }, [dispatch,setChecking,setisLogeedIn])

    if(checking) return <h1>Espere...</h1>;

    return ( 

        <Router>
            <div>
                <Switch>
                    <PublicRoute path="/auth" component={AuthRouter}  isAutenticated={isLogeedIn}/>
                    <PrivateRoute exact path="/" component={JournalScreen} isAutenticated={isLogeedIn} />
                    <Redirect to="/auth/login" />
                </Switch>
            </div>
        </Router>
     );
}
 
export default AppRouter;