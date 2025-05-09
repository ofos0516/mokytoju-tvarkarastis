import { Address, IAddress } from "@/models/address-model"
import { connMongoose } from "@/utils/connect-mongoose"
import { Types } from "mongoose"

export class AddressService {
  async getAddresses(): Promise<IAddress[]> {
    await connMongoose()
    const addresses = await Address.find().sort({ address: 1 })
    return addresses
  }

  async saveAddress(address: IAddress): Promise<void> {
    await connMongoose()
    await Address.create(address)
  }

  async updateAddress(address: IAddress): Promise<void> {
    await connMongoose()
    const id = address.id ?? ""
    delete address.id
    await Address.updateOne({ _id: new Types.ObjectId(id) }, address)
  }

  async deleteAddress(id: string): Promise<void> {
    await connMongoose()
    await Address.deleteOne({ _id: new Types.ObjectId(id) })
  }
}
