const { Contact } = require("../../models");
const { createError } = require("../../helpers");

const updateStatusContact = async (req, res) => {
    const { contactId } = req.params;
    const { favorite } = req.body;
    const result = await Contact.findByIdAndUpdate(contactId, {favorite}, {new: true});
    if (!result) {
        throw createError(404);
    }
    res.json(result);
}

module.exports = updateStatusContact;