import Profile from 'models/Profile';

// Add an after insert hook to the users collection
// so that a profile is created for the user when they sign up
Accounts.onCreateUser(function (options, user) {
    // Create the user's profile
    var profile = {
        userId: user._id,
        firstName: options.firstName,
        lastName: options.lastName
    };

    Profile.collection.insert(profile);

    if (options.email) {

        if (!user.services) {
            user.services = {}
        }

        user.services.email = {
            verificationTokens: []
        };

        user.services.email.verificationTokens.push({
            token: Random.secret(),
            address: options.email,
            when: new Date()
        });
    }

    // Set the account type on the user document
    user.accountType = options.accountType;

    return user;
});