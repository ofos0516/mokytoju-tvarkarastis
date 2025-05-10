import { model, models, Schema } from "mongoose"

export interface ISubject {
  id?: string
  typeId: string
  subject: string
  isCreated?: boolean
}

const SubjectSchema = new Schema<ISubject>(
  {
    typeId: String,
    subject: String,
    isCreated: Boolean,
  },
  {
    timestamps: false,
    collection: "subjects",
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
export const Subject = models.Subject || model("Subject", SubjectSchema)
