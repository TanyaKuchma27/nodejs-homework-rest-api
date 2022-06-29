const express = require('express');

const { auth, validation, ctrlWrapper } = require("../../helpers");
const { auth: ctrl } = require("../../controllers");
const { joiRegisterSchema, joiLoginSchema, subscriptionJoiSchema } = require("../../models/user");

const router = express.Router();

router.post("/signup", validation(joiRegisterSchema), ctrlWrapper(ctrl.register));

router.post("/login", validation(joiLoginSchema), ctrlWrapper(ctrl.login));

router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));

router.get("/logout", auth, ctrlWrapper(ctrl.logout));

router.patch("/", auth, validation(subscriptionJoiSchema), ctrlWrapper(ctrl.updateSubscription));

module.exports = router;