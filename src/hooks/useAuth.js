import { useAppStore } from '../app/store'

const roleProfiles = {
  admin: {
    id: 'USR-001',
    name: 'Amina Carter',
    role: 'admin',
    title: 'School Administrator',
    school: 'EduManage Academy',
  },
  teacher: {
    id: 'USR-002',
    name: 'Grace Williams',
    role: 'teacher',
    title: 'Class Teacher',
    school: 'EduManage Academy',
  },
  student: {
    id: 'USR-003',
    name: 'Maya Johnson',
    role: 'student',
    title: 'Student',
    school: 'EduManage Academy',
  },
  parent: {
    id: 'USR-004',
    name: 'Ada Okafor',
    role: 'parent',
    title: 'Parent / Guardian',
    school: 'EduManage Academy',
  },
}

export function useAuth() {
  const { state, dispatch } = useAppStore()

  return {
    ...state.auth,
    login: (user) => dispatch({ type: 'auth/login', payload: user }),
    loginAsRole: (role) => dispatch({ type: 'auth/login', payload: roleProfiles[role] }),
    logout: () => dispatch({ type: 'auth/logout' }),
  }
}
