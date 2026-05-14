import Header from '../components/Header'
import BottomNav from '../components/BottomNav'

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">

      <Header />

      <main className="flex-1 p-5 max-w-7xl w-full mx-auto">
        {children}
      </main>

      <BottomNav />

    </div>
  )
}