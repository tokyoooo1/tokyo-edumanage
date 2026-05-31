export const setStudents = (students) => ({
  type: 'students/setAll',
  payload: students,
})

export const selectStudent = (studentId) => ({
  type: 'students/select',
  payload: studentId,
})
