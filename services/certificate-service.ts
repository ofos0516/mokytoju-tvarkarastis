import { Certificate, ICertificate } from "@/models/certificate-model"
import { connMongoose } from "@/utils/connect-mongoose"
import { Types } from "mongoose"

export class CertificateService {
  async getCertificates(): Promise<ICertificate[]> {
    await connMongoose()
    const certificates = await Certificate.find().sort({ company: 1 })
    return certificates
  }

  async saveCertificate(certificate: ICertificate): Promise<void> {
    await connMongoose()
    await Certificate.create(certificate)
  }

  async updateCertificate(certificate: ICertificate): Promise<void> {
    await connMongoose()
    const id = certificate.id ?? ""
    delete certificate.id
    await Certificate.updateOne({ _id: new Types.ObjectId(id) }, certificate)
  }

  async deleteCertificate(id: string): Promise<void> {
    await connMongoose()
    await Certificate.deleteOne({ _id: new Types.ObjectId(id) })
  }
}
