import { useState } from 'react'
import { useFetch } from '../../../hooks/useFetch'
import { getReports } from '../reportService'

export default function ReportsPage() {
  const { data: reports = [] } = useFetch(getReports, [])
  const [notice, setNotice] = useState('')

  function exportReports() {
    setNotice('Reports prepared for export: PDF, Excel, and CSV options are ready for backend integration.')
  }

  return (
    <section className="page-stack">
      <div className="section-header">
        <div>
          <span className="eyebrow">Reports & Analytics</span>
          <h2>Operational reporting center</h2>
        </div>
        <button className="button" type="button" onClick={exportReports}>
          Export
        </button>
      </div>

      {notice ? <div className="notice">{notice}</div> : null}

      <div className="notice">
        Administrator reporting: consolidate scattered school data into enrollment, attendance, academic, and financial exports.
      </div>

      <div className="card-grid">
        {reports?.map((report) => (
          <article className="module-card" key={report.id}>
            <span>{report.id}</span>
            <h3>{report.title}</h3>
            <p>{report.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
