const {Schema, model} = require('mongoose')
const Joi = require("joi");

const emailRegexp = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/;

const userSchema = Schema({
    password: {
      type: String,
      minlength: 6,
      required: [true, 'Password is required'],
    },
    email: {
      type: String,
      match: emailRegexp,
      required: [true, 'Email is required'],
      unique: true,
    },
    token: {
      type: String,
      default: null,
    },
  }, {versionKey: false, timestamps: true});

  const User = model('user', userSchema);

  const addUserSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
    token: Joi.string()
});

  module.exports = { User, addUserSchema };