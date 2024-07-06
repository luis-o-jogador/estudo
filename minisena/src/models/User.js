const mongoose = require("../database/index");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  createdAT: {
    type: Date,
    default: Date.now
  },
  conta: {
    type: Number,
    required: true,
    default: 0
  }
});

UserSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
      try {
          const salt = await bcrypt.genSalt(10);
          this.password = await bcrypt.hash(this.password, salt);
      } catch (error) {
          next(error);
      }
  } else {
      next();
  }
});

const User = mongoose.model("User", UserSchema);

const findEditThenSave = (personId, amountToAdd, done) => {
  User.findById(personId, (err, person) => {
    if (err) return console.log(err);

    person.conta += amountToAdd;

    person.save((err, updatedPerson) => {
      if (err) return console.log(err);
      done(null, updatedPerson);
    });
  });
};

module.exports =User;
exports.findEditThenSave = findEditThenSave;