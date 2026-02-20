const mongoose = require("mongoose");

const SettingsSchema = new mongoose.Schema({
  cvUrl: String,
  cvPublicId: String,
});

module.exports = mongoose.model("Settings", SettingsSchema);
