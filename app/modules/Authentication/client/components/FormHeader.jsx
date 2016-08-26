import { Component } from 'react';
import styles from './authentication.import.scss';

export default class FormHeader extends Component {
    render() {
        return (
            <div className={styles.header + " tablet-up-only"} style={{background: "linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.5)), url(" + this.props.backgroundImage + ")"}}>
                <h2>{this.props.title}</h2>
            </div>
        )
    }
};