import { Component } from 'react';
import styles from './authentication.import.scss';
import { FormattedMessage } from 'react-intl';

export default class FormHeader extends Component {
    render() {
        return (
            <div className={styles.header + " tablet-up-only"} style={{background: "linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.5)), url(" + this.props.backgroundImage + ")"}}>
                <h2><FormattedMessage id={this.props.title} /></h2>
            </div>
        )
    }
};