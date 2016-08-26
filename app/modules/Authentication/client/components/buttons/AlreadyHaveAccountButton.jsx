import React from 'react';
import BottomButton from './BottomButton';

const AlreadyHaveAccountButton = React.createClass({
    render: function () {
        return (
            <BottomButton href="/login" label="Already have an account?" />
        )
    }
});

export default AlreadyHaveAccountButton;