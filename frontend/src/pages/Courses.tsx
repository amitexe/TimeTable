import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { coursesAPI, Course } from '@/services/api'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import Modal from '@/components/Modal'

export default function Courses() {
  const queryClient = useQueryClient()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCourse, setEditingCourse] = useState<Course | null>(null)
  
  const { data: courses, isLoading } = useQuery({
    queryKey: ['courses'],
    queryFn: () => coursesAPI.getAll().then(res => res.data)
  })

  const createMutation = useMutation({
    mutationFn: coursesAPI.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] })
      setIsModalOpen(false)
    }
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Course> }) =>
      coursesAPI.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] })
      setIsModalOpen(false)
      setEditingCourse(null)
    }
  })

  const deleteMutation = useMutation({
    mutationFn: coursesAPI.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] })
    }
  })

  const handleSubmit = (data: Course) => {
    if (editingCourse?.id) {
      updateMutation.mutate({ id: editingCourse.id, data })
    } else {
      createMutation.mutate(data)
    }
  }

  const handleEdit = (course: Course) => {
    setEditingCourse(course)
    setIsModalOpen(true)
  }

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this course?')) {
      deleteMutation.mutate(id)
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Courses</h1>
        <button
          onClick={() => {
            setEditingCourse(null)
            setIsModalOpen(true)
          }}
          className="btn btn-primary flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Course
        </button>
      </div>

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses?.map((course) => (
            <div
              key={course.id}
              className="card"
              style={{ borderLeft: `4px solid ${course.color}` }}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{course.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{course.abbreviation}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(course)}
                    className="p-2 hover:bg-gray-100 rounded"
                  >
                    <Pencil className="w-4 h-4 text-gray-600" />
                  </button>
                  <button
                    onClick={() => handleDelete(course.id!)}
                    className="p-2 hover:bg-gray-100 rounded"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setEditingCourse(null)
        }}
        title={editingCourse ? 'Edit Course' : 'Add Course'}
      >
        <CourseForm
          course={editingCourse}
          onSubmit={handleSubmit}
          onCancel={() => {
            setIsModalOpen(false)
            setEditingCourse(null)
          }}
        />
      </Modal>
    </div>
  )
}

function CourseForm({ 
  course, 
  onSubmit, 
  onCancel 
}: { 
  course: Course | null; 
  onSubmit: (data: Course) => void; 
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState<Course>({
    title: course?.title || '',
    abbreviation: course?.abbreviation || '',
    color: course?.color || '#3B82F6',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Course Title
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="input"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Abbreviation
        </label>
        <input
          type="text"
          value={formData.abbreviation}
          onChange={(e) => setFormData({ ...formData, abbreviation: e.target.value })}
          className="input"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Color
        </label>
        <input
          type="color"
          value={formData.color}
          onChange={(e) => setFormData({ ...formData, color: e.target.value })}
          className="input h-12"
        />
      </div>

      <div className="flex gap-3 pt-4">
        <button type="submit" className="btn btn-primary flex-1">
          {course ? 'Update' : 'Create'}
        </button>
        <button type="button" onClick={onCancel} className="btn btn-secondary flex-1">
          Cancel
        </button>
      </div>
    </form>
  )
}
