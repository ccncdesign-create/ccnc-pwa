import { useState } from 'react'
import { Link } from 'react-router-dom'

import { supabase } from '../lib/supabaseClient'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [status, setStatus] = useState('')

  async function handleSignup(e) {
    e.preventDefault()

    setStatus('회원가입 중...')

    const cleanEmail = email.trim().toLowerCase()
    const cleanName = name.trim()

    const { data, error } = await supabase.auth.signUp({
      email: cleanEmail,
      password,
    })

    if (error) {
      setStatus(error.message)
      return
    }

    const user = data.user

    if (!user) {
      setStatus('이메일 인증이 필요합니다.')
      return
    }

    const { error: profileError } = await supabase
      .from('profiles')
      .insert({
        id: user.id,
        email: cleanEmail,
        name: cleanName,
        role: 'staff',
      })

    if (profileError) {
      console.error(profileError)
      setStatus('계정은 생성됐지만 프로필 저장에 실패했습니다.')
      return
    }

    setStatus('회원가입 완료. 로그인해주세요.')
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-5">

      <form
        onSubmit={handleSignup}
        className="w-full max-w-sm rounded-3xl border border-white/10 bg-white/5 p-6"
      >

        <h1 className="text-2xl font-semibold mb-2">
          CC&C OS
        </h1>

        <p className="text-sm text-white/50 mb-6">
          직원 계정 생성
        </p>

        <input
          className="w-full mb-3 rounded-xl bg-black/30 border border-white/10 px-4 py-3 outline-none"
          type="text"
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          className="w-full mb-3 rounded-xl bg-black/30 border border-white/10 px-4 py-3 outline-none"
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          className="w-full mb-4 rounded-xl bg-black/30 border border-white/10 px-4 py-3 outline-none"
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="w-full rounded-xl bg-white text-slate-950 py-3 font-semibold">
          Sign Up
        </button>

        <div className="mt-4 text-xs text-white/50">
          이미 계정이 있으면{' '}
          <Link
            to="/login"
            className="text-white underline"
          >
            로그인
          </Link>
        </div>

        {status && (
          <p className="text-xs text-white/50 mt-4 break-all">
            {status}
          </p>
        )}

      </form>

    </div>
  )
}