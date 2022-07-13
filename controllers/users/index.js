const register = require("./register");
const login = require("./login");
const getCurrent = require("./getCurrent");
const logout = require("./logout");
const updateSubscription = require("./updateSubscription");
const updateAvatar = require("./updateAvatar");
const verifyEmail = require("./verifyEmail");

module.exports = {
    register,
    login,
    getCurrent,
    logout,
    updateSubscription,
    updateAvatar,
    verifyEmail
}