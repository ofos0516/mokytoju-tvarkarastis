"use client"
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline"
import { ICertType } from "@/models/cert-type-model"
import { ICertificate } from "@/models/certificate-model"
import { deleteApi } from "@/utils/server-api"

type IProps = {
  certTypes: ICertType[]
  certificates: ICertificate[]
  setEditCert: (cert: ICertificate) => void
  getCertFromApi: (cert: ICertificate[]) => void
}

export function CertList(props: IProps) {
  const { certTypes, certificates, setEditCert, getCertFromApi } = props

  const findType = (id?: string) => certTypes.find((i) => i.id == id)?.title

  const changeCert = (id?: string) => {
    if (!id) return
    const cert = certificates.find((i) => i.id === id)
    if (!cert) return
    setEditCert(cert)
  }
  const deleteCert = async (id?: string) => {
    if (!id) return
    const cert = certificates.find((i) => i.id == id)
    if (!cert) return
    deleteApi(`/api/certificates/${id}`, cert)
    getCertFromApi(certificates)
  }
  return (
    <table className="w-full text-sm text-left text-gray-500">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
          <th scope="col" className="px-6 py-3">
            Pavadinimas
          </th>
          <th scope="col" className="px-6 py-3">
            Pastaba
          </th>
          <th scope="col" className="px-6 py-3">
            Veiksmai
          </th>
        </tr>
      </thead>
      <tbody className="bg-white border-b">
        {certificates.map((c) => (
          <tr key={c.id}>
            <td className="px-6 py-4">{findType(c.typeId)}</td>
            <td className="px-6 py-4">{c.company}</td>
            <td className="px-6 py-4">
              <button title="Keisti duomenis" onClick={() => changeCert(c.id)}>
                <PencilIcon className="w-5 h-5 stroke-blue-600" />
              </button>
              <button title="Trinti duomenis" onClick={() => deleteCert(c.id)}>
                <TrashIcon className="w-5 h-5 stroke-red-600" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
