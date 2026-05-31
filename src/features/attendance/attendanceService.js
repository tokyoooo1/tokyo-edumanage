import { fetchDailyAttendance } from './attendanceAPI'

export async function getDailyAttendance() {
  return fetchDailyAttendance()
}

export function summarizeAttendance(records) {
  return records.reduce((summary, record) => {
    summary[record.status] = (summary[record.status] ?? 0) + 1
    return summary
  }, {})
}

export function createAbsenceAlerts(records) {
  return records
    .filter((record) => record.status === 'Absent')
    .map((record) => ({
      id: `ALERT-${record.id}`,
      student: record.name,
      guardian: 'Parent / Guardian',
      message: `${record.name} was marked absent today. Parent notification queued.`,
      status: 'Queued',
    }))
}
