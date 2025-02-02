
const express = require("express");
const Joi = require("joi");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,

} = require("../../models/contacts");
const { createError } = require("../../helpers");
const router = express.Router();
const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required()
});
router.get("/", async (req, res, next) => {
  try {
    const result = await listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const {contactId} = req.params;
    const result = await getContactById(contactId);
    if(!result){
        throw createError(404);
    }
    res.json(result);
} catch (error) {
   next(error);
}
});

router.post("/", async (req, res, next) => {
  try {
    const {error} = schema.validate(req.body);
    if(error){ 
        throw createError(400, error.message);
    }
    const result = await addContact(req.body);
    res.status(201).json(result);
} catch (error) {
    next(error);
}
});
router.delete("/:contactId", async (req, res, next) => {
  try {
    const {contactId} = req.params;
    const result = await removeContact(contactId);
    if(!result){
        createError(404);
    }
    res.json({
        message: "contact deleted"
    })
} catch (error) {
    next(error);
}
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const {error} = schema.validate(req.body);
    if(error){ 
        throw createError(400, error.message);
    }
    const {contactId} = req.params;
    const result = await updateContact(contactId, req.body);
    if(!result){
        throw createError(404);
    }
    res.json(result);
} catch (error) {
    next(error);
}
});
module.exports = router;


