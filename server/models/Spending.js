const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    accountId: { type: Schema.Types.ObjectId, ref: "Account", required: true },
    expenseId: {
      type: Schema.Types.ObjectId,
      ref: "Expense-Type",
      required: true,
    },
    amount: Number,
    comment: String,
    date: String,
  },
  { timestamps: true }
);

module.exports = model("Spending", schema);
