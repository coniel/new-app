import React from 'react';
import styles from 'mdi/scss/materialdesignicons.scss';
import CSSModules from 'react-css-modules';
import FontIcon from 'material-ui/FontIcon';

const Icon = React.createClass({
    render: function () {
        return (
            <FontIcon {...this.props} className={"mdi mdi-" + this.props.icon + " " + this.props.className} />
        )
    }
});

export default CSSModules(Icon, styles, {allowMultiple: true});