import { useState } from 'react'

import { supabase } from '../lib/supabaseClient'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState('')

  async function handleLogin(e) {
    e.preventDefault()
    setStatus('로그인 중...')

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setStatus(error.message)
      return
    }

    setStatus('로그인 성공')
    window.location.href = '/'
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-5">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm rounded-3xl border border-white/10 bg-white/5 p-6"
      >
        <h1 className="text-2xl font-semibold mb-2">CC&C OS</h1>

        <p className="text-sm text-white/50 mb-6">
          관리자 또는 직원 계정으로 로그인
        </p>

        <input
          className="w-full mb-3 rounded-xl bg-black/30 border border-white/10 px-4 py-3 outline-none"
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full mb-4 rounded-xl bg-black/30 border border-white/10 px-4 py-3 outline-none"
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full rounded-xl bg-white text-slate-950 py-3 font-semibold">
          Login
        </button>

        {status && (
          <p className="text-xs text-white/50 mt-4 break-all">
            {status}
          </p>
        )}
      </form>
    </div>
  )
}