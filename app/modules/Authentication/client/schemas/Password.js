const PasswordSchema = {
    type: String,
    min: 6,
    max: 100,
    label: 'Password'
};

const PasswordConfirmationSchema = _.clone(PasswordSchema);

PasswordConfirmationSchema.label = "Password again";
PasswordConfirmationSchema.custom = function () {
    if (this.value !== this.field('password').value) {
        return "passwordMismatch";
    }
}

export {
    PasswordSchema,
    PasswordConfirmationSchema
}

export default PasswordSchema;