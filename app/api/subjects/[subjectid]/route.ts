import { OfficeService } from "@/services/office-serivce"
import { LstartService } from "@/services/lstart-service"
import { LendService } from "@/services/lend-service"
import { SubjectService } from "@/services/subject-service"
import { type NextRequest } from "next/server"
import { ICertificate } from "@/models/certificate-model"
import { CertificateService } from "@/services/certificate-service"

export async function PUT(
  request: NextRequest,
  res: { params: { subjectid: string } }
) {
  const certificate: ICertificate = await request.json()
  const certificateService = new CertificateService()
  await certificateService.updateCertificate(certificate)
  return Response.json({ messsage: "Pakeitimas sėkmingai įvykditas" })
}
export async function DELETE(
  request: NextRequest,
  res: { params: { subjectid: string } }
) {
  const subjectService = new SubjectService()
  const officeService = new OfficeService()
  const lstartService = new LstartService()
  const lendService = new LendService()

  await subjectService.deleteSubject(res.params.subjectid)
  await officeService.deleteOffice(res.params.subjectid)
  await lstartService.deleteLstart(res.params.subjectid)
  await lendService.deleteLend(res.params.subjectid)

  return Response.json({ messsage: "Duomenys sėkmingai ištrinti" })
}
