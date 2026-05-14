export default function Home() {
  return (
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
  )
}
