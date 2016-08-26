import { Component } from 'react';
import {routerShape} from 'react-router/lib/PropTypes';
import styles from './authentication.import.scss';
import PasswordSchema from '../schemas/Password';
import User from 'models/User';
import FormHeader from './FormHeader';
import AuthenticationLayout from './Layout';
import AuthenticationForm from './AuthenticationForm';
import SwitchToRegistrationButton from './buttons/SwitchToRegistrationButton';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'ui/IconButton';
import Colors from 'ui/Colors';
import Form from 'react-ss-form-handler';
import { TextInput, SubmitButton } from 'react-ss-form-handler-material-ui';

var loginFormSchemaExtension = {
    password: PasswordSchema
};

var loginFormSchema = User.getSubSchema([
    'emails.$.address'
], {
    renameKeys: {
        'emails.$.address': 'email'
    },
    modifySchema: {
        'emails.$.address': {
            optional: true,
            label: "Username or email"
        }
    },
    extend: loginFormSchemaExtension
});

class Login extends Component {

    constructor() {
        super();

        this._login = this._login.bind(this);
    }

    _login(credentials) {
        Meteor.loginWithPassword(credentials.email, credentials.password, (error) => {
            if (error) {
                console.log(error);
            } else {
                if (Session.get("authenticationRedirect")) {
                    this.context.router.push(Session.get("authenticationRedirect"));
                    Session.set("authenticationRedirect", false);
                } else {
                    this.context.router.push('/dashboard');
                }
            }
        });
    }

    render() {

        let bottomButton = <FlatButton label="Forgot password?" style={{backgroundColor: Colors.primaryColor, color: "rgba(255, 255, 255, 0.65)"}} />;
        let doc = {};

        if (Meteor.isClient) {
            doc.email = Session.get("loginUser");
        }

        return (
            <AuthenticationLayout bottomButton={bottomButton} topButton={<SwitchToRegistrationButton />}>
                <AuthenticationForm title="hello" backgroundImage="/img/login-background.png">
                    <Form id="login-form" schema={loginFormSchema} onSubmit={this._login} doc={doc}>
                        <TextInput name="email" />
                        <TextInput type="password" name="password" />
                        <SubmitButton fullWidth={true} label="Login" />
                    </Form>
                </AuthenticationForm>
            </AuthenticationLayout>
        )
    }
};


Login.contextTypes = {
    router: routerShape.isRequired
}

export default Login;