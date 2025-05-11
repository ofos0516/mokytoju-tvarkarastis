"use client"
import { ICertType } from "@/models/cert-type-model"
import { ICertificate } from "@/models/certificate-model"
import { Form } from "./form"
import { TeacherList } from "./list"
import { useEffect, useState } from "react"
import { getApi } from "@/utils/server-api"
import { ILesson } from "@/models/lesson-model"

type IProps = { certTypes: ICertType[] }

export function Wrapper(props: IProps) {
  const { certTypes } = props
  const [editCert, setEditCert] = useState<any | undefined>()
  const [certificates, setCertificates] = useState<any[]>([])
  const [lessons, setLessons] = useState<ILesson[]>([])

  const getCertFromApi = () => {
    getApi<any>(`/api/lessons`).then((res) => {
      setLessons(res.lessons ?? [])
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
        lessons={lessons}
      />
    </div>
  )
}
