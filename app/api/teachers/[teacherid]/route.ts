import { AddressService } from "@/services/address-service"
import { type NextRequest } from "next/server"
import { ICertificate } from "@/models/certificate-model"
import { CertificateService } from "@/services/certificate-service"
import { NameService } from "@/services/name-service"
import { PhoneService } from "@/services/phone-service"
import { SurnameService } from "@/services/surname-service"
import { IName } from "@/models/name-model"
import { ISurname } from "@/models/surname-model"
import { IAddress } from "@/models/address-model"
import { IPhone } from "@/models/phone-model"

export async function PUT(
  request: NextRequest,
  res: { params: { teacherid: string } }
) {
  const name: IName = await request.json()
  const surname: ISurname = await request.json()
  const address: IAddress = await request.json()
  const phone: IPhone = await request.json()
  const nameService = new NameService()
  const surnameService = new SurnameService()
  const addressService = new AddressService()
  const phoneService = new PhoneService()

  await nameService.updateName(name)
  await surnameService.updateSurname(surname)
  await addressService.updateAddress(address)
  await phoneService.updatePhone(phone)

  return Response.json({ message: "Pakeitimas sėkmingai įvykditas" })
}
export async function DELETE(
  request: NextRequest,
  res: { params: { teacherid: string } }
) {
  const nameService = new NameService()
  const surnameService = new SurnameService()
  const addressService = new AddressService()
  const phoneService = new PhoneService()

  await nameService.deleteName(res.params.teacherid)
  await surnameService.deleteSurname(res.params.teacherid)
  await addressService.deleteAddress(res.params.teacherid)
  await phoneService.deletePhone(res.params.teacherid)

  return Response.json({ message: "Duomenys sėkmingai ištrinti" })
}
