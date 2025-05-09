import { model, models, Schema } from "mongoose"

export interface IPhone {
  id?: string
  typeId: string
  phone: string
  isCreated?: boolean
}

const PhoneSchema = new Schema<IPhone>(
  {
    typeId: String,
    phone: String,
    isCreated: Boolean,
  },
  {
    timestamps: false,
    collection: "phones",
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
export const Phone = models.Phone || model("Phone", PhoneSchema)
