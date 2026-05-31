import { useState } from 'react'
import Modal from '../../../components/modals/Modal'
import { useAuth } from '../../../hooks/useAuth'

const initialMessages = [
  {
    id: 'MSG-001',
    subject: 'Grade 8 parent meeting',
    audience: 'Grade 8 Parents',
    status: 'Scheduled',
  },
  {
    id: 'MSG-002',
    subject: 'Midterm assessment reminder',
    audience: 'All Students',
    status: 'Sent',
  },
]

export default function CommunicationPage() {
  const { user } = useAuth()
  const [messages, setMessages] = useState(initialMessages)
  const [isComposing, setIsComposing] = useState(false)
  const [notice, setNotice] = useState('')
  const isParent = user?.role === 'parent'
  const isStudent = user?.role === 'student'
  const isTeacher = user?.role === 'teacher'
  const isAdmin = user?.role === 'admin'
  const canCompose = !isStudent

  function handleSendMessage(event) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const message = {
      id: `MSG-${String(messages.length + 1).padStart(3, '0')}`,
      subject: data.get('subject'),
      audience: data.get('audience'),
      status: data.get('status'),
    }

    setMessages((current) => [message, ...current])
    setIsComposing(false)
    setNotice(`${message.subject} ${message.status === 'Sent' ? 'sent' : 'scheduled'}.`)
  }

  return (
    <section className="page-stack">
      <div className="section-header">
        <div>
          <span className="eyebrow">
            {isParent
              ? 'Parent-Teacher Communication'
              : isStudent
                ? 'Student Announcements'
                : isTeacher
                  ? 'Teacher Communication'
                  : 'Stakeholder Communication'}
          </span>
          <h2>
            {isParent
              ? "Message your child's teachers"
              : isStudent
                ? 'School updates and class notices'
                : isTeacher
                  ? 'Message parents and share class updates'
                  : 'Send announcements to parents, students, and staff'}
          </h2>
        </div>
        {canCompose ? (
          <button className="button" type="button" onClick={() => setIsComposing(true)}>
            {isParent ? 'Message teacher' : isTeacher ? 'Message parent' : 'New announcement'}
          </button>
        ) : null}
      </div>

      {isAdmin ? (
        <div className="notice">
          Administrator view: send school-wide notices, class-specific updates, SMS/email alerts, and event reminders.
        </div>
      ) : isStudent ? (
        <div className="notice">
          New announcement: Midterm assessment timetable has been published for your class.
        </div>
      ) : null}

      {notice ? <div className="notice">{notice}</div> : null}

      <div className="list-panel">
        {messages?.map((message) => (
          <div className="list-row" key={message.id}>
            <div>
              <strong>{message.subject}</strong>
              <span>{message.audience}</span>
            </div>
            <span className="status">{message.status}</span>
          </div>
        ))}
      </div>

      {isComposing ? (
        <Modal title={isParent ? 'Message teacher' : isTeacher ? 'Message parent' : 'Create announcement'} onClose={() => setIsComposing(false)}>
          <form className="form-grid" onSubmit={handleSendMessage}>
            <label>
              Subject
              <input
                name="subject"
                required
                placeholder={isParent ? 'Concern or question for teacher' : isTeacher ? 'Class update or concern' : 'Announcement subject'}
              />
            </label>
            <label>
              {isParent ? 'Teacher' : isTeacher ? 'Parent / Guardian' : 'Audience'}
              <select name="audience" defaultValue={isParent ? 'Mathematics Teacher' : isTeacher ? 'Ada Okafor' : 'All Parents'}>
                {isParent ? (
                  <>
                    <option>Mathematics Teacher</option>
                    <option>Class Teacher</option>
                    <option>English Teacher</option>
                  </>
                ) : isTeacher ? (
                  <>
                    <option>Ada Okafor</option>
                    <option>Ruth Johnson</option>
                    <option>Ibrahim Bello</option>
                    <option>Grade 8 Parents</option>
                  </>
                ) : (
                  <>
                    <option>All Parents</option>
                    <option>All Students</option>
                    <option>Grade 8 Parents</option>
                    <option>Teachers</option>
                  </>
                )}
              </select>
            </label>
            <label>
              Delivery
              <select name="status" defaultValue="Sent">
                <option>Sent</option>
                <option>Scheduled</option>
              </select>
            </label>
            <button className="button" type="submit">
              Send message
            </button>
          </form>
        </Modal>
      ) : null}
    </section>
  )
}
