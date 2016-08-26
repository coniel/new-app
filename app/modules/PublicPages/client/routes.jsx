import { Route } from 'react-router';
import Home from './components/Home';
import Layout from './components/Layout';

export default (
    <Route component={Layout}>
        <Route path="/" component={Home} onEnter={(nextState, replaceState) => {
            if (Meteor.userId()) {
                replaceState('/dashboard');
            }
        }} />
    </Route>
);