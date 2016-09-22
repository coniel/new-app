import { Component } from 'react';
import FlatButton from 'ui/FlatButton';
import styles from './buttons.import.scss';

export default class SwitchToLoginButton extends Component {
    render() {
        return (
            <FlatButton label="auth.labels.login" href="/login" className={styles["top-button"]} />
        )
    }
};