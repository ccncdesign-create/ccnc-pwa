import { Routes, Route } from 'react-router-dom'

import MainLayout from './layouts/MainLayout'

import ProtectedRoute from './components/ProtectedRoute'

import Home from './pages/Home'
import Tasks from './pages/Tasks'
import Admin from './pages/Admin'

import Login from './pages/Login'
import Signup from './pages/Signup'

export default function App() {
  return (
    <Routes>

      {/* Public */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected */}
      <Route
        path="/*"
        element={
          <ProtectedRoute>

            <MainLayout>

              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/tasks" element={<Tasks />} />
                <Route path="/admin" element={<Admin />} />
              </Routes>

            </MainLayout>

          </ProtectedRoute>
        }
      />

    </Routes>
  )
}