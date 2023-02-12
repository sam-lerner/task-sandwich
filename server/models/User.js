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
    required: true,
    unique: true,
    trim: true
  },

  password: {
    type: String,
    required: true,
    trim: true,
    min_length: 8
  },
  teams: [{
    type: Schema.Types.ObjectId,
    ref: 'team'
  }],

  projects: [{
    type: Schema.Types.ObjectId,
    ref: 'project'
  }],

  nextSandwichReset: {
    type: Date,
    default: Date.now
  },
  
  sandwichCount: {
    type: Number
  },
  
  sandwichReceived: {
    type: Number
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

const User = model('user', userSchema);

module.exports = User;
