export async function getReports() {
  return [
    { id: 'RP-01', title: 'Dashboard KPIs', description: 'Enrollment, attendance, fees, and results' },
    { id: 'RP-02', title: 'Student reports', description: 'Individual performance and history' },
    { id: 'RP-04', title: 'Financial reports', description: 'Revenue, collections, and outstanding fees' },
    { id: 'RP-05', title: 'Export reports', description: 'PDF, Excel, and CSV download formats' },
  ]
}
