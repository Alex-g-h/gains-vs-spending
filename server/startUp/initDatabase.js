const Payment = require("../models/Payment.js");
const ExpenseType = require("../models/ExpenseType");
const paymentMock = require("../mock/payment.json");
const expenseTypesMock = require("../mock/expense-types.json");

module.exports = async () => {
  console.log(Payment);
  const payments = await Payment.find();
  if (payments.length !== paymentMock.length) {
    await createInitialEntity(Payment, paymentMock);
  }

  const expenseTypes = await ExpenseType.find();
  if (expenseTypes.length !== expenseTypesMock.length) {
    await createInitialEntity(ExpenseType, expenseTypesMock);
  }
};

async function createInitialEntity(Model, data) {
  await Model.collection.drop();

  return Promise.all(
    data.map(async (item) => {
      try {
        delete item._id;
        const newItem = new Model(item);
        await newItem.save();
        return newItem;
      } catch (error) {
        return error;
      }
    })
  );
}
