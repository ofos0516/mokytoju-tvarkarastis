import { model, models, Schema } from "mongoose"

export interface ICertType {
  id: string
  title: string
}

const CertTypeSchema = new Schema<ICertType>(
  {
    title: String,
  },
  {
    timestamps: false,
    collection: "cert_types",
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

export const CertType = models.CertType || model("CertType", CertTypeSchema)
