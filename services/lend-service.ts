import { Lend, ILend } from "@/models/lend-model"
import { connMongoose } from "@/utils/connect-mongoose"
import { Types } from "mongoose"

export class LendService {
  async getLends(): Promise<ILend[]> {
    await connMongoose()
    const lends = await Lend.find().sort({ lend: 1 })
    return lends
  }

  async saveLend(lend: ILend): Promise<void> {
    await connMongoose()
    await Lend.create(lend)
  }

  async updateLend(lend: ILend): Promise<void> {
    await connMongoose()
    const id = lend.id ?? ""
    delete lend.id
    await Lend.updateOne({ _id: new Types.ObjectId(id) }, lend)
  }

  async deleteLend(id: string): Promise<void> {
    await connMongoose()
    await Lend.deleteOne({ _id: new Types.ObjectId(id) })
  }
}
