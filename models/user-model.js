const mongoose = require("mongoose");
let bcrypt = require("bcrypt");
let SALT_WORK_FACTOR = 10;

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter name"],
  },
  surname: {
    type: String,
    required: [true, "Please enter surname"],
  },
  email: {
    type: String,
    required: [true, "Please enter email"],
    index: { unique: true },
  },
  password: { type: String, required: [true, "Please enter password"] },
});

userSchema.pre("save", async function (next) {
  var user = this;
  try {
    if (!user.isModified("password")) return next();

    bcrypt.hash(user.password, SALT_WORK_FACTOR, function (err, hash) {
      if (err) throw err;
      user.password = hash;
    });

    next();
  } catch (err) {
    return next(err);
  }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("user", userSchema);
module.exports = User;
