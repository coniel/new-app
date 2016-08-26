import { Component } from 'react';
import FlatButton from 'ui/FlatButton';
import Colors from 'ui/Colors';
import styles from './buttons.import.scss';

export default class BottomButton extends Component {
    render() {
        return (
            <FlatButton {...this.props} className={styles["bottom-button"]} />
        )
    }
};