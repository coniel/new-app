import { Component } from 'react';
import FlatButton from 'ui/FlatButton';
import styles from './buttons.import.scss';

export default class SwitchToRegistrationButton extends Component {
    render() {
        return (
            <FlatButton label="Register" href="/register" className={styles["top-button"]} />
        )
    }
};