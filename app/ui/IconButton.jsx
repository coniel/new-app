import { Component } from 'react';
import {routerShape} from 'react-router/lib/PropTypes';
import MUIIconButton from 'material-ui/IconButton';
import styles from 'mdi/scss/materialdesignicons.scss';

class IconButton extends Component {

    constructor() {
        super();

        this._navigateTo = this._navigateTo.bind(this);
    }

    _navigateTo() {
        if (this.props.onTouchTap) {
            this.props.onTouchTap();
        }

        this.context.router.push(this.props.href);
    }

    _iconClassName() {
        var className = "mdi mdi-" + this.props.icon + " ";

        if (this.props.iconClassName) {
            className += this.props.iconClassName;
        }

        return className;
    }

    render() {
        var iconStyle = {};
        var tooltip;
        var className = this.props.className || "";

        if (this.props.light) {
            className += " light-icon";
        }

        if (this.props.iconStyle) {
            _.extend(iconStyle, this.props.iconStyle);
        }

        if (this.props.color) {
            iconStyle.color = this.props.color;
        }

        if (this.props.tooltip) {
            tooltip = TAPi18n.__(this.props.tooltip);
        }

        let onTouchTap = this.props.onTouchTap;

        if (this.props.href) {
            console.log("has href");
            onTouchTap = this._navigateTo;
        }

        return (
            <MUIIconButton
                tooltipPosition="top-center"
                className={className}
                iconStyle={iconStyle}
                iconClassName={this._iconClassName()}
                tooltip={tooltip}
                onTouchTap={onTouchTap}
                style={this.props.style}
            >
                {this.props.children}
            </MUIIconButton>
        )
    }
}

IconButton.contextTypes = {
    router: routerShape.isRequired
};

export default IconButton;