import { Component } from 'react';
import { Link } from 'react-router';
import {routerShape} from 'react-router/lib/PropTypes';
import AppBar from 'material-ui/AppBar';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'ui/IconButton';
import UserAvatar from 'ui/UserAvatar';

class TopBar extends Component {

    constructor() {
        super();

        this._logout = this._logout.bind(this);
    }

    _logout() {
        Meteor.logout(() => {
            this.context.router.push('/');
        });
    }

    render() {
        let rightComponents = (
            <IconMenu iconButtonElement={<UserAvatar style={{marginTop: 4, marginRight: 16, cursor: "pointer"}} profile={this.props.profile} />}
                      anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                      targetOrigin={{vertical: 'top', horizontal: 'right'}}>
                <MenuItem primaryText="Account settings"/>
                <MenuItem primaryText="Logout" onTouchTap={this._logout}/>
            </IconMenu>
        );

        return  (
            <AppBar
                title={Meteor.settings.public.appName}
                showMenuIconButton={false}
                zDepth={0}
                iconElementRight={rightComponents}
            />
        )
    }
}

TopBar.contextTypes = {
    router: routerShape.isRequired
}

export default TopBar;