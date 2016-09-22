import { Component } from 'react';
import { Link } from 'react-router';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'ui/FlatButton';
import RaisedButton from 'ui/RaisedButton';

export default class AppLayout extends Component {
    render() {

        let iconElementRight = (
            <div>
                <Link to="/register" ><FlatButton label="auth.labels.register" style={{color: "#FFF", marginRight: 8}} /></Link>
                <Link to="/login"><RaisedButton label="auth.labels.login" style={{color: "#FFF"}} /></Link>
            </div>
        )

        return  (
            <div>
                <AppBar
                    title={Meteor.settings.public.appName}
                    showMenuIconButton={false}
                    zDepth={0}
                    iconElementRight={iconElementRight}
                />
                {this.props.children}
            </div>
        )
    }
}