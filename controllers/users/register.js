const { createError } = require("../../helpers");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const jimp = require("jimp");
const ObjectID = require("bson-objectid");

const { sendEmail } = require("../../helpers");
const { User } = require("../../models");

const register = async (req, res) => {
    const { email, password, subscription } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        throw createError(409, "Email in use");
    }
    const verificationToken = ObjectID();
    const avatarURL = gravatar.url(email);
    jimp.read(avatarURL, (err, avatar) => {
        if (err) { throw err };
        avatar.resize(250, 250).write(avatarURL);    
    });
    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    await User.create({ email, password: hashPassword, subscription, avatarURL, verificationToken });    
    const mail = {
        to: email,
        subject: "email confirmation",
        html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">To confirm email</a>`
    };
    await sendEmail(mail);
    res.status(201).json({
        user: {
            email,
            subscription,
            avatarURL,
            verificationToken
        }
    })
};

module.exports = register;