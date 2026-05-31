import { fetchTeachers } from './teacherAPI'

export async function getTeachers() {
  return fetchTeachers()
}
