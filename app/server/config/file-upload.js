import uuid from 'node-uuid';
require('config/file-upload');

function getFileExtension(fileName) {
    var a = fileName.split(".");
    if( a.length === 1 || ( a[0] === "" && a.length === 2 ) ) {
        return "";
    }
    return a.pop();
}

function generateFileKey(file) {
    return uuid.v1() + '.' + getFileExtension(file.name);
}

if (!Meteor.settings)
    throw new Meteor.Error("missing_settings", "Missing Meteor settings file");

if (!Meteor.settings.public)
    throw new Meteor.Error("missing_settings", "Missing Meteor public settings");

if (!Meteor.settings.aws)
    throw new Meteor.Error("missing_settings", "Missing AWS settings");

if (!Meteor.settings.public.fileUpload)
    throw new Meteor.Error("missing_settings", "Missing FileUpload settings");

var defaultSettings = {
    bucket: Meteor.settings.public.fileUpload.fileBucket,

    acl: "public-read",

    region: Meteor.settings.public.fileUpload.fileRegion,
    AWSAccessKeyId: Meteor.settings.aws.accessKeyId,
    AWSSecretAccessKey: Meteor.settings.aws.secretAccessKey,

    authorize: function () {
        return true;
    },

    maxSize: Meteor.settings.public.fileUpload.maxFileSize,

    key: function (file) {
        //Store file into a directory by the user's username.
        return generateFileKey(file);
    }
};

Slingshot.createDirective("anything", Slingshot.S3Storage, _.clone(defaultSettings));

var imageSettings = _.clone(defaultSettings);
imageSettings.bucket = Meteor.settings.public.fileUpload.imageBucket;
imageSettings.region = Meteor.settings.public.fileUpload.imageRegion;
Slingshot.createDirective("images", Slingshot.S3Storage, imageSettings);