import { Outlet, Link, useLocation } from 'react-router-dom'
import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  GraduationCap, 
  BookMarked, 
  DoorOpen,
  Calendar,
  Sparkles
} from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Courses', href: '/courses', icon: BookOpen },
  { name: 'Classes', href: '/classes', icon: Users },
  { name: 'Faculties', href: '/faculties', icon: GraduationCap },
  { name: 'Lessons', href: '/lessons', icon: BookMarked },
  { name: 'Classrooms', href: '/classrooms', icon: DoorOpen },
  { name: 'Timetable', href: '/timetable', icon: Calendar },
]

export default function Layout() {
  const location = useLocation()

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-cream-100/50 to-sage-50">
      {/* Elegant Sidebar */}
      <div className="fixed inset-y-0 left-0 w-72 bg-white/90 backdrop-blur-md border-r border-sage-200/50 shadow-soft-lg">
        <div className="flex flex-col h-full">
          {/* Logo & Branding */}
          <div className="flex items-center gap-3 h-20 px-6 border-b border-sage-200/50 bg-gradient-to-r from-cream-100/50 to-transparent">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-terracotta-400 to-terracotta-600 rounded-xl blur-sm opacity-50"></div>
              <div className="relative bg-gradient-to-br from-terracotta-500 to-terracotta-600 p-2 rounded-xl">
                <Calendar className="w-6 h-6 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-xl font-display font-bold bg-gradient-to-r from-navy-800 to-navy-600 bg-clip-text text-transparent">
                TimeTable
              </h1>
              <p className="text-xs text-sage-600 font-medium">Smart Scheduling</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`group flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-terracotta-500 to-terracotta-600 text-white shadow-soft'
                      : 'text-navy-700 hover:bg-cream-100 hover:text-navy-900'
                  }`}
                >
                  <item.icon className={`w-5 h-5 transition-transform duration-200 ${
                    isActive ? 'scale-110' : 'group-hover:scale-110'
                  }`} />
                  <span className="text-sm">{item.name}</span>
                  {isActive && (
                    <Sparkles className="w-4 h-4 ml-auto animate-pulse" />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Footer Info */}
          <div className="p-6 border-t border-sage-200/50 bg-gradient-to-r from-cream-100/50 to-transparent">
            <div className="text-xs text-sage-600 space-y-1">
              <p className="font-semibold text-navy-700">Academic Year 2024-25</p>
              <p>Version 1.0.0</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="pl-72">
        <main className="p-8 min-h-screen">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
