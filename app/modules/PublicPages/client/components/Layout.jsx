import { Component } from 'react';
import { Link } from 'react-router';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

export default class AppLayout extends Component {
    render() {

        let iconElementRight = (
            <div>
                <Link to="/register" ><FlatButton label="Register" style={{color: "#FFF", marginRight: 8}} /></Link>
                <Link to="/login"><RaisedButton label="Login" style={{color: "#FFF"}} /></Link>
            </div>
        )

        return  (
            <div>
                <AppBar
                    title="Repfront"
                    showMenuIconButton={false}
                    zDepth={0}
                    iconElementRight={iconElementRight}
                />
                {this.props.children}
            </div>
        )
    }
}