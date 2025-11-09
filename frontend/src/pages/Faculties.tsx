import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { facultiesAPI, Faculty } from '@/services/api'
import { Plus, Pencil, Trash2, User } from 'lucide-react'
import Modal from '@/components/Modal'

export default function Faculties() {
  const queryClient = useQueryClient()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingFaculty, setEditingFaculty] = useState<Faculty | null>(null)
  
  const { data: faculties, isLoading } = useQuery({
    queryKey: ['faculties'],
    queryFn: () => facultiesAPI.getAll().then(res => res.data)
  })

  const createMutation = useMutation({
    mutationFn: facultiesAPI.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['faculties'] })
      setIsModalOpen(false)
    }
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Faculty> }) =>
      facultiesAPI.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['faculties'] })
      setIsModalOpen(false)
      setEditingFaculty(null)
    }
  })

  const deleteMutation = useMutation({
    mutationFn: facultiesAPI.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['faculties'] })
    }
  })

  const handleSubmit = (data: Faculty) => {
    if (editingFaculty?.id) {
      updateMutation.mutate({ id: editingFaculty.id, data })
    } else {
      createMutation.mutate(data)
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Faculties</h1>
        <button
          onClick={() => {
            setEditingFaculty(null)
            setIsModalOpen(true)
          }}
          className="btn btn-primary flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Faculty
        </button>
      </div>

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {faculties?.map((faculty) => (
            <div
              key={faculty.id}
              className="card"
              style={{ borderLeft: `4px solid ${faculty.color}` }}
            >
              <div className="flex justify-between items-start">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gray-100 rounded-full">
                    <User className="w-6 h-6 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {faculty.title} {faculty.first_name} {faculty.last_name}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">{faculty.abbreviation}</p>
                    {faculty.email && (
                      <p className="text-xs text-gray-500 mt-1">{faculty.email}</p>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditingFaculty(faculty)
                      setIsModalOpen(true)
                    }}
                    className="p-2 hover:bg-gray-100 rounded"
                  >
                    <Pencil className="w-4 h-4 text-gray-600" />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm('Delete this faculty?')) {
                        deleteMutation.mutate(faculty.id!)
                      }
                    }}
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
          setEditingFaculty(null)
        }}
        title={editingFaculty ? 'Edit Faculty' : 'Add Faculty'}
      >
        <FacultyForm
          faculty={editingFaculty}
          onSubmit={handleSubmit}
          onCancel={() => {
            setIsModalOpen(false)
            setEditingFaculty(null)
          }}
        />
      </Modal>
    </div>
  )
}

function FacultyForm({ 
  faculty, 
  onSubmit, 
  onCancel 
}: { 
  faculty: Faculty | null; 
  onSubmit: (data: Faculty) => void; 
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState<Faculty>({
    first_name: faculty?.first_name || '',
    last_name: faculty?.last_name || '',
    abbreviation: faculty?.abbreviation || '',
    email: faculty?.email || '',
    phone: faculty?.phone || '',
    title: faculty?.title || 'Mr.',
    gender: faculty?.gender || 'Male',
    color: faculty?.color || '#8B5CF6',
    constraints: faculty?.constraints || { max_periods_per_day: 6 },
  })

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(formData) }} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
          <input
            type="text"
            value={formData.first_name}
            onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
            className="input"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
          <input
            type="text"
            value={formData.last_name}
            onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
            className="input"
            required
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Abbreviation</label>
        <input
          type="text"
          value={formData.abbreviation}
          onChange={(e) => setFormData({ ...formData, abbreviation: e.target.value })}
          className="input"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="input"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
        <input
          type="color"
          value={formData.color}
          onChange={(e) => setFormData({ ...formData, color: e.target.value })}
          className="input h-12"
        />
      </div>
      <div className="flex gap-3 pt-4">
        <button type="submit" className="btn btn-primary flex-1">
          {faculty ? 'Update' : 'Create'}
        </button>
        <button type="button" onClick={onCancel} className="btn btn-secondary flex-1">
          Cancel
        </button>
      </div>
    </form>
  )
}
