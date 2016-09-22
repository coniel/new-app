import { Component } from 'react';
import {routerShape} from 'react-router/lib/PropTypes';
import { Link } from 'react-router';
import styles from './authentication.import.scss';
import PasswordSchema from '../schemas/Password';
import User from 'models/User';
import FormHeader from './FormHeader';
import AuthenticationLayout from './Layout';
import AuthenticationForm from './AuthenticationForm';
import SwitchToLoginButton from './buttons/SwitchToLoginButton';
import Paper from 'material-ui/Paper';
import FlatButton from 'ui/FlatButton';
import RaisedButton from 'ui/RaisedButton';
import IconButton from 'ui/IconButton';
import Colors from 'ui/Colors';
import SVGIcon from 'ui/SVGIcon';
import { FormattedMessage } from 'react-intl';

var loginFormSchema = User.getSubSchema([
    'emails.$.address'
], {
    renameKeys: {
        'emails.$.address': 'email'
    },
    modifySchema: {
        'emails.$.address': {
            optional: true,
            label: "Email"
        }
    }
});

class ForgotPassword extends Component {

    constructor() {
        super();

        this._handleSubmit = this._handleSubmit.bind(this);
    }

    _handleSubmit(credentials) {
        Accounts.forgotPassword({email: credentials.email});
    }

    render() {

        let doc = {};

        if (Meteor.isClient && this.props.params.email) {
            doc.email = this.props.params.email;
        }

        return (
            <AuthenticationLayout topButton={<SwitchToLoginButton />}>
                <div className={styles['forgot-password-confirmation']}>
                    <SVGIcon icon="email-notification.svg" size={150} />
                    <h2><FormattedMessage id="auth.instructions.forgot_password_confirmation.title" /></h2>
                    <p><FormattedMessage id="auth.instructions.forgot_password_confirmation.body" values={{email: <b>{this.props.params.email}</b>}} /></p>
                    <Link to={"/forgot-password"}><FlatButton label="auth.labels.wrong_email" style={{backgroundColor: Colors.primaryColor, color: "rgba(255, 255, 255, 0.65)"}} /></Link>
                </div>
            </AuthenticationLayout>
        )
    }
};


ForgotPassword.contextTypes = {
    router: routerShape.isRequired
}

export default ForgotPassword;