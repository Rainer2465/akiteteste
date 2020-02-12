import React from 'react';
import AdmUserNavBar from './screens/AdmUser/NavBar';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import ScreenUserNotas from './screens/User/Notas';
import ScreenAdmUserNotas from './screens/AdmUser/Notas';
import ScreenAdmUserLivros from './screens/AdmUser/Livros';
import ScreenAdmUserHome from './screens/AdmUser/Home';
import Login from './components/ui/Login';
import { isAuthenticated } from './services/auth';
import Register from './components/ui/Register';
import ScreenUserHome from './screens/User/Home';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        isAuthenticated() ? (
            <Component {...props} />
        ) : (

                <Redirect to={{ pathname: "/", state: { from: props.location } }} />
            )
    )}
    />
);

const Routes = () => (
    <BrowserRouter>

        <div className="container">
            <PrivateRoute path="/home" component={AdmUserNavBar} />
            <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/register" exact component={Register} />
                <PrivateRoute path="/home/livros" component={ScreenAdmUserLivros} />
                <PrivateRoute path="/home/notas" component={ScreenAdmUserNotas} />
                <PrivateRoute path="/home/nota" component={ScreenUserNotas} />
                <PrivateRoute path="/home/user" component={ScreenUserHome} />
                <PrivateRoute path="/home/texto" component={ScreenAdmUserHome} />

            </Switch>
        </div>
    </BrowserRouter>
);

export default Routes;