export const formatAddress = (
    address: string | null | undefined,
    onlyPrefix = false,
    length = 8,
  ) => {
    if (!address || typeof address === 'undefined') {
      return ''
    }
    if (address.length < 15) {
      return address
    }
  
    if (onlyPrefix) {
      return address.slice(0, 30) + '...'
    }
    if (typeof address === 'object') {
      address = address['receiver']
    }
  
    return (
      address.slice(0, length) +
      '...' +
      address.slice(address.length - length, address.length)
    )
  }
  