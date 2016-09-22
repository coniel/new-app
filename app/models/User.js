import User from 'meteor-user-model'
//import { UploadableModel } from 'meteor-uploadable';

/**
 * Represents a User
 * @class UserModel
 * @param {Object} document An object representing a user
 */

//UploadableModel.makeUploadable(User, "user");

User.appendSchema({
    accountType: {
        type: String,
        allowedValues: ["admin", "moderator", "user"]
    },
    username: {
        type: String,
        min: 4,
        max: 20,
        optional: true,
        label: "labels.username"
    },
    services: {
        type: Object,
        blackbox: true
    },
    emails: {
        type: Array,
        optional: true
    },
    "emails.$": {
        type: Object
    },
    "emails.$.address": {
        type: String,
        max: 300,
        label: "labels.email"
    },
    "emails.$.verified": {
        type: Boolean,
        defaultValue: false
    }
});

export default User;