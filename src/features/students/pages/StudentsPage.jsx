import { useMemo, useState } from 'react'
import Modal from '../../../components/modals/Modal'
import { useAuth } from '../../../hooks/useAuth'
import { searchStudents } from '../studentService'
import { mockStudents } from '../studentAPI'

const emptyStudent = {
  name: '',
  dob: '',
  gender: '',
  address: '',
  className: '',
  section: '',
  guardian: '',
  guardianPhone: '',
  photoUrl: '',
  documents: [],
}

export default function StudentsPage() {
  const { user } = useAuth()
  const [query, setQuery] = useState('')
  const [students, setStudents] = useState(mockStudents)
  const [isAdding, setIsAdding] = useState(false)
  const [isImporting, setIsImporting] = useState(false)
  const [profileStudent, setProfileStudent] = useState(null)
  const [transferStudent, setTransferStudent] = useState(null)
  const [form, setForm] = useState(emptyStudent)
  const [transferForm, setTransferForm] = useState({ className: '', section: '' })
  const [importFileName, setImportFileName] = useState('')
  const [notice, setNotice] = useState('')
  const isTeacher = user?.role === 'teacher'
  const isAdmin = user?.role === 'admin'
  const filteredStudents = useMemo(() => searchStudents(students, query), [students, query])

  function updateForm(field, value) {
    setForm((current) => ({ ...current, [field]: value }))
  }

  function handlePhotoChange(event) {
    const file = event.target.files?.[0]

    if (!file) return

    updateForm('photoUrl', URL.createObjectURL(file))
  }

  function handleDocumentChange(event) {
    const files = Array.from(event.target.files ?? [])
    updateForm(
      'documents',
      files.map((file) => file.name),
    )
  }

  function handleAddStudent(event) {
    event.preventDefault()

    const student = {
      id: `ADM-2026-${String(students.length + 1).padStart(3, '0')}`,
      name: form.name,
      dob: form.dob,
      gender: form.gender,
      address: form.address,
      className: form.className,
      section: form.section,
      guardian: form.guardian,
      guardianPhone: form.guardianPhone,
      attendance: 100,
      status: 'Active',
      photoUrl: form.photoUrl,
      documents: form.documents,
    }

    setStudents((current) => [student, ...current])
    setForm(emptyStudent)
    setIsAdding(false)
    setNotice(`${student.name} has been registered and assigned to ${student.className}.`)
  }

  function handleBulkImport() {
    setIsImporting(true)
  }

  function openTransfer(student) {
    setTransferStudent(student)
    setTransferForm({ className: student.className, section: student.section })
  }

  function handleTransfer(event) {
    event.preventDefault()
    setStudents((current) =>
      current.map((student) =>
        student.id === transferStudent.id
          ? { ...student, className: transferForm.className, section: transferForm.section, status: 'Transferred' }
          : student,
      ),
    )
    setNotice(`${transferStudent.name} moved to ${transferForm.className} ${transferForm.section}.`)
    setTransferStudent(null)
  }

  function handleImport(event) {
    event.preventDefault()
    const importedStudents = [
      {
        id: `ADM-2026-${String(students.length + 1).padStart(3, '0')}`,
        name: 'Imported Student One',
        dob: '2014-01-10',
        gender: 'Female',
        address: 'Imported address',
        className: 'Grade 6',
        section: 'Green',
        guardian: 'Imported Guardian',
        guardianPhone: '+234 800 000 0000',
        attendance: 100,
        status: 'Imported',
        photoUrl: '',
        documents: [importFileName],
      },
    ]

    setStudents((current) => [...importedStudents, ...current])
    setNotice(`${importedStudents.length} student record imported from ${importFileName}.`)
    setImportFileName('')
    setIsImporting(false)
  }

  return (
    <section className="page-stack">
      <div className="section-header">
        <div>
          <span className="eyebrow">Student Management</span>
          <h2>{isTeacher ? 'My class roster and student progress' : 'Enrollment and profiles'}</h2>
        </div>
        {!isTeacher ? (
          <div className="topbar-actions">
            <button className="button" type="button" onClick={() => setIsAdding(true)}>
              Add student
            </button>
            {isAdmin ? (
              <button className="button button-secondary" type="button" onClick={handleBulkImport}>
                Bulk import
              </button>
            ) : null}
          </div>
        ) : null}
      </div>

      {isAdmin ? (
        <div className="notice">
          Administrator view: manage enrollment, student documents, guardian records, class assignment, search, and bulk import from one place.
        </div>
      ) : isTeacher ? (
        <div className="notice">
          Teacher view: use this roster to monitor attendance, grades, guardians, and class progress.
        </div>
      ) : null}

      {notice ? <div className="notice">{notice}</div> : null}

      <label className="search-box">
        <span>Search</span>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Name, admission number, class, guardian"
        />
      </label>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Student</th>
              <th>Photo</th>
              <th>Class</th>
              <th>Guardian</th>
              <th>Documents</th>
              <th>Attendance</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student) => (
                <tr key={student.id}>
                  <td>
                    <strong>{student.name}</strong>
                    <span>{student.id}</span>
                  </td>
                  <td>
                    {student.photoUrl ? (
                      <img className="student-photo" src={student.photoUrl} alt={student.name} />
                    ) : (
                      <span className="student-avatar">{student.name.slice(0, 1)}</span>
                    )}
                  </td>
                  <td>{student.className} {student.section}</td>
                  <td>{student.guardian}</td>
                  <td>{student.documents?.length ? student.documents.join(', ') : 'No documents'}</td>
                  <td>{student.attendance}%</td>
                  <td><span className="status">{student.status}</span></td>
                  <td>
                    <div className="topbar-actions">
                      <button className="button button-secondary" type="button" onClick={() => setProfileStudent(student)}>
                        View/edit
                      </button>
                      {isAdmin ? (
                        <button className="button button-secondary" type="button" onClick={() => openTransfer(student)}>
                          Promote/transfer
                        </button>
                      ) : null}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8">No students match your search.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isAdding ? (
        <Modal title="Enroll new student" onClose={() => setIsAdding(false)}>
          <form className="form-grid" onSubmit={handleAddStudent}>
            <label>
              Student photo
              <input accept="image/*" type="file" onChange={handlePhotoChange} />
            </label>
            {form.photoUrl ? (
              <img className="upload-preview" src={form.photoUrl} alt="Selected student preview" />
            ) : null}
            <label>
              Registration documents
              <input
                multiple
                accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                type="file"
                onChange={handleDocumentChange}
              />
            </label>
            {form.documents.length ? (
              <div className="upload-list">
                {form.documents.map((documentName) => (
                  <span key={documentName}>{documentName}</span>
                ))}
              </div>
            ) : null}
            <label>
              Student name
              <input
                required
                value={form.name}
                onChange={(event) => updateForm('name', event.target.value)}
              />
            </label>
            <label>
              Date of birth
              <input
                required
                type="date"
                value={form.dob}
                onChange={(event) => updateForm('dob', event.target.value)}
              />
            </label>
            <label>
              Gender
              <select required value={form.gender} onChange={(event) => updateForm('gender', event.target.value)}>
                <option value="">Select gender</option>
                <option>Female</option>
                <option>Male</option>
              </select>
            </label>
            <label>
              Address
              <input
                required
                value={form.address}
                onChange={(event) => updateForm('address', event.target.value)}
              />
            </label>
            <label>
              Class
              <input
                required
                value={form.className}
                onChange={(event) => updateForm('className', event.target.value)}
                placeholder="Grade 8"
              />
            </label>
            <label>
              Section
              <input
                required
                value={form.section}
                onChange={(event) => updateForm('section', event.target.value)}
                placeholder="Blue"
              />
            </label>
            <label>
              Guardian
              <input
                required
                value={form.guardian}
                onChange={(event) => updateForm('guardian', event.target.value)}
              />
            </label>
            <label>
              Guardian phone
              <input
                required
                value={form.guardianPhone}
                onChange={(event) => updateForm('guardianPhone', event.target.value)}
              />
            </label>
            <button className="button" type="submit">
              Save student
            </button>
          </form>
        </Modal>
      ) : null}

      {profileStudent ? (
        <Modal title="Student profile" onClose={() => setProfileStudent(null)}>
          <form
            className="form-grid"
            onSubmit={(event) => {
              event.preventDefault()
              setStudents((current) =>
                current.map((student) => (student.id === profileStudent.id ? profileStudent : student)),
              )
              setNotice(`${profileStudent.name} profile updated.`)
              setProfileStudent(null)
            }}
          >
            <label>
              Student name
              <input
                value={profileStudent.name}
                onChange={(event) => setProfileStudent((current) => ({ ...current, name: event.target.value }))}
              />
            </label>
            <label>
              Address
              <input
                value={profileStudent.address}
                onChange={(event) => setProfileStudent((current) => ({ ...current, address: event.target.value }))}
              />
            </label>
            <label>
              Guardian
              <input
                value={profileStudent.guardian}
                onChange={(event) => setProfileStudent((current) => ({ ...current, guardian: event.target.value }))}
              />
            </label>
            <label>
              Guardian phone
              <input
                value={profileStudent.guardianPhone}
                onChange={(event) => setProfileStudent((current) => ({ ...current, guardianPhone: event.target.value }))}
              />
            </label>
            <div className="notice">
              Admission number: {profileStudent.id} · Documents: {profileStudent.documents?.join(', ') || 'No documents'}
            </div>
            <button className="button" type="submit">
              Save profile
            </button>
          </form>
        </Modal>
      ) : null}

      {transferStudent ? (
        <Modal title="Promote or transfer student" onClose={() => setTransferStudent(null)}>
          <form className="form-grid" onSubmit={handleTransfer}>
            <div className="notice">{transferStudent.name} · {transferStudent.id}</div>
            <label>
              New class
              <input
                required
                value={transferForm.className}
                onChange={(event) => setTransferForm((current) => ({ ...current, className: event.target.value }))}
              />
            </label>
            <label>
              New section
              <input
                required
                value={transferForm.section}
                onChange={(event) => setTransferForm((current) => ({ ...current, section: event.target.value }))}
              />
            </label>
            <button className="button" type="submit">
              Update class assignment
            </button>
          </form>
        </Modal>
      ) : null}

      {isImporting ? (
        <Modal title="Bulk import students" onClose={() => setIsImporting(false)}>
          <form className="form-grid" onSubmit={handleImport}>
            <label>
              CSV or Excel file
              <input
                required
                accept=".csv,.xlsx,.xls"
                type="file"
                onChange={(event) => setImportFileName(event.target.files?.[0]?.name ?? '')}
              />
            </label>
            {importFileName ? <div className="notice">Selected file: {importFileName}</div> : null}
            <button className="button" type="submit">
              Import students
            </button>
          </form>
        </Modal>
      ) : null}
    </section>
  )
}
