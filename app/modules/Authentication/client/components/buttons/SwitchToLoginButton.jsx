import { Component } from 'react';
import FlatButton from 'ui/FlatButton';
import styles from './buttons.import.scss';

export default class SwitchToLoginButton extends Component {
    render() {
        return (
            <FlatButton label="Login" href="/login" className={styles["top-button"]} />
        )
    }
};

export default SwitchToLoginButton;