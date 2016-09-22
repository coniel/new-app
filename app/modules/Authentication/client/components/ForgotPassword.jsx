import { Component } from 'react';
import {routerShape} from 'react-router/lib/PropTypes';
import styles from './authentication.import.scss';
import PasswordSchema from '../schemas/Password';
import User from 'models/User';
import FormHeader from './FormHeader';
import AuthenticationLayout from './Layout';
import AuthenticationForm from './AuthenticationForm';
import SwitchToLoginButton from './buttons/SwitchToLoginButton';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'ui/IconButton';
import Colors from 'ui/Colors';
import Form from 'react-ss-form-handler';
import { TextInput, SubmitButton } from 'react-ss-form-handler-material-ui';
import ErrorMessage from 'ui/ErrorMessage';
import ButtonLoader from 'ui/ButtonLoader';

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

    constructor(props) {
        super();

        this.state = {
            email: props.params.email,
            loading: false,
            formErrors: {},
            otherError: false
        }

        this._handleSubmit = this._handleSubmit.bind(this);
    }

    _handleSubmit(credentials) {

        this.setState({
            loading: true,
            email: credentials.email
        });

        Accounts.forgotPassword({email: credentials.email}, (error) => {
            if (error) {
                var newState = {
                    loading: false,
                    formErrors: {},
                    otherError: false
                };

                if (error.reason === "User not found") {
                    newState.formErrors.email = "We couldn't find an account with this email";
                } else {
                    newState.otherError = error.reason;
                }

                this.setState(newState);
            } else {
                this.context.router.push('/forgot-password-confirmation/' + credentials.email);
            }
        });
    }

    render() {

        let doc = {
            email: this.state.email
        };

        return (
            <AuthenticationLayout topButton={<SwitchToLoginButton />}>
                <AuthenticationForm title="reset" backgroundImage="/img/login-background.png">
                    <p className={styles['reset-password-info']}>Enter your email address below. You will receive an email with a link to reset your password.</p>
                    <ErrorMessage message={this.state.otherError} />
                    <Form id="login-form" schema={loginFormSchema} onSubmit={this._handleSubmit} doc={doc} errors={this.state.formErrors}>
                        <TextInput name="email" />
                        {this.state.loading? <ButtonLoader /> : <SubmitButton fullWidth={true} label="Submit" />}
                    </Form>
                </AuthenticationForm>
            </AuthenticationLayout>
        )
    }
};


ForgotPassword.contextTypes = {
    router: routerShape.isRequired
}

export default ForgotPassword;