import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { supabase } from '../lib/supabaseClient'

export default function AdminLogin() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('ceo@ccncdesign.com')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState('')

  async function handleAdminLogin(e) {
    e.preventDefault()

    setStatus('관리자 인증 중...')

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setStatus('관리자 인증 실패: ' + error.message)
      return
    }

    const user = data.user

    if (!user || user.email !== 'ceo@ccncdesign.com') {
      setStatus('관리자 권한이 없는 계정입니다.')
      return
    }

    sessionStorage.setItem('cc_admin_verified', 'true')
    sessionStorage.setItem('cc_admin_verified_at', String(Date.now()))

    navigate('/admin')
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-5">
      <form
        onSubmit={handleAdminLogin}
        className="w-full max-w-[420px] rounded-3xl border border-white/10 bg-white/[0.04] p-7 shadow-2xl"
      >
        <h1 className="text-2xl font-semibold mb-2">
          Admin Verification
        </h1>

        <p className="text-sm text-white/40 mb-6">
          관리자 앱 진입을 위해 계정을 다시 인증합니다.
        </p>

        <div className="space-y-4">
          <div>
            <label className="text-xs text-white/50">
              Admin Email
            </label>

            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full h-11 rounded-2xl bg-black/30 border border-white/10 px-4 text-sm outline-none focus:border-blue-400"
            />
          </div>

          <div>
            <label className="text-xs text-white/50">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full h-11 rounded-2xl bg-black/30 border border-white/10 px-4 text-sm outline-none focus:border-blue-400"
            />
          </div>

          <button
            type="submit"
            className="w-full h-11 rounded-2xl bg-blue-500 hover:bg-blue-400 text-white text-sm font-semibold transition"
          >
            Enter Admin App
          </button>
        </div>

        {status && (
          <p className="mt-4 text-sm text-white/50">
            {status}
          </p>
        )}
      </form>
    </div>
  )
}