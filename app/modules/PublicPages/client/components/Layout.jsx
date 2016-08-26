import { Component } from 'react';
import { Link } from 'react-router';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

export default class AppLayout extends Component {
    render() {
        return  (
            <div>
                <AppBar
                    title="New App"
                    showMenuIconButton={false}
                    zDepth={0}
                    iconElementRight={<FlatButton label="Login" containerElement={<Link to="/login" />} />}
                />
                {this.props.children}
            </div>
        )
    }
}