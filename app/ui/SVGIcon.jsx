import { Component } from 'react';

class SVGIcon extends Component {
    render() {

        var style = {
            maxWidth: this.props.size,
            maxHeight: this.props.size,
            width: "100%",
            height: "100%"
        };

        if (this.props.style) {
            style = _.extend(style, this.props.style);
        }

        return (
            <img {...this.props} src={Meteor.settings.public.iconBaseUrl + this.props.icon} style={style} />
        )
    }
};

export default SVGIcon;