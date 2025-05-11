"use client"
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline"
import { ICertType } from "@/models/cert-type-model"
import { ICertificate } from "@/models/certificate-model"
import { deleteApi } from "@/utils/server-api"
import { ILesson } from "@/models/lesson-model"

type IProps = {
  certTypes: ICertType[]
  lessons: ILesson[]
  setEditCert: (lesson: ILesson) => void
  getCertFromApi: (lessons: ILesson[]) => void
}

export function TeacherList(props: IProps) {
  const { setEditCert, getCertFromApi, lessons } = props

  const changeCert = (id?: string) => {
    if (!id) return
    const les = lessons.find((i) => i.id === id)
    if (!les) return
    setEditCert(les)
  }
  const deleteCert = async (id?: string) => {
    if (!id) return
    const nam = lessons.find((i) => i.id == id)
    if (!nam) return
    await deleteApi(`/api/lessons/${id}`, {})
    getCertFromApi(lessons)
  }
  return (
    <table className="w-full text-sm text-left text-gray-500">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
          <th scope="col" className="px-6 py-3">
            Pamoka
          </th>
          <th scope="col" className="px-6 py-3">
            Veiksmai
          </th>
        </tr>
      </thead>
      <tbody className="bg-white border-b">
        {lessons.map((n) => (
          <tr key={n.id}>
            <td className="px-6 py-4">{n.lesson}</td>
            <td className="px-6 py-4">
              <button title="Keisti duomenis" onClick={() => changeCert(n.id)}>
                <PencilIcon className="w-5 h-5 stroke-blue-600" />
              </button>
              <button title="Trinti duomenis" onClick={() => deleteCert(n.id)}>
                <TrashIcon className="w-5 h-5 stroke-red-600" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
