export const feeInvoices = [
  { id: 'INV-1001', student: 'Chinedu Okafor', amount: 250000, status: 'Paid' },
  { id: 'INV-1002', student: 'Maya Johnson', amount: 250000, status: 'Pending' },
  { id: 'INV-1003', student: 'Tariq Bello', amount: 275000, status: 'Overdue' },
]

export async function fetchFeeInvoices() {
  return feeInvoices
}
