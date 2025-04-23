import { model, models, Schema } from "mongoose"

export interface ICertificate {
  id?: string
  typeId: string
  company: string
  isCreated?: boolean
}

const CertificateSchema = new Schema<ICertificate>(
  {
    typeId: String,
    company: String,
    isCreated: Boolean,
  },
  {
    timestamps: false,
    collection: "certificates",
    strict: true,
    toJSON: {
      versionKey: false,
      virtuals: true,
      transform: (_, ret) => {
        ret.id = ret._id
        delete ret._id
      },
    },
  }
)
export const Certificate =
  models.Certificate || model("Certificate", CertificateSchema)
