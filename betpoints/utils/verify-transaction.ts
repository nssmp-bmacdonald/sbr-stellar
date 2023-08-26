interface ITransactionValidation {
  isValid: boolean;
  message: string;
}

export function validateTransaction(
  amount: string | undefined,
  type: 'credit' | 'debit',
  betpointsBalance: number,
  chalklineBalance: number
): ITransactionValidation {
  if (!amount) {
    return {
      isValid: false,
      message: 'Enter amount to transfer',
    };
  }

  if (!Number.isInteger(+amount) || +amount <= 0) {
    return {
      isValid: false,
      message: 'Enter an integer to transfer',
    };
  }

  if (type === 'credit') {
    if (!chalklineBalance) {
      return {
        isValid: false,
        message: 'Invalid Contests balance',
      };
    }
    if (+amount > chalklineBalance) {
      return {
        isValid: false,
        message: 'Insufficient Contests balance',
      };
    }
  } else if (type === 'debit') {
    if (!betpointsBalance) {
      return {
        isValid: false,
        message: 'Invalid Betpoints balance',
      };
    }
    if (+amount > betpointsBalance) {
      return {
        isValid: false,
        message: 'Insufficient Betpoints balance',
      };
    }
  }

  return {
    isValid: true,
    message: 'Success',
  };
}
