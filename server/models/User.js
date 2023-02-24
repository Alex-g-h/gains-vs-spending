const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    sex: { type: String, enum: ["male" | "female" | "other"] },
    license: Boolean,
  },
  { timestamps: true }
);

module.exports = model("User", schema);
