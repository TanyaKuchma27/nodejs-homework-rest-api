const { Schema, model } = require("mongoose");
const Joi = require("joi");

const userSchema = Schema({
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter"
    },
    token: {
        type: String,
        default: null
    },
    avatarURL: {
        type: String,
        required: [true, 'Avatar is required'],
    },
    verify: {
        type: Boolean,
        default: false,
    },
    verificationToken: {
        type: String,
        required: [true, 'Verify token is required'],
    },
}, { versionKey: false, timestamps: true });

const joiRegisterSchema = Joi.object({
    password: Joi.string().min(6).required(),
    email: Joi.string().email().required(),
    subscription: Joi.string().valid("starter", "pro", "business"),
    token: Joi.string()
});

const joiEmailSchema = Joi.object({
    email: Joi.string().email().required(),
});

const joiLoginSchema = Joi.object({
    password: Joi.string().min(6).required(),
    email: Joi.string().email().required(),
    token: Joi.string()
});

const subscriptionJoiSchema = Joi.object({
    subscription: Joi.string().valid("starter", "pro", "business")
})

const User = model("user", userSchema);

module.exports = {
    User,
    joiRegisterSchema,
    joiEmailSchema,
    joiLoginSchema,
    subscriptionJoiSchema
}