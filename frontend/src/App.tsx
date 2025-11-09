import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout.tsx'
import Dashboard from './pages/Dashboard.tsx'
import Courses from './pages/Courses.tsx'
import Classes from './pages/Classes.tsx'
import Faculties from './pages/Faculties.tsx'
import Lessons from './pages/Lessons.tsx'
import Classrooms from './pages/Classrooms.tsx'
import Timetable from './pages/Timetable.tsx'

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
