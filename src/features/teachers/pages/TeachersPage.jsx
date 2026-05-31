import { useState } from 'react'
import Modal from '../../../components/modals/Modal'
import { teachers as initialTeachers } from '../teacherAPI'

export default function TeachersPage() {
  const [teachers, setTeachers] = useState(initialTeachers)
  const [isAdding, setIsAdding] = useState(false)
  const [notice, setNotice] = useState('')

  function handleAddTeacher(event) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const teacher = {
      id: `TCH-${String(teachers.length + 1).padStart(3, '0')}`,
      name: data.get('name'),
      subject: data.get('subject'),
      classes: Number(data.get('classes')),
    }

    setTeachers((current) => [teacher, ...current])
    setIsAdding(false)
    setNotice(`${teacher.name} added and assigned to ${teacher.subject}.`)
  }

  return (
    <section className="page-stack">
      <div className="section-header">
        <div>
          <span className="eyebrow">Teacher Management</span>
          <h2>Profiles and assignments</h2>
        </div>
        <button className="button" type="button" onClick={() => setIsAdding(true)}>
          Add teacher
        </button>
      </div>

      {notice ? <div className="notice">{notice}</div> : null}

      <div className="card-grid">
        {teachers?.map((teacher) => (
          <article className="module-card" key={teacher.id}>
            <span>{teacher.id}</span>
            <h3>{teacher.name}</h3>
            <p>{teacher.subject}</p>
            <strong>{teacher.classes} classes</strong>
          </article>
        ))}
      </div>

      {isAdding ? (
        <Modal title="Add teacher profile" onClose={() => setIsAdding(false)}>
          <form className="form-grid" onSubmit={handleAddTeacher}>
            <label>
              Teacher name
              <input name="name" required />
            </label>
            <label>
              Subject
              <input name="subject" required />
            </label>
            <label>
              Assigned classes
              <input name="classes" min="1" required type="number" />
            </label>
            <button className="button" type="submit">
              Save teacher
            </button>
          </form>
        </Modal>
      ) : null}
    </section>
  )
}
