const { Contact } = require("../../models");

const getAll = async (req, res) => {
    const { _id } = req.user;
    const { page = 1, limit = 10, favorite = false } = req.query;
    const isFavorite = favorite;    
    const skip = (page - 1) * limit;      
    if (isFavorite) {
        const result = await Contact.find({ owner: _id, favorite: true }, "", { skip, limit: Number(limit) }).populate("owner", "_id password email subscription");
        return res.json(result);
    } else {
        const result = await Contact.find({ owner: _id }, "", { skip, limit: Number(limit) }).populate("owner", "_id password email subscription");
        return res.json(result);
    }
}

module.exports = getAll;