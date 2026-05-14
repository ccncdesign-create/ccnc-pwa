import { Routes, Route, NavLink } from 'react-router-dom'

import Home from './pages/Home'
import Tasks from './pages/Tasks'
import Admin from './pages/Admin'

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">

      {/* Header */}
      <header className="sticky top-0 z-50 h-16 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl flex items-center justify-between px-5">
        
        <div>
          <h1 className="text-lg font-semibold tracking-wide">
            CC&C OS
          </h1>

          <p className="text-xs text-white/40">
            Integrated Development Platform
          </p>
        </div>

        <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
          C
        </div>

      </header>

      {/* Main */}
      <main className="flex-1 p-5 max-w-7xl w-full mx-auto">

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>

      </main>

      {/* Bottom Navigation */}
      <nav className="sticky bottom-0 h-20 border-t border-white/10 bg-black/30 backdrop-blur-2xl flex items-center justify-around">

        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex flex-col items-center text-xs ${
              isActive ? 'text-white' : 'text-white/40'
            }`
          }
        >
          <span className="text-lg mb-1">⌂</span>
          Home
        </NavLink>

        <NavLink
          to="/tasks"
          className={({ isActive }) =>
            `flex flex-col items-center text-xs ${
              isActive ? 'text-white' : 'text-white/40'
            }`
          }
        >
          <span className="text-lg mb-1">▣</span>
          Tasks
        </NavLink>

        <NavLink
          to="/admin"
          className={({ isActive }) =>
            `flex flex-col items-center text-xs ${
              isActive ? 'text-white' : 'text-white/40'
            }`
          }
        >
          <span className="text-lg mb-1">⌘</span>
          Admin
        </NavLink>

      </nav>
    </div>
  )
}