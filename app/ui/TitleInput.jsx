import React from 'react';
import { TextInput } from 'react-ss-form-handler-material-ui';

const TitleInput = React.createClass({
    render: function () {

        var inputStyle = {fontSize: 24};
        var hintStyle = {fontSize: 24};

        if (this.props.color) {
            if (this.props.color === "white") {
                inputStyle.color = "#FFF";
                hintStyle.color = "rgba(256, 256, 256, 0.6)";
            }
        }

        return (
            <TextInput {...this.props} inputStyle={inputStyle} hintStyle={hintStyle} floatingLabelText={null} />
        )
    }
});

export default TitleInput;