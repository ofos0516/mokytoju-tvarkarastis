import { type NextRequest } from "next/server"
import { ICertificate } from "@/models/certificate-model"
import { CertificateService } from "@/services/certificate-service"
import { LessonService } from "@/services/lesson-service"

export async function PUT(
  request: NextRequest,
  res: { params: { lessonid: string } }
) {
  const certificate: ICertificate = await request.json()
  const certificateService = new CertificateService()
  await certificateService.updateCertificate(certificate)
  return Response.json({ messsage: "Pakeitimas sėkmingai įvykditas" })
}
export async function DELETE(
  request: NextRequest,
  res: { params: { lessonid: string } }
) {
  const lessonService = new LessonService()

  await lessonService.deleteLesson(res.params.lessonid)

  return Response.json({ messsage: "Duomenys sėkmingai ištrinti" })
}
