export async function getDashboardMetrics() {
  return [
    { label: 'Total students', value: '1,248', trend: '+42 this term' },
    { label: 'Attendance rate', value: '94%', trend: '+3% from last week' },
    { label: 'Fees collected', value: '₦7.62M', trend: '81% of target' },
    { label: 'Pending alerts', value: '18', trend: 'Absences and fees' },
  ]
}
