import { Surname, ISurname } from "@/models/surname-model"
import { connMongoose } from "@/utils/connect-mongoose"
import { Types } from "mongoose"

export class SurnameService {
  async getSurnames(): Promise<ISurname[]> {
    await connMongoose()
    const surnames = await Surname.find().sort({ surname: 1 })
    return surnames
  }

  async saveSurname(surname: ISurname): Promise<void> {
    await connMongoose()
    await Surname.create(surname)
  }

  async updateSurname(surname: ISurname): Promise<void> {
    await connMongoose()
    const id = surname.id ?? ""
    delete surname.id
    await Surname.updateOne({ _id: new Types.ObjectId(id) }, surname)
  }

  async deleteSurname(id: string): Promise<void> {
    await connMongoose()
    await Surname.deleteOne({ _id: new Types.ObjectId(id) })
  }
}
