"use client"
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline"
import { ICertType } from "@/models/cert-type-model"
import { ICertificate } from "@/models/certificate-model"
import { deleteApi } from "@/utils/server-api"
import { IName } from "@/models/name-model"
import { ISurname } from "@/models/surname-model"
import { IPhone } from "@/models/phone-model"
import { IAddress } from "@/models/address-model"

type IProps = {
  certTypes: ICertType[]
  names: IName[]
  surnames: ISurname[]
  phones: IPhone[]
  addresses: IAddress[]
  setEditCert: (
    name: IName,
    surname: ISurname,
    address: IAddress,
    phone: IPhone
  ) => void
  getCertFromApi: (
    names: IName[],
    surnames: ISurname[],
    phones: IPhone[],
    addresses: IAddress[]
  ) => void
}

export function TeacherList(props: IProps) {
  const { setEditCert, getCertFromApi, names, surnames, phones, addresses } =
    props

  const changeCert = (id?: string) => {
    if (!id) return
    const nam = names.find((i) => i.id === id)
    if (!nam) return
    setEditCert(
      nam,
      surnames.find((i) => i.id === id)!,
      addresses.find((i) => i.id === id)!,
      phones.find((i) => i.id === id)!
    )
  }
  const deleteCert = async (id?: string) => {
    if (!id) return
    const nam = names.find((i) => i.id == id)
    if (!nam) return
    await deleteApi(`/api/teachers/${id}`, {})
    getCertFromApi(names, surnames, phones, addresses)
  }
  return (
    <table className="w-full text-sm text-left text-gray-500">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
          <th scope="col" className="px-6 py-3">
            Mokytojo vardas
          </th>
          <th scope="col" className="px-6 py-3">
            Mokytojo pavardė
          </th>
          <th scope="col" className="px-6 py-3">
            Mokytojo gyvenamoji vieta
          </th>
          <th scope="col" className="px-6 py-3">
            Mokytojo telefonas
          </th>
          <th scope="col" className="px-6 py-3">
            Veiksmai
          </th>
        </tr>
      </thead>
      <tbody className="bg-white border-b">
        {names.map((n) => (
          <tr key={n.id}>
            <td className="px-6 py-4">{n.name}</td>
            <td className="px-6 py-4">
              {surnames.find((s) => s.id === n.id)?.surname}
            </td>
            <td className="px-6 py-4">
              {addresses.find((a) => a.id === n.id)?.address}
            </td>
            <td className="px-6 py-4">
              {phones.find((p) => p.id === n.id)?.phone}
            </td>
            <td className="px-6 py-4">
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
