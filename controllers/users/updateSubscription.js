const { User } = require("../../models");
const { createError } = require("../../helpers");

const updateSubscription = async (req, res) => {
    const { _id } = req.user;
    const { subscription } = req.body;
    const result = await User.findByIdAndUpdate(_id, {subscription}, {new: true});
    if (!result) {
        throw createError(404);
    }
    res.json(result);
}

module.exports = updateSubscription;