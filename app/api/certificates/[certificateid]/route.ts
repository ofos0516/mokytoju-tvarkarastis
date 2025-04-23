import { type NextRequest } from "next/server"
import { ICertificate } from "@/models/certificate-model"
import { CertificateService } from "@/services/certificate-service"

export async function PUT(
  request: NextRequest,
  res: { params: { certificateId: string } }
) {
  const certificate: ICertificate = await request.json()
  const certificateService = new CertificateService()
  await certificateService.updateCertificate(certificate)
  return Response.json({ messsage: "Pakeitimas sėkmingai įvykditas" })
}
export async function DELETE(
  request: NextRequest,
  res: { params: { certificateId: string } }
) {
  const certificateService = new CertificateService()
  await certificateService.deleteCertificate(res.params.certificateId)
  return Response.json({ messsage: "Duomenys sėkmingai ištrinti" })
}
