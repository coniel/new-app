import { Component } from 'react';
import {routerShape} from 'react-router/lib/PropTypes';
import SimpleSchema from 'simpl-schema';
import styles from './authentication.import.scss';
import PasswordSchema from '../schemas/Password';
import Profile from 'models/Profile';
import User from 'models/User';
import FormHeader from './FormHeader';
import AuthenticationLayout from './Layout';
import AuthenticationForm from './AuthenticationForm';
import SwitchToLoginButton from './buttons/SwitchToLoginButton';
import AlreadyHaveAccountButton from './buttons/AlreadyHaveAccountButton';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'ui/IconButton';
import Colors from 'ui/Colors';
import Form from 'react-ss-form-handler';
import { TextInput, SubmitButton } from 'react-ss-form-handler-material-ui';
import ButtonLoader from 'ui/ButtonLoader';
import ErrorMessage from 'ui/ErrorMessage';

var profileSchema = Profile.getSubSchema(["firstName", "lastName"], null)._schema;
var userSchema = User.getSubSchema(["emails.$.address", "username"], {
    renameKeys: {
        "emails.$.address": "email"
    }
})._schema;

var registrationFormSchema = {
    password: PasswordSchema
};

_.extend(registrationFormSchema, profileSchema);
_.extend(registrationFormSchema, userSchema);

registrationFormSchema = new SimpleSchema(registrationFormSchema);

class Registration extends Component {

    constructor() {
        super();

        this.state = {
            loading: false,
            formErrors: {},
            otherError: false
        }

        this._register = this._register.bind(this);
    }

    _register(doc) {
        doc.accountType = 'user';

        this.setState({
            loading: true,
            formErrors: {},
            otherError: false
        });

        Accounts.createUser(doc, (error) => {
            if (!error) {
                if (Session.get("authenticationRedirect")) {
                    this.context.router.replace(Session.get("authenticationRedirect"));
                } else {
                    this.context.router.replace('/pricelists');
                }
            } else {
                var newState = {
                    loading: false,
                    formErrors: {}
                };

                if (error.reason === "Email already exists.") {
                    newState.formErrors.email = "An account with this email address already exists";
                } else {
                    newState.otherError = error.reason;
                }
                this.setState(newState);
            }
        });
    }

    render() {
        return (
            <AuthenticationLayout bottomButton={<AlreadyHaveAccountButton />} topButton={<SwitchToLoginButton />}>
                <AuthenticationForm title="welcome" backgroundImage="/img/login-background.png">
                    <ErrorMessage message={this.state.otherError} />
                    <Form id="student-registration-form" schema={registrationFormSchema} onSubmit={this._register} errors={this.state.formErrors}>
                        <TextInput name="firstName" layoutStyle="first-half" />
                        <TextInput name="lastName" layoutStyle="second-half" />
                        <TextInput name="email" />
                        <TextInput type="password" name="password" />
                        {this.state.loading? <ButtonLoader /> : <SubmitButton fullWidth={true} label="Register" />}
                    </Form>
                </AuthenticationForm>
            </AuthenticationLayout>
        )
    }
}

Registration.contextTypes = {
    router: routerShape.isRequired
};

export default Registration;