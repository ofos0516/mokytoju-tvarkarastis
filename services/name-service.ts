import { Name, IName } from "@/models/name-model"
import { connMongoose } from "@/utils/connect-mongoose"
import { Types } from "mongoose"

export class NameService {
  async getNames(): Promise<IName[]> {
    await connMongoose()
    const names = await Name.find().sort({ name: 1 })
    return names
  }

  async saveName(name: IName): Promise<void> {
    await connMongoose()
    await Name.create(name)
  }

  async updateName(name: IName): Promise<void> {
    await connMongoose()
    const id = name.id ?? ""
    delete name.id
    await Name.updateOne({ _id: new Types.ObjectId(id) }, name)
  }

  async deleteName(id: string): Promise<void> {
    await connMongoose()
    await Name.deleteOne({ _id: new Types.ObjectId(id) })
  }
}
