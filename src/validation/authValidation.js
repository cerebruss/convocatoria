import { check } from "express-validator";

let validateRegister = [
    check("email", "email invalido").isEmail().trim(),

    check("password", "password incorrecta. se necesita más de dos caracteres")
    .isLength({ min: 2 }),

    check("passwordConfirmation", "Password confirmacion no coinciden")
    .custom((value, { req }) => {
        return value === req.body.password
    })
];

let validateLogin = [
    check("email", "email invalido").isEmail().trim(),

    check("password", "password incorrecta")
    .not().isEmpty()
];

module.exports = {
    validateRegister: validateRegister,
    validateLogin: validateLogin
};
