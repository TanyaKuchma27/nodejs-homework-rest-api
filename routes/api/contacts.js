const express = require('express')

const contactOperations = require("../../models/contacts")

const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const contacts = await contactOperations.listContacts();
    res.json({
      status: "success",
      code: 200,
      data: {
        result: contacts
      }
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      code: 500,
      message: "Server error"
    })
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const {contactId} = req.params;   
    const result = await contactOperations.getContactById(contactId);
    res.json({
      status: "success",
      code: 200,
      data: {
        result
      }
    })
  } catch (error) {
    res.status(500).json({
      status: "error",
      code: 500,
      message: "Server error"
    })
  }
});

router.post('/', async (req, res, next) => {
  res.json({ message: 'template message' })
});

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
});

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
});

module.exports = router;
