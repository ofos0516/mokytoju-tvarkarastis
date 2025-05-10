import { Office, IOffice } from "@/models/office-model"
import { connMongoose } from "@/utils/connect-mongoose"
import { Types } from "mongoose"

export class OfficeService {
  async getOffices(): Promise<IOffice[]> {
    await connMongoose()
    const offices = await Office.find().sort({ office: 1 })
    return offices
  }

  async saveOffice(office: IOffice): Promise<void> {
    await connMongoose()
    await Office.create(office)
  }

  async updateOffice(office: IOffice): Promise<void> {
    await connMongoose()
    const id = office.id ?? ""
    delete office.id
    await Office.updateOne({ _id: new Types.ObjectId(id) }, office)
  }

  async deleteOffice(id: string): Promise<void> {
    await connMongoose()
    await Office.deleteOne({ _id: new Types.ObjectId(id) })
  }
}
