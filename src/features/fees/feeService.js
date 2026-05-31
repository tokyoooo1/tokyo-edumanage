import { currency } from '../../utils/helpers'
import { fetchFeeInvoices } from './feeAPI'

export async function getFeeInvoices() {
  return fetchFeeInvoices()
}

export function formatInvoiceAmount(amount) {
  return currency(amount)
}
