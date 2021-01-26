export default function currencyFilter(value, currency = 'RUB') {
  const options = {
    style: 'currency',
    currency
  }

  return new Intl.NumberFormat('ru-Ru', options).format(value)
}
