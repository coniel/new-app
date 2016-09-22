/*** Client side file upload configuration ***/
var maxSize = Meteor.settings.public.fileUpload.maxFileSize;

Slingshot.fileRestrictions("anything", {
    allowedFileTypes: null,
    maxSize: maxSize
});

Slingshot.fileRestrictions("images", {
    allowedFileTypes: ["image/jpeg", "image/pjpeg", "image/jpg", "image/pjpg", "image/png"],
    maxSize: maxSize
});