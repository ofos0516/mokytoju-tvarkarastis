"use client"
import { ICertType } from "@/models/cert-type-model"
import { ICertificate } from "@/models/certificate-model"
import { Form } from "./form"
import { TeacherList } from "./list"
import { useEffect, useState } from "react"
import { getApi } from "@/utils/server-api"
import { ISubject } from "@/models/subject-model"
import { IOffice } from "@/models/office-model"
import { ILstart } from "@/models/lstart-model"
import { ILend } from "@/models/lend-model"

type IProps = { certTypes: ICertType[] }

export function Wrapper(props: IProps) {
  const { certTypes } = props
  const [editCert, setEditCert] = useState<any | undefined>()
  const [certificates, setCertificates] = useState<any[]>([])
  const [subjects, setSubjects] = useState<ISubject[]>([])
  const [offices, setOffices] = useState<IOffice[]>([])
  const [lstarts, setLstarts] = useState<ILstart[]>([])
  const [lends, setLends] = useState<ILend[]>([])

  const getCertFromApi = () => {
    getApi<any>(`/api/subjects`).then((res) => {
      setSubjects(res.subjects ?? [])
      setOffices(res.offices ?? [])
      setLstarts(res.lstarts ?? [])
      setLends(res.lends ?? [])
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
        setEditCert={setEditCert}
        subjects={subjects}
        offices={offices}
        lstarts={lstarts}
        lends={lends}
      />
    </div>
  )
}
