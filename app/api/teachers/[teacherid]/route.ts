import { AddressService } from "@/services/address-service"
import { type NextRequest } from "next/server"
import { ICertificate } from "@/models/certificate-model"
import { CertificateService } from "@/services/certificate-service"
import { NameService } from "@/services/name-service"
import { PhoneService } from "@/services/phone-service"
import { SurnameService } from "@/services/surname-service"

export async function PUT(
  request: NextRequest,
  res: { params: { teacherid: string } }
) {
  const certificate: ICertificate = await request.json()
  const certificateService = new CertificateService()
  await certificateService.updateCertificate(certificate)
  return Response.json({ messsage: "Pakeitimas sėkmingai įvykditas" })
}
export async function DELETE(
  request: NextRequest,
  res: { params: { teacherid: string } }
) {
  const nameService = new NameService()
  const surnameService = new SurnameService()
  const addressService = new AddressService()
  const phoneService = new PhoneService()
  try {
    await nameService.deleteName(res.params.teacherid)
    await surnameService.deleteSurname(res.params.teacherid)
    await addressService.deleteAddress(res.params.teacherid)
    await phoneService.deletePhone(res.params.teacherid)
  } catch (error) {
    return Response.json({ messsage: "Klaida trinant duomenis" })
  }
  return Response.json({ messsage: "Duomenys sėkmingai ištrinti" })
}
