import { useAuth } from './useAuth'

export function useRole() {
  const { user } = useAuth()

  return {
    role: user?.role ?? 'guest',
    isAdmin: user?.role === 'admin',
    isTeacher: user?.role === 'teacher',
    isStudent: user?.role === 'student',
    isParent: user?.role === 'parent',
  }
}
