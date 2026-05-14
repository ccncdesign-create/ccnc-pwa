import { Routes, Route } from 'react-router-dom'

import MainLayout from './layouts/MainLayout'

import Home from './pages/Home'
import Tasks from './pages/Tasks'
import Admin from './pages/Admin'

export default function App() {
  return (
    <MainLayout>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>

    </MainLayout>
  )
}