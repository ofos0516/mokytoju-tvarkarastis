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
  certificates: ICertificate[]
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
            <td>
              {surnames.map((s) => (
                <tr key={s.id}>
                  <td className="px-6 py-4">{s.surname}</td>
                </tr>
              ))}
            </td>
            <td>
              {addresses.map((a) => (
                <tr key={a.id}>
                  <td className="px-6 py-4">{a.address}</td>
                </tr>
              ))}
            </td>
            {phones.map((p) => (
              <tr key={p.id}>
                <td className="px-6 py-4">{p.phone}</td>
              </tr>
            ))}
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
