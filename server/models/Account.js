const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    paymentId: { type: Schema.Types.ObjectId, ref: "Payment", required: true },
    bank: String,
    credit: Boolean,
    number: String,
  },
  { timestamps: true }
);

module.exports = model("Account", schema);
