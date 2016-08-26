import { Component } from 'react';
import { Link } from 'react-router';
import TopBar from './TopBar';

export default class AppLayout extends Component {
    render() {
        return  (
            <div>
                <TopBar profile={this.props.profile} />
                {this.props.children}
            </div>
        )
    }
}