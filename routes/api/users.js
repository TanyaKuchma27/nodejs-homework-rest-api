const express = require('express');

const { ctrlWrapper } = require("../../helpers");
const { auth, validation, upload } = require("../../middlewares");
const { auth: ctrl } = require("../../controllers");
const { joiRegisterSchema, joiLoginSchema, subscriptionJoiSchema } = require("../../models/user");

const router = express.Router();

router.post("/signup", validation(joiRegisterSchema), ctrlWrapper(ctrl.register));

router.post("/login", validation(joiLoginSchema), ctrlWrapper(ctrl.login));

router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));

router.get("/logout", auth, ctrlWrapper(ctrl.logout));

router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verifyEmail));

router.patch("/", auth, validation(subscriptionJoiSchema), ctrlWrapper(ctrl.updateSubscription));

router.patch("/avatars", auth, upload.single("avatar"), ctrlWrapper(ctrl.updateAvatar));

module.exports = router;