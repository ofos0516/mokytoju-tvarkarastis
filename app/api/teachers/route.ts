import { AddressService } from "@/services/address-service"
import { NameService } from "@/services/name-service"
import { PhoneService } from "@/services/phone-service"
import { SurnameService } from "@/services/surname-service"
import { type NextRequest } from "next/server"
import { Types } from "mongoose"

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
  const data = await request.json()

  const sharedId = new Types.ObjectId()

  const nameData = {
    _id: sharedId,
    typeId: data.typeId,
    name: data.name,
  }

  const surnameData = {
    _id: sharedId,
    typeId: data.typeId,
    surname: data.surname,
  }

  const addressData = {
    _id: sharedId,
    typeId: data.typeId,
    address: data.address,
  }

  const phoneData = {
    _id: sharedId,
    typeId: data.typeId,
    phone: data.phone,
  }

  const nameService = new NameService()
  await nameService.saveName(nameData)

  const surnameService = new SurnameService()
  await surnameService.saveSurname(surnameData)

  const addressService = new AddressService()
  await addressService.saveAddress(addressData)

  const phoneService = new PhoneService()
  await phoneService.savePhone(phoneData)

  return Response.json({
    message: "Duomenys išsaugoti",
    id: sharedId.toString(),
  })
}
