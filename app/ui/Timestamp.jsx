import React from 'react';

const Timestamp = React.createClass({
    componentDidMount() {
        $(this.refs.timestamp).livestamp(this.props.date.getTime()/1000);
    },
    render: function() {
        return (
            <span ref="timestamp" style={this.props.style}></span>
        )
    }
});

export default Timestamp;