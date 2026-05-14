import { Navigate } from 'react-router-dom'

export default function AdminGuard({ children }) {
  const verified = sessionStorage.getItem('cc_admin_verified')
  const verifiedAt = Number(sessionStorage.getItem('cc_admin_verified_at') || 0)

  const maxAge = 30 * 60 * 1000
  const isFresh = Date.now() - verifiedAt < maxAge

  if (verified !== 'true' || !isFresh) {
    return <Navigate to="/admin-login" replace />
  }

  return children
}