export const academicItems = [
  { id: 'AC-01', title: 'Class setup', detail: '12 classes and 28 sections configured' },
  { id: 'AC-02', title: 'Subject management', detail: 'Subjects mapped to classes with teacher assignments' },
  { id: 'AC-03', title: 'Timetable', detail: 'Weekly timetable published for junior school' },
  { id: 'AC-04', title: 'Grade entry', detail: 'Second test scores open for teachers' },
  { id: 'AC-05', title: 'Grading system', detail: 'A-F percentage scale configured for all classes' },
  { id: 'AC-06', title: 'Report cards', detail: 'Draft report cards ready for review' },
  { id: 'AC-07', title: 'Exam management', detail: 'Midterm exams scheduled with rooms assigned' },
  { id: 'AC-08', title: 'Assignments', detail: 'Homework distribution and grading active' },
]

export async function fetchAcademicOverview() {
  return academicItems
}
