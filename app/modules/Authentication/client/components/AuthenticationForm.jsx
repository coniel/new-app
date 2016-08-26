import { Component } from 'react';
import styles from './authentication.import.scss';
import Paper from 'material-ui/Paper';
import FormHeader from './FormHeader';

export default class AuthenticationForm extends Component {
    render() {
        return (
            <Paper className={styles["authentication-form-container"]} zDepth={2}>
                {this.props.backgroundImage? <FormHeader title={this.props.title} backgroundImage={this.props.backgroundImage} /> : ""}
                <div className={styles.body}>
                    {this.props.children}
                </div>
            </Paper>
        )
    }
};