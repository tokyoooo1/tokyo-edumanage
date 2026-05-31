import { useEffect, useMemo, useState } from 'react'
import AdminLayout from '../layouts/AdminLayout'
import AcademicsPage from '../features/academics/pages/AcademicsPage'
import AttendancePage from '../features/attendance/pages/AttendancePage'
import CommunicationPage from '../features/communication/pages/CommunicationPage'
import DashboardPage from '../features/dashboard/pages/DashboardPage'
import FeesPage from '../features/fees/pages/FeesPage'
import ReportsPage from '../features/reports/pages/ReportsPage'
import StudentsPage from '../features/students/pages/StudentsPage'
import TeachersPage from '../features/teachers/pages/TeachersPage'
import NotFound from '../pages/NotFound'
import PrivateRoute from './PrivateRoute'
import { getRouteByPath } from './roleRoutes'

const pageComponents = {
  '/': DashboardPage,
  '/students': StudentsPage,
  '/attendance': AttendancePage,
  '/academics': AcademicsPage,
  '/fees': FeesPage,
  '/communication': CommunicationPage,
  '/teachers': TeachersPage,
  '/reports': ReportsPage,
}

function getHashPath() {
  return window.location.hash.replace('#', '') || '/'
}

export default function AppRoutes() {
  const [path, setPath] = useState(getHashPath)

  useEffect(() => {
    const handleHashChange = () => setPath(getHashPath())
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const route = useMemo(() => getRouteByPath(path), [path])
  const Page = pageComponents[path]

  return (
    <PrivateRoute allowedRoles={route?.allowedRoles}>
      <AdminLayout currentPath={path}>{Page ? <Page /> : <NotFound />}</AdminLayout>
    </PrivateRoute>
  )
}
