import { Route } from 'react-router';
import Layout from './components/Layout';
import Login from './components/Login';
import Registration from './components/Registration';

export default (
    <Route>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Registration} />
    </Route>
);