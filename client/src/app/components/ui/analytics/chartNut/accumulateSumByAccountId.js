export function accumulateSumByAccountId(accountsWithSum, accountId, amount) {
  if (!accountsWithSum[accountId]) {
    accountsWithSum[accountId] = { sum: amount };
  } else {
    accountsWithSum[accountId].sum += amount;
  }
}
