export default function Header() {
  return (
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
  )
}