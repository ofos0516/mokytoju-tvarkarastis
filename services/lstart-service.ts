import { Lstart, ILstart } from "@/models/lstart-model"
import { connMongoose } from "@/utils/connect-mongoose"
import { Types } from "mongoose"

export class LstartService {
  async getLstarts(): Promise<ILstart[]> {
    await connMongoose()
    const lstarts = await Lstart.find().sort({ lstart: 1 })
    return lstarts
  }

  async saveLstart(lstart: ILstart): Promise<void> {
    await connMongoose()
    await Lstart.create(lstart)
  }

  async updateLstart(lstart: ILstart): Promise<void> {
    await connMongoose()
    const id = lstart.id ?? ""
    delete lstart.id
    await Lstart.updateOne({ _id: new Types.ObjectId(id) }, lstart)
  }

  async deleteLstart(id: string): Promise<void> {
    await connMongoose()
    await Lstart.deleteOne({ _id: new Types.ObjectId(id) })
  }
}
