import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Types
export interface Course {
  id?: number
  title: string
  abbreviation: string
  color?: string
  available_slots?: string[]
}

export interface Class {
  id?: number
  name: string
  division?: string
  batch_count?: number
  restrictions?: Record<string, any>
  available_slots?: string[]
}

export interface Faculty {
  id?: number
  first_name: string
  last_name: string
  email?: string
  phone?: string
  abbreviation: string
  title?: string
  gender?: string
  is_class_teacher?: boolean
  color?: string
  constraints?: Record<string, any>
  time_off?: string[]
}

export interface Classroom {
  id?: number
  name: string
  abbreviation: string
  color?: string
  is_homeroom?: boolean
  is_shared?: boolean
  requires_supervision?: boolean
  availability?: Record<string, any>
}

export interface Lesson {
  id?: number
  course_id: number
  class_id: number
  group?: string
  faculty_id: number
  periods_per_week?: number
  duration?: number
  shared_faculty_ids?: number[]
  classroom_type?: string
  constraints?: Record<string, any>
}

export interface TimetableSlot {
  lesson_id: number
  course_name: string
  course_abbr: string
  faculty_name: string
  faculty_abbr: string
  classroom: string
  color: string
}

export interface TimetableResponse {
  timetable: Record<string, Record<string, (TimetableSlot | string)[]>>
  pending: Array<{
    lesson_id: number
    course: string
    class: string
    faculty: string
    reason: string
  }>
  stats: {
    total_classes: number
    total_lessons_placed: number
    total_pending: number
  }
}

// API methods
export const coursesAPI = {
  getAll: () => api.get<Course[]>('/courses/'),
  getById: (id: number) => api.get<Course>(`/courses/${id}`),
  create: (data: Course) => api.post<Course>('/courses/', data),
  update: (id: number, data: Partial<Course>) => api.put<Course>(`/courses/${id}`, data),
  delete: (id: number) => api.delete(`/courses/${id}`),
}

export const classesAPI = {
  getAll: () => api.get<Class[]>('/classes/'),
  getById: (id: number) => api.get<Class>(`/classes/${id}`),
  create: (data: Class) => api.post<Class>('/classes/', data),
  update: (id: number, data: Partial<Class>) => api.put<Class>(`/classes/${id}`, data),
  delete: (id: number) => api.delete(`/classes/${id}`),
}

export const facultiesAPI = {
  getAll: () => api.get<Faculty[]>('/faculties/'),
  getById: (id: number) => api.get<Faculty>(`/faculties/${id}`),
  create: (data: Faculty) => api.post<Faculty>('/faculties/', data),
  update: (id: number, data: Partial<Faculty>) => api.put<Faculty>(`/faculties/${id}`, data),
  delete: (id: number) => api.delete(`/faculties/${id}`),
}

export const classroomsAPI = {
  getAll: () => api.get<Classroom[]>('/classrooms/'),
  getById: (id: number) => api.get<Classroom>(`/classrooms/${id}`),
  create: (data: Classroom) => api.post<Classroom>('/classrooms/', data),
  update: (id: number, data: Partial<Classroom>) => api.put<Classroom>(`/classrooms/${id}`, data),
  delete: (id: number) => api.delete(`/classrooms/${id}`),
}

export const lessonsAPI = {
  getAll: () => api.get<Lesson[]>('/lessons/'),
  getById: (id: number) => api.get<Lesson>(`/lessons/${id}`),
  create: (data: Lesson) => api.post<Lesson>('/lessons/', data),
  update: (id: number, data: Partial<Lesson>) => api.put<Lesson>(`/lessons/${id}`, data),
  delete: (id: number) => api.delete(`/lessons/${id}`),
}

export const timetableAPI = {
  generate: () => api.post<TimetableResponse>('/timetable/generate'),
}

export default api
