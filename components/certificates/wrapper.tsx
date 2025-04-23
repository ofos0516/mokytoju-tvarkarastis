"use client"
import { ICertType } from "@/models/cert-type-model"
import { ICertificate } from "@/models/certificate-model"
import { Form } from "./form"
import { CertList } from "./list"
import { useEffect, useState } from "react"
import { getApi } from "@/utils/server-api"

type IProps = { certTypes: ICertType[] }

export function Wrapper(props: IProps) {
  const { certTypes } = props
  const [editCert, setEditCert] = useState<ICertificate | undefined>()
  const [certificates, setCertificates] = useState<ICertificate[]>([])

  const getCertFromApi = () => {
    getApi<ICertificate[]>(`/api/certificates`).then((res) => {
      setCertificates(res ?? [])
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
      <CertList
        certTypes={certTypes}
        getCertFromApi={getCertFromApi}
        certificates={certificates}
        setEditCert={setEditCert}
      />
    </div>
  )
}
