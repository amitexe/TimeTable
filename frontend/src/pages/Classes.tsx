import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { classesAPI, Class } from '@/services/api'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import Modal from '@/components/Modal'

export default function Classes() {
  const queryClient = useQueryClient()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingClass, setEditingClass] = useState<Class | null>(null)
  
  const { data: classes, isLoading } = useQuery({
    queryKey: ['classes'],
    queryFn: () => classesAPI.getAll().then(res => res.data)
  })

  const createMutation = useMutation({
    mutationFn: classesAPI.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['classes'] })
      setIsModalOpen(false)
    }
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Class> }) =>
      classesAPI.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['classes'] })
      setIsModalOpen(false)
      setEditingClass(null)
    }
  })

  const deleteMutation = useMutation({
    mutationFn: classesAPI.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['classes'] })
    }
  })

  const handleSubmit = (data: Class) => {
    if (editingClass?.id) {
      updateMutation.mutate({ id: editingClass.id, data })
    } else {
      createMutation.mutate(data)
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Classes</h1>
        <button
          onClick={() => {
            setEditingClass(null)
            setIsModalOpen(true)
          }}
          className="btn btn-primary flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Class
        </button>
      </div>

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {classes?.map((cls) => (
            <div key={cls.id} className="card">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {cls.name} {cls.division}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Batches: {cls.batch_count}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditingClass(cls)
                      setIsModalOpen(true)
                    }}
                    className="p-2 hover:bg-gray-100 rounded"
                  >
                    <Pencil className="w-4 h-4 text-gray-600" />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm('Delete this class?')) {
                        deleteMutation.mutate(cls.id!)
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
          setEditingClass(null)
        }}
        title={editingClass ? 'Edit Class' : 'Add Class'}
      >
        <ClassForm
          cls={editingClass}
          onSubmit={handleSubmit}
          onCancel={() => {
            setIsModalOpen(false)
            setEditingClass(null)
          }}
        />
      </Modal>
    </div>
  )
}

function ClassForm({ 
  cls, 
  onSubmit, 
  onCancel 
}: { 
  cls: Class | null; 
  onSubmit: (data: Class) => void; 
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState<Class>({
    name: cls?.name || '',
    division: cls?.division || '',
    batch_count: cls?.batch_count || 1,
  })

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(formData) }} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Class Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="input"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Division</label>
        <input
          type="text"
          value={formData.division}
          onChange={(e) => setFormData({ ...formData, division: e.target.value })}
          className="input"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Batch Count</label>
        <input
          type="number"
          value={formData.batch_count}
          onChange={(e) => setFormData({ ...formData, batch_count: parseInt(e.target.value) })}
          className="input"
          min="1"
        />
      </div>
      <div className="flex gap-3 pt-4">
        <button type="submit" className="btn btn-primary flex-1">
          {cls ? 'Update' : 'Create'}
        </button>
        <button type="button" onClick={onCancel} className="btn btn-secondary flex-1">
          Cancel
        </button>
      </div>
    </form>
  )
}
