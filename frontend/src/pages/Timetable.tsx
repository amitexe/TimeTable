import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { timetableAPI, TimetableResponse } from '@/services/api'
import { Calendar, AlertCircle, Loader2 } from 'lucide-react'

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
const PERIODS = [1, 2, 3, 4, 5, 6, 7, 8]

export default function Timetable() {
  const [timetableData, setTimetableData] = useState<TimetableResponse | null>(null)

  const generateMutation = useMutation({
    mutationFn: timetableAPI.generate,
    onSuccess: (response) => {
      setTimetableData(response.data)
    }
  })

  const handleGenerate = () => {
    generateMutation.mutate()
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Timetable</h1>
          <p className="text-gray-600 mt-1">Generate and view automatic timetables</p>
        </div>
        <button
          onClick={handleGenerate}
          disabled={generateMutation.isPending}
          className="btn btn-primary flex items-center gap-2"
        >
          {generateMutation.isPending ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Calendar className="w-5 h-5" />
              Generate Timetable
            </>
          )}
        </button>
      </div>

      {generateMutation.isError && (
        <div className="card bg-red-50 border-red-200 mb-6">
          <div className="flex items-center gap-3 text-red-800">
            <AlertCircle className="w-5 h-5" />
            <p>Error generating timetable. Please make sure you have added courses, classes, faculties, and lessons.</p>
          </div>
        </div>
      )}

      {timetableData && (
        <div className="space-y-8">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="card">
              <p className="text-sm text-gray-600">Total Classes</p>
              <p className="text-2xl font-bold text-gray-900">{timetableData.stats.total_classes}</p>
            </div>
            <div className="card">
              <p className="text-sm text-gray-600">Lessons Placed</p>
              <p className="text-2xl font-bold text-green-600">{timetableData.stats.total_lessons_placed}</p>
            </div>
            <div className="card">
              <p className="text-sm text-gray-600">Pending Lessons</p>
              <p className="text-2xl font-bold text-orange-600">{timetableData.stats.total_pending}</p>
            </div>
          </div>

          {/* Timetables */}
          {Object.entries(timetableData.timetable).map(([className, schedule]) => (
            <div key={className} className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">{className}</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="border p-2 bg-gray-50 font-semibold">Period</th>
                      {DAYS.map(day => (
                        <th key={day} className="border p-2 bg-gray-50 font-semibold">
                          {day}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {PERIODS.map(period => (
                      <tr key={period}>
                        <td className="border p-2 text-center font-medium bg-gray-50">
                          {period}
                        </td>
                        {DAYS.map(day => {
                          const slot = schedule[day]?.[period - 1]
                          return (
                            <td key={day} className="border p-2">
                              {slot && typeof slot === 'object' ? (
                                <div
                                  className="p-2 rounded text-white text-sm"
                                  style={{ backgroundColor: slot.color }}
                                >
                                  <div className="font-semibold">{slot.course_abbr}</div>
                                  <div className="text-xs opacity-90">{slot.faculty_abbr}</div>
                                </div>
                              ) : (
                                <div className="p-2 text-center text-gray-400">—</div>
                              )}
                            </td>
                          )
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}

          {/* Pending Lessons */}
          {timetableData.pending.length > 0 && (
            <div className="card bg-orange-50 border-orange-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Pending Lessons</h2>
              <div className="space-y-2">
                {timetableData.pending.map((item, index) => (
                  <div key={index} className="p-3 bg-white rounded border">
                    <p className="font-medium text-gray-900">
                      {item.course} - {item.class}
                    </p>
                    <p className="text-sm text-gray-600">
                      Faculty: {item.faculty}
                    </p>
                    <p className="text-xs text-orange-600 mt-1">
                      {item.reason}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {!timetableData && !generateMutation.isPending && (
        <div className="card text-center py-12">
          <Calendar className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Timetable Generated</h3>
          <p className="text-gray-600">
            Click the "Generate Timetable" button to create a new timetable based on your lessons.
          </p>
        </div>
      )}
    </div>
  )
}
