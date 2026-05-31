import { useState } from 'react'
import Modal from '../../../components/modals/Modal'
import { useAuth } from '../../../hooks/useAuth'
import { formatInvoiceAmount } from '../feeService'
import { feeInvoices } from '../feeAPI'

const emptyInvoice = {
  student: '',
  amount: '',
  category: 'Tuition',
}

export default function FeesPage() {
  const { user } = useAuth()
  const [invoices, setInvoices] = useState(feeInvoices)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isPaying, setIsPaying] = useState(false)
  const [selectedInvoice, setSelectedInvoice] = useState(null)
  const [form, setForm] = useState(emptyInvoice)
  const [notice, setNotice] = useState('')
  const isParent = user?.role === 'parent'
  const isAdmin = user?.role === 'admin'

  function updateForm(field, value) {
    setForm((current) => ({ ...current, [field]: value }))
  }

  function handleGenerateInvoice(event) {
    event.preventDefault()

    const invoice = {
      id: `INV-${1001 + invoices.length}`,
      student: form.student,
      amount: Number(form.amount),
      status: 'Pending',
      category: form.category,
    }

    setInvoices((current) => [invoice, ...current])
    setForm(emptyInvoice)
    setIsGenerating(false)
    setNotice(`${invoice.id} generated for ${invoice.student}.`)
  }

  function openPayment(invoice) {
    setSelectedInvoice(invoice)
    setIsPaying(true)
  }

  function handlePayment(event) {
    event.preventDefault()
    setInvoices((current) =>
      current.map((invoice) =>
        invoice.id === selectedInvoice.id ? { ...invoice, status: 'Paid' } : invoice,
      ),
    )
    setNotice(`Payment recorded for ${selectedInvoice.id}. Receipt sent to parent account.`)
    setIsPaying(false)
    setSelectedInvoice(null)
  }

  return (
    <section className="page-stack">
      <div className="section-header">
        <div>
          <span className="eyebrow">{isParent ? 'Parent Fee Portal' : 'Fee Management'}</span>
          <h2>{isParent ? 'Pay fees and view receipts' : 'Invoices and payments'}</h2>
        </div>
        {!isParent ? (
          <button className="button" type="button" onClick={() => setIsGenerating(true)}>
            Generate invoices
          </button>
        ) : null}
      </div>

      {notice ? <div className="notice">{notice}</div> : null}

      {isAdmin ? (
        <div className="metric-grid">
          <article className="metric-card">
            <span>Collected</span>
            <strong>₦7.62M</strong>
            <small>81% of term target</small>
          </article>
          <article className="metric-card">
            <span>Outstanding</span>
            <strong>₦1.84M</strong>
            <small>23 unpaid invoices</small>
          </article>
          <article className="metric-card">
            <span>Overdue</span>
            <strong>7</strong>
            <small>Reminder alerts ready</small>
          </article>
          <article className="metric-card">
            <span>Waivers</span>
            <strong>5</strong>
            <small>Scholarships and sibling discounts</small>
          </article>
        </div>
      ) : null}

      <div className="list-panel">
        {invoices?.map((invoice) => (
          <div className="list-row" key={invoice.id}>
            <div>
              <strong>{invoice.student}</strong>
              <span>{invoice.id}{invoice.category ? ` · ${invoice.category}` : ''}</span>
            </div>
            <strong>{formatInvoiceAmount(invoice.amount)}</strong>
            <span className="status">{invoice.status}</span>
            {isParent && invoice.status !== 'Paid' ? (
              <button className="button" type="button" onClick={() => openPayment(invoice)}>
                Pay now
              </button>
            ) : null}
          </div>
        ))}
      </div>

      {isPaying ? (
        <Modal title="Pay school fees" onClose={() => setIsPaying(false)}>
          <form className="form-grid" onSubmit={handlePayment}>
            <div className="notice">
              {selectedInvoice.student} · {selectedInvoice.id} · {formatInvoiceAmount(selectedInvoice.amount)}
            </div>
            <label>
              Payment method
              <select required defaultValue="Card">
                <option>Card</option>
                <option>Bank transfer</option>
                <option>Mobile money</option>
              </select>
            </label>
            <label>
              Reference
              <input required placeholder="Payment reference or transaction ID" />
            </label>
            <button className="button" type="submit">
              Confirm payment
            </button>
          </form>
        </Modal>
      ) : null}

      {isGenerating ? (
        <Modal title="Generate fee invoice" onClose={() => setIsGenerating(false)}>
          <form className="form-grid" onSubmit={handleGenerateInvoice}>
            <label>
              Student
              <input
                required
                value={form.student}
                onChange={(event) => updateForm('student', event.target.value)}
                placeholder="Student full name"
              />
            </label>
            <label>
              Fee category
              <select value={form.category} onChange={(event) => updateForm('category', event.target.value)}>
                <option>Tuition</option>
                <option>Transport</option>
                <option>Uniform</option>
                <option>Exam</option>
              </select>
            </label>
            <label>
              Amount
              <input
                required
                min="1"
                type="number"
                value={form.amount}
                onChange={(event) => updateForm('amount', event.target.value)}
              />
            </label>
            <button className="button" type="submit">
              Create invoice
            </button>
          </form>
        </Modal>
      ) : null}
    </section>
  )
}
