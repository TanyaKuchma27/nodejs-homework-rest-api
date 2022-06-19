const { Contact } = require("../../models");

const getAll = async (req, res)=> {
    const result = await Contact.find({}, (err, users) => {
        console.log(err, users)
    });
    res.json({
        status: "success",
        code: 200,
        data: {
            result
        }
    })
}

module.exports = getAll;

// find({}, (err, users) => {
//   console.log(err, users)
// })


// const contactsOperations = require("../../models/contacts");

// const getAll = async (req, res)=> {
//     const result = await contactsOperations.listContacts();
//     res.json(result);
// }

// module.exports = getAll;