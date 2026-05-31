import { fetchStudents } from './studentAPI'

export async function getStudents() {
  return fetchStudents()
}

export function searchStudents(students, query) {
  const searchTerm = query.trim().toLowerCase()

  if (!searchTerm) return students

  return students.filter((student) =>
    [student.name, student.id, student.className, student.section, student.guardian]
      .join(' ')
      .toLowerCase()
      .includes(searchTerm),
  )
}
