"use client"
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline"
import { ICertType } from "@/models/cert-type-model"
import { ICertificate } from "@/models/certificate-model"
import { deleteApi } from "@/utils/server-api"
import { ISubject } from "@/models/subject-model"
import { IOffice } from "@/models/office-model"
import { ILstart } from "@/models/lstart-model"
import { ILend } from "@/models/lend-model"

type IProps = {
  certTypes: ICertType[]
  subjects: ISubject[]
  offices: IOffice[]
  lstarts: ILstart[]
  lends: ILend[]
  setEditCert: (
    subject: ISubject,
    office: IOffice,
    lstart: ILstart,
    lend: ILend
  ) => void
  getCertFromApi: (
    subjects: ISubject[],
    offices: IOffice[],
    lstarts: ILstart[],
    lends: ILend[]
  ) => void
}

export function TeacherList(props: IProps) {
  const { setEditCert, getCertFromApi, subjects, offices, lstarts, lends } =
    props

  const changeCert = (id?: string) => {
    if (!id) return
    const nam = subjects.find((i) => i.id === id)
    if (!nam) return
    setEditCert(
      nam,
      offices.find((i) => i.id === id)!,
      lstarts.find((i) => i.id === id)!,
      lends.find((i) => i.id === id)!
    )
  }
  const deleteCert = async (id?: string) => {
    if (!id) return
    const nam = subjects.find((i) => i.id == id)
    if (!nam) return
    await deleteApi(`/api/subjects/${id}`, {})
    getCertFromApi(subjects, offices, lstarts, lends)
  }
  return (
    <table className="w-full text-sm text-left text-gray-500">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
          <th scope="col" className="px-6 py-3">
            Dalykas
          </th>
          <th scope="col" className="px-6 py-3">
            Kabinetas
          </th>
          <th scope="col" className="px-6 py-3">
            Pamokos pradžia
          </th>
          <th scope="col" className="px-6 py-3">
            Pamokos pabaiga
          </th>
          <th scope="col" className="px-6 py-3">
            Veiksmai
          </th>
        </tr>
      </thead>
      <tbody className="bg-white border-b">
        {subjects.map((sub) => (
          <tr key={sub.id}>
            <td className="px-6 py-4">{sub.subject}</td>
            <td className="px-6 py-4">
              {offices.find((off) => off.id === sub.id)?.office}
            </td>
            <td className="px-6 py-4">
              {lstarts.find((lst) => lst.id === sub.id)?.lstart}
            </td>
            <td className="px-6 py-4">
              {lends.find((len) => len.id === sub.id)?.lend}
            </td>
            <td className="px-6 py-4 flex gap-2">
              <button
                title="Keisti duomenis"
                onClick={() => changeCert(sub.id)}
              >
                <PencilIcon className="w-5 h-5 stroke-blue-600" />
              </button>
              <button
                title="Trinti duomenis"
                onClick={() => deleteCert(sub.id)}
              >
                <TrashIcon className="w-5 h-5 stroke-red-600" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
