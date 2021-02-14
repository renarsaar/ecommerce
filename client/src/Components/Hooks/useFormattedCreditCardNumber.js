// Return formatted credit card number
export default function useFormattedCreditCardNumber(cardNumber) {
  let formattedCardNumber = '';

  // Add spaces between every 4th number
  for (let i = 0; i < cardNumber.length; i++) {
    if (i % 4 === 0 && i > 0) formattedCardNumber = formattedCardNumber.concat(' ');
    formattedCardNumber = formattedCardNumber.concat(cardNumber[i]);
  }

  return formattedCardNumber;
}
