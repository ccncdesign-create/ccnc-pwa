import { NavLink } from 'react-router-dom'

export default function BottomNav() {
  return (
    <nav className="sticky bottom-0 h-20 border-t border-white/10 bg-black/30 backdrop-blur-2xl flex items-center justify-around">

      <NavLink
        to="/"
        className={({ isActive }) =>
          `flex flex-col items-center text-xs transition ${
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
          `flex flex-col items-center text-xs transition ${
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
          `flex flex-col items-center text-xs transition ${
            isActive ? 'text-white' : 'text-white/40'
          }`
        }
      >
        <span className="text-lg mb-1">⌘</span>
        Admin
      </NavLink>

    </nav>
  )
}