import React from 'react';
import { FileUpload } from 'meteor-uploadable';

var inputStyle = {
    cursor: 'pointer',
    position: 'absolute',
    top: '0',
    bottom: '0',
    right: '0',
    left: '0',
    width: '100%',
    height: '100%',
    opacity: '0',
    zIndex: 9999999
};

const FileInput = React.createClass({
    _multiple: function () {
        if (this.props.multiple) {
            return this.props.multiple;
        } else {
            return true;
        }
    },
    _onChange: function (event) {
        console.log("changed");
        var directive = this.props.directive || "anything";
        var folderId = this.props.folderId || false;

        var callbacks = {
            onUploadSuccess: this.props.onUploadSuccess,
            onUploadStart: this.props.onUploadStart,
            onUploadError: this.props.onUploadError
        };

        var parentData = {};
        console.log(event.nativeEvent.target.files);
        console.log(event);
        FileUpload.upload(this.props.for, event.nativeEvent.target.files, directive, callbacks);
    },
    render: function () {
        return (
            <input type="file" style={inputStyle} multiple={this._multiple()} onChange={this._onChange} />
        )
    }
});

export default FileInput;