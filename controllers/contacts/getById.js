const { createError } = require("../../helpers");
const {Contact} = require("../../models");
const mongoose = require("mongoose");

const getById = async (req, res) => {
    const { contactId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(contactId)) {
        throw createError(404);
    }
    const result = await Contact.findById(contactId);
    res.json(result);
}

module.exports = getById;