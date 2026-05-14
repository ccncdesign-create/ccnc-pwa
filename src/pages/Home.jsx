import { useState } from 'react'
import {
  FolderKanban,
  CalendarDays,
  MessageSquare,
  Bell,
  BarChart3,
  FileText,
  Settings,
  Users,
  X,
  Monitor,
  Smartphone,
} from 'lucide-react'

const apps = [
  { id: 'task', name: 'Task', desc: '업무 및 프로젝트 관리', icon: FolderKanban },
  { id: 'schedule', name: 'Schedule', desc: '일정 및 캘린더', icon: CalendarDays },
  { id: 'message', name: 'Message', desc: '사내 메시지', icon: MessageSquare },
  { id: 'notice', name: 'Notice', desc: '공지 및 알림', icon: Bell },
  { id: 'analytics', name: 'Analytics', desc: '방문자/업무 분석', icon: BarChart3 },
  { id: 'files', name: 'Files', desc: '문서 및 자료함', icon: FileText },
  { id: 'members', name: 'Members', desc: '직원/사용자 관리', icon: Users },
  { id: 'settings', name: 'Settings', desc: '시스템 설정', icon: Settings },
]

const workspaceModes = [
  { id: 'desktop', label: 'Desktop Window', icon: Monitor },
  { id: 'mobile', label: 'Mobile Stack', icon: Smartphone },
]

export default function Home() {
  const [showLayoutPanel, setShowLayoutPanel] = useState(false)
  const [workspaceMode, setWorkspaceMode] = useState('desktop')
  const [mobileStackCount, setMobileStackCount] = useState(2)
  const [openedApps, setOpenedApps] = useState([])

  function openApp(app) {
    setOpenedApps((prev) => {
      const filtered = prev.filter((item) => item.id !== app.id)

      if (workspaceMode === 'desktop') {
        return [...filtered, app]
      }

      return [...filtered, app].slice(-mobileStackCount)
    })
  }

  function closeApp(appId) {
    setOpenedApps((prev) => prev.filter((app) => app.id !== appId))
  }

  return (
    <div className="flex flex-col gap-5 h-full">
      <section className="min-h-[220px] rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6">
        <div>
          <h2 className="text-xl font-semibold">
            Today Summary
          </h2>

          <p className="text-sm text-white/40 mt-1">
            Daily overview and integrated status dashboard
          </p>
        </div>

        <div className="mt-5 h-[130px] rounded-2xl border border-dashed border-white/10 bg-black/10 flex items-center justify-center text-sm text-white/25">
          Summary Widgets Area
        </div>
      </section>

      <section className="flex-1 min-h-[520px] rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6 overflow-hidden">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold">
              Workspace
            </h2>

            <p className="text-sm text-white/40 mt-1">
              {workspaceMode === 'desktop'
                ? 'Desktop floating window environment'
                : `Mobile stacked app environment · ${mobileStackCount} apps`}
            </p>
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() => setShowLayoutPanel(!showLayoutPanel)}
              className="w-10 h-10 rounded-2xl border border-white/10 bg-white/[0.05] hover:bg-white/[0.09] flex items-center justify-center transition"
            >
              <Settings size={18} className="text-white/70" />
            </button>

            {showLayoutPanel && (
              <div className="absolute right-0 top-12 z-30 w-[320px] rounded-3xl border border-white/10 bg-slate-950/95 backdrop-blur-2xl p-4 shadow-2xl">
                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-white/85">
                    Workspace Preset
                  </h3>

                  <p className="text-xs text-white/35 mt-1">
                    데스크톱은 창 방식, 모바일은 세로 스택 방식입니다.
                  </p>
                </div>

                <div className="mb-4">
                  <p className="text-xs text-white/45 mb-2">
                    Workspace Mode
                  </p>

                  <div className="grid grid-cols-2 gap-2">
                    {workspaceModes.map((mode) => {
                      const Icon = mode.icon

                      return (
                        <button
                          type="button"
                          key={mode.id}
                          onClick={() => setWorkspaceMode(mode.id)}
                          className={`
                            rounded-2xl border px-3 py-3
                            flex flex-col items-center gap-2
                            transition
                            ${
                              workspaceMode === mode.id
                                ? 'border-blue-400 bg-blue-500/15 text-white'
                                : 'border-white/10 bg-white/[0.03] text-white/45 hover:bg-white/[0.07]'
                            }
                          `}
                        >
                          <Icon size={18} />

                          <span className="text-[11px]">
                            {mode.label}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {workspaceMode === 'mobile' && (
                  <div>
                    <p className="text-xs text-white/45 mb-2">
                      Concurrent Mobile Apps
                    </p>

                    <div className="grid grid-cols-4 gap-2">
                      {[1, 2, 3, 4].map((count) => (
                        <button
                          type="button"
                          key={count}
                          onClick={() => setMobileStackCount(count)}
                          className={`
                            h-10 rounded-2xl border text-sm transition
                            ${
                              mobileStackCount === count
                                ? 'border-blue-400 bg-blue-500/15 text-white'
                                : 'border-white/10 bg-white/[0.03] text-white/45 hover:bg-white/[0.07]'
                            }
                          `}
                        >
                          {count}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="relative min-h-[430px] rounded-3xl border border-white/10 bg-slate-950/40 overflow-hidden p-6">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,.14),transparent_35%),radial-gradient(circle_at_80%_70%,rgba(168,85,247,.12),transparent_35%)]" />

          <div className="relative z-10 grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-5">
            {apps.map((app) => {
              const Icon = app.icon

              return (
                <button
                  type="button"
                  key={app.id}
                  onClick={() => openApp(app)}
                  className="group flex flex-col items-center gap-2 rounded-2xl p-3 hover:bg-white/[0.06] transition"
                >
                  <div className="w-16 h-16 rounded-3xl border border-white/15 bg-white/[0.08] backdrop-blur-xl flex items-center justify-center shadow-xl group-hover:scale-105 group-active:scale-95 transition">
                    <Icon size={28} className="text-white/80" />
                  </div>

                  <p className="text-sm text-white/80 leading-tight">
                    {app.name}
                  </p>
                </button>
              )
            })}
          </div>

          {workspaceMode === 'desktop' && openedApps.map((app, index) => (
            <div
              key={app.id}
              className="absolute z-20 w-[520px] h-[300px] rounded-3xl border border-white/10 bg-slate-950/95 backdrop-blur-2xl shadow-2xl overflow-hidden"
              style={{
                top: `${90 + index * 24}px`,
                left: `${40 + index * 34}px`,
              }}
            >
              <AppWindow app={app} onClose={() => closeApp(app.id)} />
            </div>
          ))}

          {workspaceMode === 'mobile' && openedApps.length > 0 && (
            <div className="relative z-20 mt-8 flex flex-col gap-4">
              {openedApps.map((app) => (
                <div
                  key={app.id}
                  className="rounded-3xl border border-white/10 bg-slate-950/95 backdrop-blur-2xl shadow-2xl overflow-hidden min-h-[220px]"
                >
                  <AppWindow app={app} onClose={() => closeApp(app.id)} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

function AppWindow({ app, onClose }) {
  return (
    <>
      <div className="h-14 border-b border-white/10 flex items-center justify-between px-5">
        <div>
          <h3 className="text-sm font-semibold text-white/90">
            {app.name}
          </h3>

          <p className="text-xs text-white/35">
            {app.desc}
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center transition"
        >
          <X size={16} className="text-white/70" />
        </button>
      </div>

      <div className="h-[calc(100%-56px)] flex items-center justify-center text-white/25 text-sm">
        {app.name} App Content Area
      </div>
    </>
  )
}