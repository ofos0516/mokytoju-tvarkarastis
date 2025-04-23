import { Faculty } from "@/models/faculty-model"
import { connMongoose } from "@/utils/connect-mongoose"

export class FacultyService {
  async getFaculties() {
    await connMongoose()
    const certTypes = await Faculty.find()
    return certTypes
  }
}
