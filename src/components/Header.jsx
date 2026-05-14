import { useEffect, useState } from 'react'
import { Settings, ChevronDown } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import { supabase } from '../lib/supabaseClient'

const avatarPresets = [
  {
    id: 'blue-core',
    label: 'Blue Core',
    className:
      'bg-gradient-to-br from-sky-300 via-blue-500 to-indigo-700 shadow-[inset_0_1px_3px_rgba(255,255,255,.65),inset_0_-8px_16px_rgba(15,23,42,.45),0_8px_22px_rgba(37,99,235,.45)]',
  },
  {
    id: 'violet-orb',
    label: 'Violet Orb',
    className:
      'bg-gradient-to-br from-fuchsia-300 via-violet-500 to-slate-950 shadow-[inset_0_1px_3px_rgba(255,255,255,.65),inset_0_-8px_16px_rgba(15,23,42,.55),0_8px_22px_rgba(168,85,247,.45)]',
  },
  {
    id: 'graphite',
    label: 'Graphite',
    className:
      'bg-gradient-to-br from-slate-200 via-slate-600 to-slate-950 shadow-[inset_0_1px_3px_rgba(255,255,255,.55),inset_0_-8px_16px_rgba(0,0,0,.65),0_8px_22px_rgba(15,23,42,.55)]',
  },
  {
    id: 'emerald-glass',
    label: 'Emerald',
    className:
      'bg-gradient-to-br from-emerald-200 via-emerald-500 to-teal-900 shadow-[inset_0_1px_3px_rgba(255,255,255,.65),inset_0_-8px_16px_rgba(6,78,59,.55),0_8px_22px_rgba(16,185,129,.38)]',
  },
]

export default function Header() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [showAvatarModal, setShowAvatarModal] = useState(false)
  const [avatarPreset, setAvatarPreset] = useState('blue-core')
  const [selectedAppMode, setSelectedAppMode] = useState('user')

  const [supabaseStatus, setSupabaseStatus] = useState('Connecting...')
  const [projectUrl, setProjectUrl] = useState('')
  const [showSupabaseDetail, setShowSupabaseDetail] = useState(false)

  useEffect(() => {
    async function loadUser() {
      try {
        const { data, error } = await supabase.auth.getSession()

        if (error) {
          setSupabaseStatus('Connection Error')
          return
        }

        setSupabaseStatus('Connected')
        setProjectUrl(import.meta.env.VITE_SUPABASE_URL)

        const user = data.session?.user

        if (!user) return

        setEmail(user.email)

        const { data: profile } = await supabase
          .from('profiles')
          .select('name, avatar_config')
          .eq('id', user.id)
          .single()

        if (profile?.name) setName(profile.name)

        if (profile?.avatar_config?.preset) {
          setAvatarPreset(profile.avatar_config.preset)
        }
      } catch (err) {
        console.error(err)
        setSupabaseStatus('Connection Failed')
      }
    }

    loadUser()
  }, [])

  const isConnected = supabaseStatus === 'Connected'

  const isCeo = email === 'ceo@ccncdesign.com'

  const initial =
    name?.charAt(0)?.toUpperCase() ||
    email?.charAt(0)?.toUpperCase() ||
    'C'

  const currentPreset =
    avatarPresets.find((item) => item.id === avatarPreset) || avatarPresets[0]

  function handleEnterSelectedApp() {
    setShowAvatarModal(false)

    if (selectedAppMode === 'user') {
      navigate('/app')
      return
    }

    if (selectedAppMode === 'admin') {
      navigate('/admin-login')
    }
  }

  async function saveAvatarPreset(presetId) {
    setAvatarPreset(presetId)

    const { data } = await supabase.auth.getSession()
    const user = data.session?.user

    if (!user) return

    await supabase
      .from('profiles')
      .update({
        avatar_config: {
          preset: presetId,
        },
      })
      .eq('id', user.id)
  }

  return (
    <>
      <header className="sticky top-0 z-50 h-16 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl flex items-center justify-between px-5">
        <div>
          <h1 className="text-lg font-semibold tracking-wide">
            CC&C OS
          </h1>

          <p className="text-xs text-white/40">
            Integrated Development Platform
          </p>
        </div>

        <div className="flex items-center gap-5">
          <div className="relative hidden md:block">
            <button
              type="button"
              onClick={() => setShowSupabaseDetail(!showSupabaseDetail)}
              className="
                h-10 px-4 rounded-2xl
                border border-white/10
                bg-white/[0.04]
                flex items-center gap-2
                text-sm text-white/70
                backdrop-blur-md
                hover:bg-white/[0.07]
                transition
              "
            >
              <div
                className={`
                  w-2 h-2 rounded-full
                  ${isConnected ? 'bg-green-400' : 'bg-red-400'}
                  ${isConnected
                    ? 'shadow-[0_0_10px_rgba(74,222,128,.8)]'
                    : 'shadow-[0_0_10px_rgba(248,113,113,.8)]'
                  }
                `}
              />

              <span>
                Supabase Connection
              </span>

              <ChevronDown
                size={15}
                className={`
                  transition-transform duration-200
                  ${showSupabaseDetail ? 'rotate-180' : ''}
                `}
              />
            </button>

            {showSupabaseDetail && (
              <div
                className="
                  absolute top-12 right-0
                  w-[300px]
                  rounded-2xl
                  border border-white/10
                  bg-slate-950/95
                  backdrop-blur-2xl
                  p-4
                  shadow-2xl
                "
              >
                <div className="flex items-center gap-2 mb-3">
                  <div
                    className={`
                      w-2 h-2 rounded-full
                      ${isConnected ? 'bg-green-400' : 'bg-red-400'}
                    `}
                  />

                  <span className="text-sm text-white/80">
                    {supabaseStatus}
                  </span>
                </div>

                <div className="space-y-2 text-xs text-white/45">
                  <div>
                    Backend: Supabase Cloud
                  </div>

                  <div className="break-all">
                    {projectUrl}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="text-right hidden sm:block">
            <p className="text-sm text-white/80 leading-tight">
              {name || 'User'}
            </p>

            <p className="text-[11px] text-white/40 leading-tight max-w-[160px] truncate">
              {email}
            </p>
          </div>

          <div className="relative">
            <button
              type="button"
              className={`
                relative w-11 h-11 rounded-2xl
                border border-white/20
                flex items-center justify-center
                text-sm font-bold text-white
                transition
                hover:scale-105
                active:scale-95
                overflow-hidden
                ${currentPreset.className}
              `}
            >
              <span className="absolute top-1 left-1.5 w-5 h-2 rounded-full bg-white/40 blur-[1px]" />

              <span className="relative z-10 drop-shadow-[0_1px_2px_rgba(0,0,0,.65)]">
                {initial}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setShowAvatarModal(true)}
              className="
                absolute -bottom-1 -right-1
                w-5 h-5 rounded-full
                bg-slate-900
                border border-white/25
                flex items-center justify-center
                hover:bg-slate-800
                transition
                shadow-lg
              "
            >
              <Settings size={11} className="text-white/80" />
            </button>
          </div>
        </div>
      </header>

      {showAvatarModal && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center px-4">
          <div className="w-full max-w-[420px] rounded-3xl border border-white/10 bg-slate-950 p-6 shadow-2xl">
            {/* 기존 모달 코드 그대로 */}
          </div>
        </div>
      )}
    </>
  )
}