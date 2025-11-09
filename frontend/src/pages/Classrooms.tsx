import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { classroomsAPI, Classroom } from '@/services/api'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import Modal from '@/components/Modal'

export default function Classrooms() {
  const queryClient = useQueryClient()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingClassroom, setEditingClassroom] = useState<Classroom | null>(null)
  
  const { data: classrooms, isLoading } = useQuery({
    queryKey: ['classrooms'],
    queryFn: () => classroomsAPI.getAll().then(res => res.data)
  })

  const createMutation = useMutation({
    mutationFn: classroomsAPI.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['classrooms'] })
      setIsModalOpen(false)
    }
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Classroom> }) =>
      classroomsAPI.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['classrooms'] })
      setIsModalOpen(false)
      setEditingClassroom(null)
    }
  })

  const deleteMutation = useMutation({
    mutationFn: classroomsAPI.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['classrooms'] })
    }
  })

  const handleSubmit = (data: Classroom) => {
    if (editingClassroom?.id) {
      updateMutation.mutate({ id: editingClassroom.id, data })
    } else {
      createMutation.mutate(data)
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Classrooms</h1>
        <button
          onClick={() => {
            setEditingClassroom(null)
            setIsModalOpen(true)
          }}
          className="btn btn-primary flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Classroom
        </button>
      </div>

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {classrooms?.map((classroom) => (
            <div
              key={classroom.id}
              className="card"
              style={{ borderLeft: `4px solid ${classroom.color}` }}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{classroom.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{classroom.abbreviation}</p>
                  <div className="flex gap-2 mt-2">
                    {classroom.is_homeroom && (
                      <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                        Homeroom
                      </span>
                    )}
                    {classroom.is_shared && (
                      <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded">
                        Shared
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditingClassroom(classroom)
                      setIsModalOpen(true)
                    }}
                    className="p-2 hover:bg-gray-100 rounded"
                  >
                    <Pencil className="w-4 h-4 text-gray-600" />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm('Delete this classroom?')) {
                        deleteMutation.mutate(classroom.id!)
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
          setEditingClassroom(null)
        }}
        title={editingClassroom ? 'Edit Classroom' : 'Add Classroom'}
      >
        <ClassroomForm
          classroom={editingClassroom}
          onSubmit={handleSubmit}
          onCancel={() => {
            setIsModalOpen(false)
            setEditingClassroom(null)
          }}
        />
      </Modal>
    </div>
  )
}

function ClassroomForm({ 
  classroom, 
  onSubmit, 
  onCancel 
}: { 
  classroom: Classroom | null; 
  onSubmit: (data: Classroom) => void; 
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState<Classroom>({
    name: classroom?.name || '',
    abbreviation: classroom?.abbreviation || '',
    color: classroom?.color || '#10B981',
    is_homeroom: classroom?.is_homeroom || false,
    is_shared: classroom?.is_shared ?? true,
  })

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(formData) }} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Room Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="input"
          required
        />
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
        <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
        <input
          type="color"
          value={formData.color}
          onChange={(e) => setFormData({ ...formData, color: e.target.value })}
          className="input h-12"
        />
      </div>
      <div className="flex gap-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={formData.is_homeroom}
            onChange={(e) => setFormData({ ...formData, is_homeroom: e.target.checked })}
            className="mr-2"
          />
          <span className="text-sm text-gray-700">Homeroom</span>
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={formData.is_shared}
            onChange={(e) => setFormData({ ...formData, is_shared: e.target.checked })}
            className="mr-2"
          />
          <span className="text-sm text-gray-700">Shared</span>
        </label>
      </div>
      <div className="flex gap-3 pt-4">
        <button type="submit" className="btn btn-primary flex-1">
          {classroom ? 'Update' : 'Create'}
        </button>
        <button type="button" onClick={onCancel} className="btn btn-secondary flex-1">
          Cancel
        </button>
      </div>
    </form>
  )
}
