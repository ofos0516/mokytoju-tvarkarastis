"use client"
import { ICertType } from "@/models/cert-type-model"
import { ICertificate } from "@/models/certificate-model"
import { Form } from "./form"
import { TeacherList } from "./list"
import { useEffect, useState } from "react"
import { getApi } from "@/utils/server-api"
import { IName } from "@/models/name-model"
import { ISurname } from "@/models/surname-model"
import { IPhone } from "@/models/phone-model"
import { IAddress } from "@/models/address-model"

type IProps = { certTypes: ICertType[] }

export function Wrapper(props: IProps) {
  const { certTypes } = props
  const [editCert, setEditCert] = useState<any | undefined>()
  const [certificates, setCertificates] = useState<any[]>([])
  const [names, setNames] = useState<IName[]>([])
  const [surnames, setSurnames] = useState<ISurname[]>([])
  const [phones, setPhones] = useState<IPhone[]>([])
  const [addresses, setAddresses] = useState<IAddress[]>([])

  const getCertFromApi = () => {
    getApi<any>(`/api/teachers`).then((res) => {
      setNames(res.names ?? [])
      setSurnames(res.surnames ?? [])
      setPhones(res.phones ?? [])
      setAddresses(res.addresses ?? [])
    })
  }

  useEffect(() => {
    getCertFromApi()
  }, [])

  return (
    <div className="grid gap-y-8">
      <Form
        certTypes={certTypes}
        getCertFromApi={getCertFromApi}
        setEditCert={setEditCert}
        editCert={editCert}
      />
      <TeacherList
        certTypes={certTypes}
        getCertFromApi={getCertFromApi}
        certificates={certificates}
        setEditCert={setEditCert}
        names={names}
        surnames={surnames}
        phones={phones}
        addresses={addresses}
      />
    </div>
  )
}
