Accounts.emailTemplates.siteName = Meteor.settings.public.siteName;
Accounts.emailTemplates.from = Meteor.settings.email.from;
Accounts.emailTemplates.resetPassword.subject = function (user) {
    return "Reset password";
};
Accounts.emailTemplates.resetPassword.html = function (user) {
    SSR.compileTemplate('forgotPassword', Assets.getText('email-templates/reset-password.html'));

    var url = Meteor.absoluteUrl() + 'reset-password/' + user.services.password.reset.token;

    return SSR.render("forgotPassword", { url: url });
};