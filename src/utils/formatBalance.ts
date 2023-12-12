import BigNumber from 'bignumber.js'

export const BIG_TEN = new BigNumber(10)

BigNumber.set({
  EXPONENTIAL_AT: 50,
})

export const getDecimalAmount = (amount: string | number, decimals = 18) => {
  return new BigNumber(amount).times(BIG_TEN.pow(decimals))
}

export const getBalanceAmount = (amount: string | number, decimals = 18) => {
  return new BigNumber(amount).dividedBy(BIG_TEN.pow(decimals))
}

export const getBalanceNumber = (balance: string | number, decimals = 18) => {
  if (balance) {
    return getBalanceAmount(balance, decimals).toNumber()
  }
  return 0
}

export const getFullDisplayBalance = (balance: string | number, decimals = 18, decimalsToAppear = 2) => {
  return getBalanceAmount(balance, decimals).toFixed(decimalsToAppear)
}

export const getAmountString = (amount: number, decimals = 3) => {
  return amount.toFixed(decimals)
}