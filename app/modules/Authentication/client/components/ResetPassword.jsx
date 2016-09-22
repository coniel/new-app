import { Component } from 'react';
import SimpleSchema from 'simpl-schema';
import {routerShape} from 'react-router/lib/PropTypes';
import styles from './authentication.import.scss';
import { PasswordSchema, PasswordConfirmationSchema} from '../schemas/Password';
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

var resetPasswordFormSchema = new SimpleSchema({
    password: PasswordSchema,
    passwordConfirmation: PasswordConfirmationSchema
});

class ForgotPassword extends Component {

    constructor() {
        super();
        
        this.state = {
            
        }

        this._handleSubmit = this._handleSubmit.bind(this);
    }

    _handleSubmit(doc) {
        Accounts.resetPassword(this.props.params.token, doc.password, (error) => {

            this.setState({
                loading: true,
                formErrors: {},
                error: false
            });

            if (!error) {
                if (Session.get("authenticationRedirect")) {
                    this.context.router.push(Session.get("authenticationRedirect"));
                    Session.set("authenticationRedirect", false);
                } else {
                    this.context.router.push('/pricelists');
                }
            } else {
                var newState = {
                    loading: false,
                    formErrors: {},
                    error: false
                };

                if (error.reason === "Token expired") {
                    newState.tokenExpired = true;
                    newState.error = "This reset password link has expired.";
                    newState.errorActionLabel = "Get a new reset link";
                    newState.errorActionUrl = "/forgot-password";
                } else {
                    newState.error = error.reason;
                }
                this.setState(newState);
            }
        });
    }

    _renderContent = () => {
        if (this.state.tokenExpired) {
            return (
                <div style={{padding: 20}}>
                    <ErrorMessage message={this.state.error} actionLabel={this.state.errorActionLabel} actionUrl={this.state.errorActionUrl} />
                </div>
            )
        } else {
            return (
                <div>
                    <p className={styles['reset-password-info']}>Enter your new password below.</p>
                    <ErrorMessage message={this.state.error} />
                    <Form id="login-form" schema={resetPasswordFormSchema} onSubmit={this._handleSubmit}>
                        <TextInput type="password" name="password" />
                        <TextInput type="password" name="passwordConfirmation" />
                        {this.state.loading? <ButtonLoader /> : <SubmitButton fullWidth={true} label="Submit" />}
                    </Form>
                </div>
            )
        }
    }

    render() {
        return (
            <AuthenticationLayout topButton={<SwitchToLoginButton />}>
                <AuthenticationForm title="reset" backgroundImage="/img/login-background.png">
                    {this._renderContent()}
                </AuthenticationForm>
            </AuthenticationLayout>
        )
    }
};


ForgotPassword.contextTypes = {
    router: routerShape.isRequired
}

export default ForgotPassword;