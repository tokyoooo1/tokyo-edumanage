import LoginPage from '../features/auth/pages/LoginPage'
import Unauthorized from '../pages/Unauthorized'
import { useAuth } from '../hooks/useAuth'

export default function PrivateRoute({ allowedRoles = [], children }) {
  const { user, isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <LoginPage />
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return <Unauthorized message="Your account does not have access to this area." />
  }

  return children
}
