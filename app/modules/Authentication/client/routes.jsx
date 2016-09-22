import { Route } from 'react-router';
import Layout from './components/Layout';
import Login from './components/Login';
import Registration from './components/Registration';
import ProfilePicture from './containers/ProfilePicture';
import ForgotPassword from './components/ForgotPassword';
import ForgotPasswordConfirmation from './components/ForgotPasswordConfirmation';
import ResetPassword from './components/ResetPassword';

export default (
    <Route>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Registration} />
        <Route path="/register/picture" component={ProfilePicture} />
        <Route path="/forgot-password(/:email)" component={ForgotPassword} />
        <Route path="/forgot-password-confirmation/:email" component={ForgotPasswordConfirmation} />
        <Route path="/reset-password/:token" component={ResetPassword} />
    </Route>
);