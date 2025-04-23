import { CertType } from "@/models/cert-type-model"
import { connMongoose } from "@/utils/connect-mongoose"

export class CertTypeService {
  async getAll() {
    await connMongoose()
    const certTypes = await CertType.find()
    return certTypes
  }
}
