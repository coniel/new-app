import React from 'react';
import CSSModules from 'react-css-modules';
import {routerShape} from 'react-router/lib/PropTypes';
import styles from './authentication.import.scss';
import FlatButton from 'ui/FlatButton';
import RaisedButton from 'ui/RaisedButton';
import Colors from 'ui/Colors';
import Loader from 'ui/Loader';
import Avatar from 'material-ui/Avatar';
import { FileInput, UploadProgressBar } from 'ui/FileUpload';
import Profile from 'models/Profile';
import User from 'models/User';
import Layout from './Layout';
import AuthenticationForm from './AuthenticationForm';
import BottomButton from './buttons/BottomButton';
import ProfilePictureEditor from 'ui/ProfilePictureEditor';

const ProfilePicture = React.createClass({
    contextTypes: {
        router: routerShape.isRequired
    },
    getInitialState() {
        return {
            image: false,
            uploadDone: false,
            filename: ""
        }
    },
    _getProfilePictureData() {
        var data = this.refs.profilePictureEditor.getData();
        if (this.state.uploadDone) {
            var profile = this.props.profile;
            profile.avatar = {
                type: "image",
                imageFilename: this.state.filename,
                imageCropDimensions: {
                    x: data.x,
                    y: data.y,
                    width: data.width,
                    height: data.height
                }
            };

            profile.save().then(() => {
                this.context.router.push(Meteor.settings.public.routes.postRegistration);
            });
        } else {
            console.log("upload not done");
        }
    },
    _onUploadStart(doc) {
        console.log("started");
        this.setState({
            image: doc.url,
            uploadDone: false,
            filename: ""
        });
    },
    _onUploadSuccess(doc) {
        this.setState({
            uploadDone: true,
            filename: doc.filename
        });
    },
    _renderContent() {
        if (this.state.image) {
            return (
                <div>
                    <ProfilePictureEditor ref="profilePictureEditor" url={this.state.image} />
                    <div style={{paddingBottom: 20}}>
                        <UploadProgressBar for={Meteor.user()} style={{marginBottom: 20}} />
                        <FlatButton label="Change image" secondary={true} style={{float: "left", width: 'auto'}}>
                            <FileInput for={Meteor.user()} onUploadStart={this._onUploadStart} onUploadSuccess={this._onUploadSuccess} />
                        </FlatButton>
                        <RaisedButton label="actions.done" primary={true} onTouchTap={this._getProfilePictureData} style={{float: "right"}} disabled={!this.state.uploadDone} />
                        <div className="clearfix"></div>
                    </div>
                </div>
            )
        } else {
            return (
                <div style={{padding: "40px 0 40px 0", textAlign: 'center'}}>
                    <h3>Profile picture</h3>
                    <Avatar size={160}>{this.props.profile.initials()}</Avatar>
                    <RaisedButton primary={true} label="Upload a picture" style={{marginTop: 20}}>
                        <FileInput for={Meteor.user()} onUploadStart={this._onUploadStart} onUploadSuccess={this._onUploadSuccess} />
                    </RaisedButton>
                </div>
            )
        }
    },
    render: function () {

        return (
            <Layout bottomButton={<BottomButton href="/dashboard" label="actions.skip" />}>
                <AuthenticationForm>
                    {this._renderContent()}
                </AuthenticationForm>
            </Layout>
        )
    }
});

export default CSSModules(ProfilePicture, styles);