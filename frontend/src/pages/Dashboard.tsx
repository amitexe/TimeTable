import { useQuery } from '@tanstack/react-query'
import { coursesAPI, classesAPI, facultiesAPI, lessonsAPI, classroomsAPI } from '@/services/api'
import { BookOpen, Users, GraduationCap, BookMarked, DoorOpen } from 'lucide-react'

export default function Dashboard() {
  const { data: courses } = useQuery({ 
    queryKey: ['courses'], 
    queryFn: () => coursesAPI.getAll().then(res => res.data) 
  })
  
  const { data: classes } = useQuery({ 
    queryKey: ['classes'], 
    queryFn: () => classesAPI.getAll().then(res => res.data) 
  })
  
  const { data: faculties } = useQuery({ 
    queryKey: ['faculties'], 
    queryFn: () => facultiesAPI.getAll().then(res => res.data) 
  })
  
  const { data: lessons } = useQuery({ 
    queryKey: ['lessons'], 
    queryFn: () => lessonsAPI.getAll().then(res => res.data) 
  })
  
  const { data: classrooms } = useQuery({ 
    queryKey: ['classrooms'], 
    queryFn: () => classroomsAPI.getAll().then(res => res.data) 
  })

  const stats = [
    { name: 'Courses', value: courses?.length || 0, icon: BookOpen, color: 'bg-blue-500' },
    { name: 'Classes', value: classes?.length || 0, icon: Users, color: 'bg-green-500' },
    { name: 'Faculties', value: faculties?.length || 0, icon: GraduationCap, color: 'bg-purple-500' },
    { name: 'Lessons', value: lessons?.length || 0, icon: BookMarked, color: 'bg-orange-500' },
    { name: 'Classrooms', value: classrooms?.length || 0, icon: DoorOpen, color: 'bg-pink-500' },
  ]

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {stats.map((stat) => (
          <div key={stat.name} className="card">
            <div className="flex items-center">
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 card">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Start</h2>
        <div className="space-y-3 text-gray-600">
          <p>1. Add courses from the Courses page</p>
          <p>2. Create classes from the Classes page</p>
          <p>3. Add faculty members from the Faculties page</p>
          <p>4. Create classrooms from the Classrooms page</p>
          <p>5. Define lessons linking courses, classes, and faculties</p>
          <p>6. Go to Timetable page and click "Generate Timetable"</p>
        </div>
      </div>
    </div>
  )
}
