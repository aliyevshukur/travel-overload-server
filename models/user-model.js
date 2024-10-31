const mongoose = require("mongoose");
let bcrypt = require("bcrypt");
const SALT_WORK_FACTOR = 10;

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
  profilePicture: {
    type: String,
    required: [true, "Please enter profile picture"],
    default:
      "https://res.cloudinary.com/dzmq4caru/image/upload/v1728741326/sq6upu48ildg54oky2jf.jpg",
  },
  role: {
    type: String,
    required: [true, "Please enter user role"],
    default: "user",
    enum: ["user", "admin"],
  },
});

userSchema.pre("save", async function (next) {
  var user = this;
  try {
    if (!user.isModified("password")) return next();

    bcrypt.hash(user.password, SALT_WORK_FACTOR, function (err, hash) {
      // if (err) throw err;
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

const User = mongoose.model("User", userSchema);
module.exports = User;
module.exports.SALT_WORK_FACTOR = SALT_WORK_FACTOR;
