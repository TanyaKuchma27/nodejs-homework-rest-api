const {User} = require("../../models");
const path = require("path");
const fs = require("fs/promises");
const jimp = require("jimp");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
    const {path: tempUpload, originalname} = req.file;
    const { _id: id } = req.user;
    const [extention] = originalname.split(".").reverse();
    const imageName =  `${id}.${extention}`;
    try {
        const resultUpload = path.join(avatarsDir, imageName);
        await fs.rename(tempUpload, resultUpload);
        const avatarURL = path.join("public", "avatars", imageName);
        jimp.read(avatarURL, (err, avatar) => {
            if (err) { throw err };
            avatar.resize(250, 250).write(avatarURL);    
        });
        await User.findByIdAndUpdate(req.user._id, {avatarURL});
        res.json({avatarURL});
    } catch (error) {
        await fs.unlink(tempUpload);
        throw error;
    }
};

module.exports = updateAvatar;