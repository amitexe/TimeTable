import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Courses from './pages/Courses'
import Classes from './pages/Classes'
import Faculties from './pages/Faculties'
import Lessons from './pages/Lessons'
import Classrooms from './pages/Classrooms'
import Timetable from './pages/Timetable'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="courses" element={<Courses />} />
        <Route path="classes" element={<Classes />} />
        <Route path="faculties" element={<Faculties />} />
        <Route path="lessons" element={<Lessons />} />
        <Route path="classrooms" element={<Classrooms />} />
        <Route path="timetable" element={<Timetable />} />
      </Route>
    </Routes>
  )
}

export default App
