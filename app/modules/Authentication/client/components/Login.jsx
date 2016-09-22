import { Component } from 'react';
import { routerShape } from 'react-router/lib/PropTypes';
import { Link } from 'react-router';
import styles from './authentication.import.scss';
import PasswordSchema from '../schemas/Password';
import User from 'models/User';
import FormHeader from './FormHeader';
import AuthenticationLayout from './Layout';
import AuthenticationForm from './AuthenticationForm';
import SwitchToRegistrationButton from './buttons/SwitchToRegistrationButton';
import Paper from 'material-ui/Paper';
import FlatButton from 'ui/FlatButton';
import IconButton from 'ui/IconButton';
import Colors from 'ui/Colors';
import Form from 'react-ss-form-handler';
import { TextInput, SubmitButton } from 'react-ss-form-handler-material-ui';
import ButtonLoader from 'ui/ButtonLoader';
import ErrorMessage from 'ui/ErrorMessage';

var loginFormSchemaExtension = {
    password: PasswordSchema
};

var loginFormSchema = User.getSubSchema([
    'emails.$.address'
], {
    renameKeys: {
        'emails.$.address': 'email'
    },
    extend: loginFormSchemaExtension
});

class Login extends Component {

    constructor() {
        super();

        this.state = {
            email: "",
            loading: false,
            formErrors: {},
            otherError: false
        }

        this._login = this._login.bind(this);
    }

    _login(credentials) {

        this.setState({
            loading: true,
            formErrors: {},
            otherError: false
        });

        Meteor.loginWithPassword(credentials.email, credentials.password, (error) => {
            if (error) {
                var newState = {
                    loading: false,
                    formErrors: {}
                };

                if (error.reason === "User not found") {
                    newState.formErrors.email = "We couldn't find an account with this email";
                } else if (error.reason === "Incorrect password") {
                    newState.formErrors.password = "Incorrect password";
                } else {
                    newState.otherError = error.reason;
                }
                this.setState(newState);
            } else {
                if (Session.get("authenticationRedirect")) {
                    this.context.router.push(Session.get("authenticationRedirect"));
                    Session.set("authenticationRedirect", false);
                } else {
                    this.context.router.push('/pricelists');
                }
            }
        });
    }

    render() {

        let bottomButton = <Link to={"/forgot-password/" + this.state.email}><FlatButton label="auth.labels.forgot_password" style={{backgroundColor: Colors.primaryColor, color: "rgba(255, 255, 255, 0.65)"}} /></Link>;
        let doc = {};

        if (Meteor.isClient) {
            doc.email = Session.get("loginUser");
        }

        return (
            <AuthenticationLayout bottomButton={bottomButton} topButton={<SwitchToRegistrationButton />}>
                <AuthenticationForm title="auth.labels.hello" backgroundImage="/img/login-background.png">
                    <ErrorMessage message={this.state.otherError} />
                    <Form ref="form" schema={loginFormSchema} onSubmit={this._login} doc={doc} resetOnSubmit={false} errors={this.state.formErrors}>
                        <TextInput errorText={this.state.emailError} name="email" onChange={(value) => {this.setState({email: value})}} />
                        <TextInput type="password" name="password" />
                        {this.state.loading? <ButtonLoader /> : <SubmitButton fullWidth={true} label="auth.actions.login" />}
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