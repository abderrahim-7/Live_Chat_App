const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    username : { type: String, required: true, unique: true },
    password : { type: String, required: true }
})

userSchema.methods.comparePassword = function (pass){
    return bcrypt.compare(pass, this.password);
}

module.exports =
  mongoose.models.User || mongoose.model("User", userSchema);