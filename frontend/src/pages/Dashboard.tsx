import { useQuery } from '@tanstack/react-query'
import { coursesAPI, classesAPI, facultiesAPI, lessonsAPI, classroomsAPI } from '@/services/api'
import { 
  BookOpen, 
  Users, 
  GraduationCap, 
  BookMarked, 
  DoorOpen,
  Calendar,
  TrendingUp,
  Activity,
  Sparkles
} from 'lucide-react'

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
    {
      name: 'Total Courses',
      value: courses?.length || 0,
      icon: BookOpen,
      color: 'from-terracotta-400 to-terracotta-600',
      bgColor: 'from-terracotta-50 to-terracotta-100/50',
      description: 'Active courses',
      trend: '+12%'
    },
    {
      name: 'Total Classes',
      value: classes?.length || 0,
      icon: Users,
      color: 'from-sage-500 to-sage-700',
      bgColor: 'from-sage-50 to-sage-100/50',
      description: 'Student groups',
      trend: '+8%'
    },
    {
      name: 'Total Faculties',
      value: faculties?.length || 0,
      icon: GraduationCap,
      color: 'from-navy-500 to-navy-700',
      bgColor: 'from-navy-50 to-navy-100/50',
      description: 'Teaching staff',
      trend: '+5%'
    },
    {
      name: 'Total Lessons',
      value: lessons?.length || 0,
      icon: BookMarked,
      color: 'from-terracotta-500 to-terracotta-700',
      bgColor: 'from-terracotta-50 to-terracotta-100/50',
      description: 'Weekly lessons',
      trend: '+15%'
    },
    {
      name: 'Total Classrooms',
      value: classrooms?.length || 0,
      icon: DoorOpen,
      color: 'from-sage-600 to-sage-800',
      bgColor: 'from-sage-50 to-sage-100/50',
      description: 'Available rooms',
      trend: '0%'
    },
  ]

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="relative">
        <div className="absolute -top-4 -left-4 w-32 h-32 bg-gradient-to-br from-terracotta-200/30 to-transparent rounded-full blur-2xl"></div>
        <div className="absolute -top-8 right-0 w-40 h-40 bg-gradient-to-br from-sage-200/30 to-transparent rounded-full blur-2xl"></div>
        
        <div className="relative">
          <div className="flex items-center gap-3 mb-2">
            <Activity className="w-8 h-8 text-terracotta-600" />
            <h1 className="page-header">Dashboard</h1>
          </div>
          <p className="text-sage-700 font-medium">
            Overview of your timetable management system
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div
              key={stat.name}
              className="group relative bg-white rounded-2xl p-6 shadow-soft hover:shadow-soft-lg transition-all duration-300 overflow-hidden"
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
              
              {/* Content */}
              <div className="relative">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} shadow-soft`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex items-center gap-1 text-xs font-semibold text-sage-700 bg-sage-100 px-2 py-1 rounded-full">
                    <TrendingUp className="w-3 h-3" />
                    <span>{stat.trend}</span>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <p className="text-sm font-medium text-sage-600">{stat.name}</p>
                  <p className="text-3xl font-display font-bold text-navy-900">{stat.value}</p>
                  <p className="text-xs text-sage-500">{stat.description}</p>
                </div>
              </div>

              {/* Decorative Element */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-sage-200/20 to-transparent rounded-full blur-xl group-hover:scale-110 transition-transform duration-300"></div>
            </div>
          )
        })}
      </div>

      {/* Quick Actions */}
      <div className="card-elevated">
        <div className="flex items-center gap-3 mb-6">
          <Calendar className="w-6 h-6 text-terracotta-600" />
          <h2 className="section-title">Quick Actions</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <a
            href="/lessons"
            className="group flex items-center gap-4 p-4 rounded-xl border-2 border-sage-200 hover:border-terracotta-400 hover:bg-terracotta-50/50 transition-all duration-200"
          >
            <div className="p-2 rounded-lg bg-sage-100 group-hover:bg-terracotta-100 transition-colors">
              <BookMarked className="w-5 h-5 text-sage-700 group-hover:text-terracotta-700" />
            </div>
            <div>
              <p className="font-semibold text-navy-900">Add New Lesson</p>
              <p className="text-xs text-sage-600">Create lesson assignment</p>
            </div>
          </a>

          <a
            href="/timetable"
            className="group flex items-center gap-4 p-4 rounded-xl border-2 border-sage-200 hover:border-terracotta-400 hover:bg-terracotta-50/50 transition-all duration-200"
          >
            <div className="p-2 rounded-lg bg-sage-100 group-hover:bg-terracotta-100 transition-colors">
              <Calendar className="w-5 h-5 text-sage-700 group-hover:text-terracotta-700" />
            </div>
            <div>
              <p className="font-semibold text-navy-900">Generate Timetable</p>
              <p className="text-xs text-sage-600">Auto-create schedule</p>
            </div>
          </a>

          <a
            href="/faculties"
            className="group flex items-center gap-4 p-4 rounded-xl border-2 border-sage-200 hover:border-terracotta-400 hover:bg-terracotta-50/50 transition-all duration-200"
          >
            <div className="p-2 rounded-lg bg-sage-100 group-hover:bg-terracotta-100 transition-colors">
              <GraduationCap className="w-5 h-5 text-sage-700 group-hover:text-terracotta-700" />
            </div>
            <div>
              <p className="font-semibold text-navy-900">Manage Faculty</p>
              <p className="text-xs text-sage-600">Add or edit faculty</p>
            </div>
          </a>
        </div>
      </div>

      {/* Quick Start Guide */}
      <div className="card-elevated bg-gradient-to-br from-cream-50 via-white to-sage-50/50">
        <div className="flex items-center gap-3 mb-6">
          <Sparkles className="w-6 h-6 text-terracotta-600" />
          <h2 className="section-title">Quick Start Guide</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-gradient-to-br from-terracotta-500 to-terracotta-600 text-white font-bold rounded-lg shadow-soft">
              1
            </div>
            <div>
              <p className="font-semibold text-navy-900">Add Courses</p>
              <p className="text-sm text-sage-600">Navigate to Courses page and create academic courses</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-gradient-to-br from-sage-600 to-sage-700 text-white font-bold rounded-lg shadow-soft">
              2
            </div>
            <div>
              <p className="font-semibold text-navy-900">Create Classes</p>
              <p className="text-sm text-sage-600">Define student groups and class sections</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-gradient-to-br from-navy-600 to-navy-700 text-white font-bold rounded-lg shadow-soft">
              3
            </div>
            <div>
              <p className="font-semibold text-navy-900">Add Faculty & Classrooms</p>
              <p className="text-sm text-sage-600">Register teaching staff and available rooms</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-gradient-to-br from-terracotta-600 to-terracotta-700 text-white font-bold rounded-lg shadow-soft">
              4
            </div>
            <div>
              <p className="font-semibold text-navy-900">Define & Generate</p>
              <p className="text-sm text-sage-600">Create lessons and auto-generate timetable</p>
            </div>
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="bg-gradient-to-r from-cream-100 via-white to-sage-50 rounded-2xl p-6 border border-sage-200/50 shadow-soft">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/50"></div>
            <p className="font-semibold text-navy-900">System Status: Active</p>
          </div>
          <p className="text-sm text-sage-600">All services operational</p>
        </div>
      </div>
    </div>
  )
}
