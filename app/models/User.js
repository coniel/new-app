import User from 'meteor-user-model'

/**
 * Represents a User
 * @class UserModel
 * @param {Object} document An object representing a user
 */

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
        label: "Username"
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
        label: "Email"
    },
    "emails.$.verified": {
        type: Boolean,
        defaultValue: false
    }
});

export default User;