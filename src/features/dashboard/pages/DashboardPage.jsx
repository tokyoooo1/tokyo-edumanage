import { useFetch } from '../../../hooks/useFetch'
import { useAuth } from '../../../hooks/useAuth'
import { getDashboardMetrics } from '../dashboardService'

const workQueue = [
  'Review 6 pending student registrations',
  'Approve Grade 8 timetable changes',
  'Send fee reminders to overdue accounts',
  'Publish midterm assessment calendar',
]

const adminMetrics = [
  { label: 'Enrollment', value: '1,248', trend: '+42 students this term' },
  { label: 'Attendance rate', value: '94%', trend: '18 absence alerts pending' },
  { label: 'Fees collected', value: '₦7.62M', trend: '81% of term target' },
  { label: 'Reports ready', value: '12', trend: 'Academic and financial exports' },
]

const adminOperations = [
  { title: 'Enrollment', detail: 'Register students, upload documents, assign class sections', href: '#/students' },
  { title: 'Academics', detail: 'Oversee classes, subjects, timetable, exams, and grading', href: '#/academics' },
  { title: 'Fee collection', detail: 'Generate invoices, track payments, and follow up defaulters', href: '#/fees' },
  { title: 'Reports', detail: 'Export enrollment, attendance, academic, and financial reports', href: '#/reports' },
]

const parentMetrics = [
  { label: 'Child attendance', value: '96%', trend: '1 absence this month' },
  { label: 'Fee balance', value: '₦250K', trend: 'Due on June 10' },
  { label: 'Latest average', value: '82%', trend: 'Up 4% from last exam' },
  { label: 'Unread alerts', value: '3', trend: 'Attendance, fees, announcement' },
]

const parentQueue = [
  'Review Maya Johnson attendance alert for Monday',
  'Pay pending Term 2 tuition invoice',
  'Message Mathematics teacher about assessment feedback',
  'Download latest midterm progress summary',
]

const studentMetrics = [
  { label: 'Attendance', value: '96%', trend: 'Present 18 of 19 school days' },
  { label: 'Grade average', value: '82%', trend: 'Latest exams published' },
  { label: 'Assignments', value: '4', trend: '2 due this week' },
  { label: 'Announcements', value: '5', trend: '3 unread updates' },
]

const studentQueue = [
  'Check Monday timetable before first period',
  'Download Biology revision material',
  'Submit Mathematics assignment by Friday',
  'Review English test score and teacher feedback',
]

const teacherMetrics = [
  { label: 'Classes today', value: '5', trend: 'Grade 8 Blue first period' },
  { label: 'Attendance pending', value: '2', trend: 'Grade 7 Gold and Grade 9 Blue' },
  { label: 'Grades to enter', value: '36', trend: 'Mathematics midterm scripts' },
  { label: 'Parent messages', value: '8', trend: '3 awaiting reply' },
]

const teacherQueue = [
  'Take Grade 8 Blue attendance before 9:00 AM',
  'Enter Mathematics midterm scores',
  'Upload Biology revision material for Grade 9',
  'Reply to Ada Okafor about attendance concern',
]

export default function DashboardPage() {
  const { user } = useAuth()
  const { data: metrics = [] } = useFetch(getDashboardMetrics, [])
  const isParent = user?.role === 'parent'
  const isStudent = user?.role === 'student'
  const isTeacher = user?.role === 'teacher'
  const isAdmin = user?.role === 'admin'
  const visibleMetrics = isParent
    ? parentMetrics
    : isStudent
      ? studentMetrics
      : isTeacher
        ? teacherMetrics
        : adminMetrics.length
          ? adminMetrics
          : metrics
  const visibleQueue = isParent ? parentQueue : isStudent ? studentQueue : isTeacher ? teacherQueue : workQueue

  function openReports() {
    window.location.replace('#/reports')
  }

  function openFees() {
    window.location.replace('#/fees')
  }

  function openAcademics() {
    window.location.replace('#/academics')
  }

  function openAttendance() {
    window.location.replace('#/attendance')
  }

  return (
    <section className="page-stack">
      <div className="section-header">
        <div>
          <span className="eyebrow">Dashboard</span>
          <h2>
            {isParent
              ? "Your child's progress overview"
              : isStudent
                ? 'My timetable, grades, and assignments'
                : isTeacher
                  ? 'My classes, grading, and parent messages'
                  : 'Administrator command center'}
          </h2>
        </div>
        {isStudent ? (
          <button className="button" type="button" onClick={openAcademics}>
            View timetable
          </button>
        ) : isParent ? (
          <button className="button" type="button" onClick={openFees}>
            Pay fees
          </button>
        ) : isTeacher ? (
          <button className="button" type="button" onClick={openAttendance}>
            Take attendance
          </button>
        ) : (
          <button className="button" type="button" onClick={openReports}>
            New report
          </button>
        )}
      </div>

      <div className="metric-grid">
        {visibleMetrics?.map((metric) => (
          <article className="metric-card" key={metric.label}>
            <span>{metric.label}</span>
            <strong>{metric.value}</strong>
            <small>{metric.trend}</small>
          </article>
        ))}
      </div>

      {isAdmin ? (
        <div className="card-grid">
          {adminOperations.map((operation) => (
            <a className="module-card" href={operation.href} key={operation.title}>
              <span>Admin workflow</span>
              <h3>{operation.title}</h3>
              <p>{operation.detail}</p>
            </a>
          ))}
        </div>
      ) : null}

      <section className="list-panel">
        <div className="panel-title">
          <h3>
            {isParent
              ? 'Parent action center'
              : isStudent
                ? 'Student action center'
                : isTeacher
                  ? 'Teacher action center'
                  : 'Priority work'}
          </h3>
          <span>{isParent ? 'Child updates' : isStudent ? 'My next steps' : isTeacher ? 'Classroom tasks' : 'Admin queue'}</span>
        </div>
        {visibleQueue.map((item) => (
          <div className="list-row" key={item}>
            <strong>{item}</strong>
            <span className="status">Open</span>
          </div>
        ))}
      </section>
    </section>
  )
}
