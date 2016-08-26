import {composeWithTracker} from 'react-komposer';
import Profile from 'models/Profile';
import AppLayout from '../components/AppLayout';
import Loader from 'ui/Loader';

function composer(props, onData) {
    if (Meteor.userId()) {
        const handle = Meteor.subscribe("profileFor", Meteor.userId());

        if(handle.ready()) {
            const profile = Profile.collection.findOne({userId: Meteor.userId()});

            onData(null, {profile});
        }
    } else {
        onData(null, {profile: false});
    }
}

export default composeWithTracker(composer)(AppLayout, Loader);