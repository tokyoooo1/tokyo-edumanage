export const teachers = [
  { id: 'TCH-001', name: 'Grace Williams', subject: 'Mathematics', classes: 4 },
  { id: 'TCH-002', name: 'Samuel Adeyemi', subject: 'English Language', classes: 5 },
  { id: 'TCH-003', name: 'Fatima Hassan', subject: 'Biology', classes: 3 },
]

export async function fetchTeachers() {
  return teachers
}
