import { Phone, IPhone } from "@/models/phone-model"
import { connMongoose } from "@/utils/connect-mongoose"
import { Types } from "mongoose"

export class PhoneService {
  async getPhones(): Promise<IPhone[]> {
    await connMongoose()
    const phones = await Phone.find().sort({ phone: 1 })
    return phones
  }

  async savePhone(phone: IPhone): Promise<void> {
    await connMongoose()
    await Phone.create(phone)
  }

  async updatePhone(phone: IPhone): Promise<void> {
    await connMongoose()
    const id = phone.id ?? ""
    delete phone.id
    await Phone.updateOne({ _id: new Types.ObjectId(id) }, phone)
  }

  async deletePhone(id: string): Promise<void> {
    await connMongoose()
    await Phone.deleteOne({ _id: new Types.ObjectId(id) })
  }
}
