import React from 'react';
import Avatar from 'material-ui/Avatar';
import Colors from './Colors';

const UserAvatar = React.createClass({
    render: function () {
        let size = this.props.size || 40;
        let profile = this.props.profile;
        if (!profile && this.props.user) {
            profile = this.props.user.profile();
        }

        if (profile) {
            let avatar = profile.avatar;
            let src = null;
            let dpr = 1;

            if (Meteor.isClient) {
                dpr = Math.ceil(window.devicePixelRatio*10) /10;
            }

            if (avatar && avatar.type === 'image') {
                let crop = avatar.imageCropDimensions;
                src = Meteor.settings.public.imageBaseUrl + avatar.imageFilename + "?rect=" + crop.x + "," + crop.y + "," + crop.width + "," + crop.height + "&w=" + size + "&h=" + size + "&dpr=" + dpr
            }

            if (avatar && avatar.type === 'image') {
                return (
                    <Avatar backgroundColor={Colors.lightBlue500} onTouchTap={this.props.onTouchTap} style={this.props.style} size={size} src={src} />
                )
            } else {
                return (
                    <Avatar backgroundColor={Colors.secondaryColor} onTouchTap={this.props.onTouchTap} style={this.props.style} size={size}>{profile.initials()}</Avatar>
                )
            }
        } else {
            return <Avatar backgroundColor={Colors.lightBlue500} onTouchTap={this.props.onTouchTap} style={this.props.style} size={size} >{this.props.children}</Avatar>
        }
    }
});

export default UserAvatar;