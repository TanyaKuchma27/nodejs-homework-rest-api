const { Conflict } = require("http-errors");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { User } = require("../../models");
const jimp = require("jimp");

const register = async (req, res) => {
    const { email, password, subscription } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        throw new Conflict("Email in use")
    }
    const avatarURL = gravatar.url(email);
    jimp.read(avatarURL, (err, avatar) => {
        if (err) { throw err };
        avatar.resize(250, 250).write(avatarURL);    
    });
    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    await User.create({ email, password: hashPassword, subscription, avatarURL });    
    res.status(201).json({
        user: {
            email,
            subscription,
            avatarURL
        }
    })
};

module.exports = register;