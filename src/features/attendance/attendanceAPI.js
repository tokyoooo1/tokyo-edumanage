export const attendanceRoster = [
  { id: 'ADM-2026-001', name: 'Chinedu Okafor', className: 'Grade 8 Blue', status: 'Present' },
  { id: 'ADM-2026-002', name: 'Maya Johnson', className: 'Grade 8 Blue', status: 'Present' },
  { id: 'ADM-2026-003', name: 'Tariq Bello', className: 'Grade 9 Blue', status: 'Late' },
  { id: 'ADM-2026-004', name: 'Nora Mensah', className: 'Grade 8 Blue', status: 'Absent' },
]

export const subjectAttendanceRecords = [
  { id: 'SUB-001', className: 'Grade 8 Blue', subject: 'Mathematics', period: 'Period 1', present: 28, absent: 2, late: 1 },
  { id: 'SUB-002', className: 'Grade 8 Blue', subject: 'English Language', period: 'Period 2', present: 29, absent: 1, late: 1 },
  { id: 'SUB-003', className: 'Grade 9 Blue', subject: 'Biology', period: 'Period 3', present: 24, absent: 3, late: 2 },
]

export const attendanceReportSummaries = [
  { range: 'Daily', attendanceRate: '94%', present: 428, absent: 18, late: 11 },
  { range: 'Weekly', attendanceRate: '92%', present: 2112, absent: 96, late: 48 },
  { range: 'Monthly', attendanceRate: '91%', present: 8320, absent: 410, late: 177 },
]

export const initialLeaveRequests = [
  { id: 'LR-001', student: 'Maya Johnson', date: '2026-05-29', reason: 'Medical appointment', status: 'Pending' },
  { id: 'LR-002', student: 'Chinedu Okafor', date: '2026-05-30', reason: 'Family event', status: 'Approved' },
]

export async function fetchDailyAttendance() {
  return attendanceRoster
}
