const mongoose = require('mongoose');
const Schema = mongoose.Schema

// User Model
const Project = mongoose.model('Project', new Schema({
  title: String,
  description: String,
  task: Number
}));

module.exports = Project