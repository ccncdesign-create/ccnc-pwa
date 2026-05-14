import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { supabase } from '../lib/supabaseClient'

const ADMIN_EMAIL = 'ceo@ccncdesign.com'
const ADMIN_VERIFY_MAX_AGE = 30 * 60 * 1000

export default function Admin() {
  const navigate = useNavigate()

  const [status, setStatus] = useState('권한 확인 중...')
  const [profile, setProfile] = useState(null)
  const [isAllowed, setIsAllowed] = useState(false)

  useEffect(() => {
    async function checkRole() {
      const verified = sessionStorage.getItem('cc_admin_verified')
      const verifiedAt = Number(sessionStorage.getItem('cc_admin_verified_at') || 0)
      const isFresh = Date.now() - verifiedAt < ADMIN_VERIFY_MAX_AGE

      if (verified !== 'true' || !isFresh) {
        setStatus('관리자 재인증이 필요합니다.')
        navigate('/admin-login', { replace: true })
        return
      }

      const { data: sessionData } = await supabase.auth.getSession()
      const user = sessionData.session?.user

      if (!user) {
        sessionStorage.removeItem('cc_admin_verified')
        sessionStorage.removeItem('cc_admin_verified_at')
        setStatus('로그인이 필요합니다.')
        navigate('/login', { replace: true })
        return
      }

      if (user.email !== ADMIN_EMAIL) {
        sessionStorage.removeItem('cc_admin_verified')
        sessionStorage.removeItem('cc_admin_verified_at')
        setStatus('관리자 권한이 없는 계정입니다.')
        setIsAllowed(false)
        return
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('email, role, name')
        .eq('id', user.id)
        .single()

      if (error) {
        console.error(error)
        setStatus('프로필 정보를 불러오지 못했습니다.')
        setIsAllowed(false)
        return
      }

      if (data?.email !== ADMIN_EMAIL && data?.role !== 'admin') {
        sessionStorage.removeItem('cc_admin_verified')
        sessionStorage.removeItem('cc_admin_verified_at')
        setStatus('관리자 권한이 없습니다.')
        setIsAllowed(false)
        return
      }

      setProfile(data)
      setIsAllowed(true)
      setStatus('관리자 권한 확인 완료')
    }

    checkRole()
  }, [navigate])

  function handleExitAdmin() {
    sessionStorage.removeItem('cc_admin_verified')
    sessionStorage.removeItem('cc_admin_verified_at')
    navigate('/app')
  }

  if (!isAllowed) {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
        <h2 className="text-xl font-semibold mb-2">
          Admin
        </h2>

        <p className="text-sm text-white/60">
          {status}
        </p>
      </div>
    )
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
      <div className="flex items-start justify-between gap-4 mb-5">
        <div>
          <h2 className="text-xl font-semibold mb-2">
            Admin
          </h2>

          <p className="text-white/60">
            Administrator system dashboard.
          </p>
        </div>

        <button
          onClick={handleExitAdmin}
          className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 hover:bg-white/10 transition"
        >
          Exit Admin
        </button>
      </div>

      <div className="rounded-2xl bg-black/30 border border-white/10 p-4">
        <p className="text-sm text-emerald-300 mb-2">
          {status}
        </p>

        {profile && (
          <div className="text-sm text-white/50 space-y-1">
            <p>Email: {profile.email}</p>
            <p>Name: {profile.name}</p>
            <p>Role: {profile.role}</p>
          </div>
        )}
      </div>
    </div>
  )
}