import React from 'react';
import BottomButton from './BottomButton';

const AlreadyHaveAccountButton = React.createClass({
    render: function () {
        return (
            <BottomButton href="/login" label="auth.labels.already_have_account" />
        )
    }
});

export default AlreadyHaveAccountButton;