const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  fullName:{type: String, required:true},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  age: { type: Number, required: true }, // Adding age field
  gender: { 
    type: String, 
    required: true, 
    enum: ['Male', 'Female', 'Other'] // Restrict gender to specific values
  },
});

module.exports = mongoose.model('User', UserSchema);
