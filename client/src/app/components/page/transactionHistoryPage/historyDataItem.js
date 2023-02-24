const HistoryDataItem = ({
  accountId,
  gainId = null,
  spendingId = null,
  expenseId = null,
  date,
  amount,
  comment = "",
}) => ({
  accountId,
  gainId,
  spendingId,
  expenseId,
  date,
  amount,
  comment,
});
export default HistoryDataItem;
