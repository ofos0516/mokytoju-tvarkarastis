import { AddressService } from "@/services/address-service"
import { NameService } from "@/services/name-service"
import { PhoneService } from "@/services/phone-service"
import { SurnameService } from "@/services/surname-service"
import { type NextRequest } from "next/server"

export async function GET(request: NextRequest) {
  const addressService = new AddressService()
  const addresses = await addressService.getAddresses()
  const nameService = new NameService()
  const names = await nameService.getNames()
  const phoneService = new PhoneService()
  const phones = await phoneService.getPhones()
  const surnameService = new SurnameService()
  const surnames = await surnameService.getSurnames()
  return Response.json({ addresses, names, phones, surnames })
}

export async function POST(request: NextRequest) {
  const res = await request.json()
  const addressService = new AddressService()
  await addressService.saveAddress(res)
  const nameService = new NameService()
  await nameService.saveName(res)
  const phoneService = new PhoneService()
  await phoneService.savePhone(res)
  const surnameService = new SurnameService()
  await surnameService.saveSurname(res)
  return Response.json({ message: "Duomenys išsaugoti" })
}
