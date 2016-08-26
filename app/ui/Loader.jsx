import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';

const Loader = React.createClass({
    render: function () {

        let style = {height: '100%', textAlign: 'center', paddingTop: '20%', paddingBottom: '20%'};
        let size = 1.5;

        if (this.props.small) {
            size = 1;
            style.paddingTop = '10%';
            style.paddingBottom = '10%';
        }

        if (this.props.noPadding) {
            style.paddingTop = '0';
            style.paddingBottom = '0';
        }

        return (
            <div style={style}>
                <CircularProgress mode="indeterminate" size={size} />
            </div>
        )
    }
});

export default Loader;