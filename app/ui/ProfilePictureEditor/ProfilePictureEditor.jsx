import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './profile-picture-editor-style';
import Cropper from 'react-cropper';
import Slider from 'material-ui/Slider';
import IconButton from '../IconButton';

let zoom = 0;

const ProfilePictureEditor = React.createClass({
    getData() {
        return this.refs.cropper.getData(true);
    },
    _onZoom(event, value) {
        this.refs.cropper.zoom(value - zoom);
        zoom = value;
    },
    _rotate(degrees) {
        this.refs.cropper.rotate(degrees);
    },
    render: function () {
        return (
            <div style={{paddingTop: 300}}>
                <Cropper
                    ref='cropper'
                    src={this.props.url}
                    style={{maxHeight: 300, position: 'absolute', top: 0, left: 0, right: 0}}
                    // Cropper.js options
                    aspectRatio={1/1}
                    minContainerHeight={50}
                    minCanvasHeight={50}
                    viewMode={1}
                    toggleDragModeOnDblclick={false}
                    zoomOnWheel={false}
                    dragMode="move"
                    cropBoxMovable={false}
                    cropBoxResizable={false}
                    background={false}
                    center={false}
                    movable={true}
                    autoCropArea={1}
                    guides={false} />

                <div style={{position: 'relative', padding: "0 50px 0 50px", height: 43}}>
                    <IconButton onTouchTap={this._rotate.bind(this, -90)} icon="rotate-left" style={{position: 'absolute', left: 0, top: -14}} />
                    <Slider min={0} max={2} onChange={this._onZoom} />
                    <IconButton onTouchTap={this._rotate.bind(this, 90)} icon="rotate-right" style={{position: 'absolute', right: 0, top: -14}} />
                </div>
            </div>
        )
    }
});

export default CSSModules(ProfilePictureEditor, styles);