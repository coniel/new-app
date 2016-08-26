import Profile from 'meteor-profile-model';

Profile.appendSchema({
    firstName: {
        type: String,
        max: 60,
        label: "First name"
    },
    lastName: {
        type: String,
        max: 60,
        label: "Last name"
    },
    avatar: {
        type: Object,
        autoValue: function () {
            if (this.isInsert) {
                return {
                    type: 'initials'
                }
            }
        }
    },
    "avatar.type": {
        type: String,
        allowedValues: ['initials', 'image']
    },
    "avatar.imageFilename": {
        type: String,
        max: 100,
        optional: true
    },
    "avatar.imageCropDimensions": {
        type: Object,
        optional: true
    },
    "avatar.imageCropDimensions.x": {
        type: Number
    },
    "avatar.imageCropDimensions.y": {
        type: Number
    },
    "avatar.imageCropDimensions.width": {
        type: Number
    },
    "avatar.imageCropDimensions.height": {
        type: Number
    }
});



Profile.meteorMethods({
    update: new ValidatedMethod({
        name: 'profiles.update',
        mixins: [CallPromiseMixin, LoggedInMixin],
        validate: new SimpleSchema({
            _id: Profile.getSchemaKey("_id"),
            doc: {
                type: Object
            },
            'doc.firstName': Profile.getSchemaKeyAsOptional('firstName'),
            'doc.lastName': Profile.getSchemaKeyAsOptional('lastName'),
            'doc.avatar': Profile.getSchemaKeyAsOptional('avatar'),
            'doc.avatar.type': Profile.getSchemaKeyAsOptional('avatar.type'),
            'doc.avatar.imageFilename': Profile.getSchemaKeyAsOptional('avatar.imageFilename'),
            'doc.avatar.imageCropDimensions': Profile.getSchemaKeyAsOptional('avatar.imageCropDimensions'),
            'doc.avatar.imageCropDimensions.x': Profile.getSchemaKeyAsOptional('avatar.imageCropDimensions.x'),
            'doc.avatar.imageCropDimensions.y': Profile.getSchemaKeyAsOptional('avatar.imageCropDimensions.y'),
            'doc.avatar.imageCropDimensions.width': Profile.getSchemaKeyAsOptional('avatar.imageCropDimensions.width'),
            'doc.avatar.imageCropDimensions.height': Profile.getSchemaKeyAsOptional('avatar.imageCropDimensions.height')
        }).validator(),
        checkLoggedInError: {
            error: 'notLogged',
            message: 'You need to be logged in to call this method',//Optional
            reason: 'You need to login' //Optional
        },
        run({_id, doc}) {

            var profile = Profile.collection.findOne({_id: _id});

            if (profile && profile.userId === this.userId) {
                return Profile.collection.update({_id: _id}, {$set: doc});
            } else {
                throw new Meteor.Error(401, "Not authorized");
            }
        }
    })
});

export default Profile;