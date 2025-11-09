import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { lessonsAPI, coursesAPI, classesAPI, facultiesAPI, Lesson } from '@/services/api'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import Modal from '@/components/Modal'

export default function Lessons() {
  const queryClient = useQueryClient()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null)
  
  const { data: lessons, isLoading } = useQuery({
    queryKey: ['lessons'],
    queryFn: () => lessonsAPI.getAll().then(res => res.data)
  })

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

  const createMutation = useMutation({
    mutationFn: lessonsAPI.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lessons'] })
      setIsModalOpen(false)
    }
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Lesson> }) =>
      lessonsAPI.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lessons'] })
      setIsModalOpen(false)
      setEditingLesson(null)
    }
  })

  const deleteMutation = useMutation({
    mutationFn: lessonsAPI.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lessons'] })
    }
  })

  const handleSubmit = (data: Lesson) => {
    if (editingLesson?.id) {
      updateMutation.mutate({ id: editingLesson.id, data })
    } else {
      createMutation.mutate(data)
    }
  }

  const getCourseById = (id: number) => courses?.find(c => c.id === id)
  const getClassById = (id: number) => classes?.find(c => c.id === id)
  const getFacultyById = (id: number) => faculties?.find(f => f.id === id)

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Lessons</h1>
        <button
          onClick={() => {
            setEditingLesson(null)
            setIsModalOpen(true)
          }}
          className="btn btn-primary flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Lesson
        </button>
      </div>

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {lessons?.map((lesson) => {
            const course = getCourseById(lesson.course_id)
            const cls = getClassById(lesson.class_id)
            const faculty = getFacultyById(lesson.faculty_id)
            
            return (
              <div key={lesson.id} className="card">
                <div className="flex justify-between items-start">
                  <div className="flex gap-4 items-center">
                    <div
                      className="w-16 h-16 rounded flex items-center justify-center text-white font-bold"
                      style={{ backgroundColor: course?.color }}
                    >
                      {course?.abbreviation}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {course?.title}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Class: {cls?.name} {cls?.division} • Faculty: {faculty?.first_name} {faculty?.last_name}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {lesson.periods_per_week} periods/week • Duration: {lesson.duration}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditingLesson(lesson)
                        setIsModalOpen(true)
                      }}
                      className="p-2 hover:bg-gray-100 rounded"
                    >
                      <Pencil className="w-4 h-4 text-gray-600" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm('Delete this lesson?')) {
                          deleteMutation.mutate(lesson.id!)
                        }
                      }}
                      className="p-2 hover:bg-gray-100 rounded"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setEditingLesson(null)
        }}
        title={editingLesson ? 'Edit Lesson' : 'Add Lesson'}
      >
        <LessonForm
          lesson={editingLesson}
          courses={courses || []}
          classes={classes || []}
          faculties={faculties || []}
          onSubmit={handleSubmit}
          onCancel={() => {
            setIsModalOpen(false)
            setEditingLesson(null)
          }}
        />
      </Modal>
    </div>
  )
}

function LessonForm({ 
  lesson, 
  courses,
  classes,
  faculties,
  onSubmit, 
  onCancel 
}: { 
  lesson: Lesson | null;
  courses: any[];
  classes: any[];
  faculties: any[];
  onSubmit: (data: Lesson) => void; 
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState<Lesson>({
    course_id: lesson?.course_id || 0,
    class_id: lesson?.class_id || 0,
    faculty_id: lesson?.faculty_id || 0,
    periods_per_week: lesson?.periods_per_week || 1,
    duration: lesson?.duration || 1,
  })

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(formData) }} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Course</label>
        <select
          value={formData.course_id}
          onChange={(e) => setFormData({ ...formData, course_id: parseInt(e.target.value) })}
          className="input"
          required
        >
          <option value="0">Select a course</option>
          {courses.map(course => (
            <option key={course.id} value={course.id}>{course.title}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
        <select
          value={formData.class_id}
          onChange={(e) => setFormData({ ...formData, class_id: parseInt(e.target.value) })}
          className="input"
          required
        >
          <option value="0">Select a class</option>
          {classes.map(cls => (
            <option key={cls.id} value={cls.id}>
              {cls.name} {cls.division}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Faculty</label>
        <select
          value={formData.faculty_id}
          onChange={(e) => setFormData({ ...formData, faculty_id: parseInt(e.target.value) })}
          className="input"
          required
        >
          <option value="0">Select a faculty</option>
          {faculties.map(faculty => (
            <option key={faculty.id} value={faculty.id}>
              {faculty.first_name} {faculty.last_name}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Periods/Week</label>
          <input
            type="number"
            value={formData.periods_per_week}
            onChange={(e) => setFormData({ ...formData, periods_per_week: parseInt(e.target.value) })}
            className="input"
            min="1"
            max="10"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
          <input
            type="number"
            value={formData.duration}
            onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
            className="input"
            min="1"
            max="3"
          />
        </div>
      </div>
      <div className="flex gap-3 pt-4">
        <button type="submit" className="btn btn-primary flex-1">
          {lesson ? 'Update' : 'Create'}
        </button>
        <button type="button" onClick={onCancel} className="btn btn-secondary flex-1">
          Cancel
        </button>
      </div>
    </form>
  )
}
