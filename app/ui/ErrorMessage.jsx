import { Component } from 'react';
import { Link } from 'react-router';
import Colors from './Colors';

export default class ErrorMessage extends Component {
    render() {
        if (this.props.show || (typeof this.props.show === 'undefined' && this.props.message)) {
            return (
                <div>
                    <p style={{paddingTop: 16}}><span style={{color: Colors.errorColor}}>{this.props.message}</span> {this.props.actionLabel? <Link to={this.props.actionUrl}>{this.props.actionLabel}</Link> : null}</p>
                </div>
            )
        } else {
            return null;
        }
    }
}