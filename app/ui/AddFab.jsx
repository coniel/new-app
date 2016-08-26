import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Icon from '../Icon';

const AddFab = React.createClass({
    render: function () {

        var style = this.props.style || {};

        if (this.props.bottomRight) {
            style.position = 'fixed';
            style.bottom = 24;
            style.right = 24;
        }

        return (
            <FloatingActionButton {...this.props} style={style}>
                <Icon icon="plus" color="#FFF" />
                {this.props.children}
            </FloatingActionButton>
        )
    }
});

export default AddFab;