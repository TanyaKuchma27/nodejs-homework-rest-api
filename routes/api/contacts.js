const express = require('express');

const { ctrlWrapper } = require("../../helpers");
const {contacts: ctrl} = require("../../controllers")

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getAll));

router.post("/", ctrlWrapper(ctrl.add));

module.exports = router;




// const express = require('express');
// const ctrl = require("../../controllers/contacts");
// const {ctrlWrapper} = require("../../helpers");
// const router = express.Router();

// router.get("/", ctrlWrapper(ctrl.getAll));

// router.get("/:contactId", ctrlWrapper(ctrl.getById));

// router.post("/", ctrlWrapper(ctrl.add));

// router.put("/:contactId", ctrlWrapper(ctrl.updateById));

// router.delete("/:contactId", ctrlWrapper(ctrl.removeById));

// module.exports = router;