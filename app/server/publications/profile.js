import Profile from 'models/Profile';

Meteor.publish("profileFor", function (userId) {

    check(userId, String);
    console.log(userId);
    console.log(Profile.collection.find({userId: userId}).fetch());
    return Profile.collection.find({userId: userId});
});

Meteor.publish("profilesFor", function (userIds) {

    check(userIds, [String]);

    return Profile.collection.find({userId: {$in: userIds}});
});