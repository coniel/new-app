import { Component, PropTypes } from 'react';
import MUIRaisedButton from 'material-ui/RaisedButton';
import {routerShape} from 'react-router/lib/PropTypes';

class RaisedButton extends Component {

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

    render() {

        let style = this.props.style || {};

        if (this.props.color) {
            style.color = this.props.color;
        }

        if (this.props.spaced) {
            style.marginLeft = 8;
        }

        let onTouchTap = this.props.onTouchTap;

        if (this.props.href) {
            onTouchTap = this._navigateTo;
        }

        let label = this.props.label;

        if (typeof this.props.i18n === 'undefined' || this.props.i18n !== false){
            label = this.context.intl.formatMessage({id: label}, this.props.values);
        }

        return (
            <MUIRaisedButton
                style={style}
                label={label}
                onTouchTap={onTouchTap}
                className={this.props.className}
            />
        )
    }
}

RaisedButton.contextTypes = {
    router: routerShape.isRequired,
    intl: PropTypes.object.isRequired
};

export default RaisedButton;