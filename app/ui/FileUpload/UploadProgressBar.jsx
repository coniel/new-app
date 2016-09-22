import React from 'react';
import LinearProgress from 'material-ui/LinearProgress';
import CircularProgress from 'material-ui/CircularProgress';
import { FileUpload } from 'meteor-uploadable';

const UploadProgressBar = React.createClass({

    getInitialState() {
        return {
            progress: 0
        }
    },
    
    componentDidMount() {
        Tracker.autorun(() => {
            var fileUpload;
            var progress = 0;

            if (this.props.fileId) {
                fileUpload = FileUpload.collection.findOne({_id: this.props.fileId})
            } else if (this.props.for) {
                fileUpload = FileUpload.collection.find({linkedObjectId: this.props.for._id}, {limit: 1, sort: {createdAt: -1}}).fetch()[0]
            }

            if (fileUpload && fileUpload.progress && fileUpload.progress < 100) {
                progress = fileUpload.progress;
            }

            this.setState({
                progress: progress
            });
        });
    },

    _progressContainerStyle: function () {
        if (this.state.progress === 0) {
            return {
                display: "none"
            }
        } else {
            return this.props.style;
        }
    },
    render: function () {
        let progress = this.state.progress;
        let progressBar = (this.props.type === 'circular')? <CircularProgress mode="determinate" value={progress} size={this.props.size} /> : <LinearProgress mode="determinate" value={progress} />;

        return (
            <div style={this._progressContainerStyle()}>
                {progressBar}
            </div>
        )
    }
});

export default UploadProgressBar;