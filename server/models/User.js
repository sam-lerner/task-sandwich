const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema({

  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },

  email: {
    type: String,
    required:true,
    unique: true,
    trim: true
  },

  password: {
    type:String,
    required: true,
    trim: true,
    min_length: 8
  },
  teams: [/*teams*/],

  projects: [/*projects*/],

  sandwichCount: {
    type: Int16Array
  }

});

userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;
