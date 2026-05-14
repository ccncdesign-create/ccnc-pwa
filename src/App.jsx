export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      
      {/* Header */}
      <header className="h-16 border-b border-white/10 flex items-center justify-between px-5">
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
      <main className="flex-1 p-5">
        <div className="grid gap-4">
          
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <h2 className="text-xl font-semibold mb-2">
              Welcome
            </h2>

            <p className="text-white/60 text-sm">
              CC&C Integrated Platform System
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <h2 className="text-lg font-medium mb-2">
              Platform Status
            </h2>

            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400" />

              <span className="text-sm text-white/70">
                PWA System Online
              </span>
            </div>
          </div>

        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="h-20 border-t border-white/10 bg-black/20 backdrop-blur-xl flex items-center justify-around">
        
        <button className="flex flex-col items-center text-xs text-white/70">
          <span className="text-lg mb-1">⌂</span>
          Home
        </button>

        <button className="flex flex-col items-center text-xs text-white/40">
          <span className="text-lg mb-1">▣</span>
          Tasks
        </button>

        <button className="flex flex-col items-center text-xs text-white/40">
          <span className="text-lg mb-1">⌘</span>
          Admin
        </button>

      </nav>
    </div>
  )
}