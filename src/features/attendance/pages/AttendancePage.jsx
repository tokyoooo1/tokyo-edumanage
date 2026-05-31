import { useState } from 'react'
import Modal from '../../../components/modals/Modal'
import { ATTENDANCE_STATUS } from '../../../utils/constants'
import { useAuth } from '../../../hooks/useAuth'
import { createAbsenceAlerts, summarizeAttendance } from '../attendanceService'
import {
  attendanceReportSummaries,
  attendanceRoster,
  initialLeaveRequests,
  subjectAttendanceRecords,
} from '../attendanceAPI'

export default function AttendancePage() {
  const { user } = useAuth()
  const [attendance, setAttendance] = useState(attendanceRoster)
  const [subjectAttendance, setSubjectAttendance] = useState(subjectAttendanceRecords)
  const [leaveRequests, setLeaveRequests] = useState(initialLeaveRequests)
  const [isRequestingLeave, setIsRequestingLeave] = useState(false)
  const [classFilter, setClassFilter] = useState('Grade 8 Blue')
  const [subjectForm, setSubjectForm] = useState({
    className: 'Grade 8 Blue',
    subject: 'Mathematics',
    period: 'Period 1',
  })
  const [notice, setNotice] = useState('')
  const isParent = user?.role === 'parent'
  const isStudent = user?.role === 'student'
  const canEdit = user?.role === 'admin' || user?.role === 'teacher'
  const canRequestLeave = isParent || isStudent
  const visibleAttendance = attendance.filter((record) => record.className === classFilter)
  const summary = summarizeAttendance(visibleAttendance)
  const absenceAlerts = createAbsenceAlerts(attendance)

  function updateStatus(studentId, status) {
    setAttendance((records) =>
      records.map((record) => (record.id === studentId ? { ...record, status } : record)),
    )
  }

  function submitAttendance() {
    const absentCount = visibleAttendance.filter((record) => record.status === 'Absent').length
    setNotice(`${classFilter} attendance submitted. ${absentCount} parent alert${absentCount === 1 ? '' : 's'} queued.`)
  }

  function saveSubjectAttendance(event) {
    event.preventDefault()
    setSubjectAttendance((current) => [
      {
        id: `SUB-${String(current.length + 1).padStart(3, '0')}`,
        ...subjectForm,
        present: 30,
        absent: 1,
        late: 1,
      },
      ...current,
    ])
    setNotice(`${subjectForm.subject} ${subjectForm.period} attendance saved for ${subjectForm.className}.`)
  }

  function submitLeaveRequest(event) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const request = {
      id: `LR-${String(leaveRequests.length + 1).padStart(3, '0')}`,
      student: data.get('student'),
      date: data.get('date'),
      reason: data.get('reason'),
      status: 'Pending',
    }

    setLeaveRequests((current) => [request, ...current])
    setIsRequestingLeave(false)
    setNotice(`Leave request submitted for ${request.student}.`)
  }

  return (
    <section className="page-stack">
      <div className="section-header">
        <div>
          <span className="eyebrow">
            {isParent ? 'Parent Attendance Monitor' : 'Attendance Management'}
          </span>
          <h2>
            {isParent
              ? "Your child's attendance and absence alerts"
              : isStudent
                ? 'My attendance record'
                : 'Daily class attendance'}
          </h2>
        </div>
        {canEdit ? (
          <div className="topbar-actions">
            <button className="button" type="button" onClick={submitAttendance}>
              Submit attendance
            </button>
          </div>
        ) : canRequestLeave ? (
          <button className="button" type="button" onClick={() => setIsRequestingLeave(true)}>
            Request leave
          </button>
        ) : null}
      </div>

      {isParent ? (
        <div className="notice">
          Real-time alert: Nora Mensah was marked absent today. Contact the class teacher if this is incorrect.
        </div>
      ) : null}

      {notice ? <div className="notice">{notice}</div> : null}

      <label className="search-box">
        <span>Class</span>
        <select value={classFilter} onChange={(event) => setClassFilter(event.target.value)}>
          <option>Grade 8 Blue</option>
          <option>Grade 9 Blue</option>
        </select>
      </label>

      <div className="metric-grid">
        {ATTENDANCE_STATUS.map((status) => (
          <article className="metric-card" key={status}>
            <span>{status}</span>
            <strong>{summary[status] ?? 0}</strong>
          </article>
        ))}
      </div>

      <div className="list-panel">
        <div className="panel-title">
          <h3>Daily attendance</h3>
          <span>AT-01 · Present, absent, late, excused per class</span>
        </div>
        {visibleAttendance?.map((record) => (
          <div className="list-row" key={record.id}>
            <div>
              <strong>{record.name}</strong>
              <span>{record.id}</span>
            </div>
            {canEdit ? (
              <select value={record.status} onChange={(event) => updateStatus(record.id, event.target.value)}>
                {ATTENDANCE_STATUS.map((status) => (
                  <option key={status}>{status}</option>
                ))}
              </select>
            ) : (
              <span className="status">{record.status}</span>
            )}
          </div>
        ))}
      </div>

      {canEdit ? (
        <section className="list-panel">
          <div className="panel-title">
            <h3>Subject attendance</h3>
            <span>AT-02 · Track by subject and period</span>
          </div>
          <form className="form-grid panel-form" onSubmit={saveSubjectAttendance}>
            <label>
              Class
              <select
                value={subjectForm.className}
                onChange={(event) => setSubjectForm((current) => ({ ...current, className: event.target.value }))}
              >
                <option>Grade 8 Blue</option>
                <option>Grade 9 Blue</option>
              </select>
            </label>
            <label>
              Subject
              <input
                value={subjectForm.subject}
                onChange={(event) => setSubjectForm((current) => ({ ...current, subject: event.target.value }))}
              />
            </label>
            <label>
              Period
              <select
                value={subjectForm.period}
                onChange={(event) => setSubjectForm((current) => ({ ...current, period: event.target.value }))}
              >
                <option>Period 1</option>
                <option>Period 2</option>
                <option>Period 3</option>
                <option>Period 4</option>
              </select>
            </label>
            <button className="button" type="submit">
              Save subject attendance
            </button>
          </form>
          {subjectAttendance.map((record) => (
            <div className="list-row" key={record.id}>
              <div>
                <strong>{record.subject}</strong>
                <span>{record.className} · {record.period}</span>
              </div>
              <span>Present {record.present}</span>
              <span>Absent {record.absent}</span>
              <span>Late {record.late}</span>
            </div>
          ))}
        </section>
      ) : null}

      <section className="list-panel">
        <div className="panel-title">
          <h3>Attendance reports</h3>
          <span>AT-03 · Daily, weekly, monthly summaries</span>
        </div>
        {attendanceReportSummaries.map((report) => (
          <div className="list-row" key={report.range}>
            <div>
              <strong>{report.range}</strong>
              <span>Attendance rate {report.attendanceRate}</span>
            </div>
            <span>Present {report.present}</span>
            <span>Absent {report.absent}</span>
            <span>Late {report.late}</span>
          </div>
        ))}
      </section>

      <section className="list-panel">
        <div className="panel-title">
          <h3>Absence alerts</h3>
          <span>AT-04 · Parent notifications</span>
        </div>
        {absenceAlerts.length ? (
          absenceAlerts.map((alert) => (
            <div className="list-row" key={alert.id}>
              <div>
                <strong>{alert.student}</strong>
                <span>{alert.message}</span>
              </div>
              <span className="status">{alert.status}</span>
            </div>
          ))
        ) : (
          <div className="list-row">
            <strong>No absence alerts queued.</strong>
          </div>
        )}
      </section>

      <section className="list-panel">
        <div className="panel-title">
          <h3>Leave requests</h3>
          <span>AT-05 · Parent/student applications</span>
        </div>
        {leaveRequests.map((request) => (
          <div className="list-row" key={request.id}>
            <div>
              <strong>{request.student}</strong>
              <span>{request.date} · {request.reason}</span>
            </div>
            <span className="status">{request.status}</span>
          </div>
        ))}
      </section>

      {isRequestingLeave ? (
        <Modal title="Submit leave request" onClose={() => setIsRequestingLeave(false)}>
          <form className="form-grid" onSubmit={submitLeaveRequest}>
            <label>
              Student
              <input name="student" required defaultValue={isStudent ? user?.name : 'Maya Johnson'} />
            </label>
            <label>
              Leave date
              <input name="date" required type="date" />
            </label>
            <label>
              Reason
              <input name="reason" required placeholder="Medical appointment, family event, etc." />
            </label>
            <button className="button" type="submit">
              Submit request
            </button>
          </form>
        </Modal>
      ) : null}
    </section>
  )
}
