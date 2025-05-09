import { model, models, Schema } from "mongoose"

export interface IAddress {
  id?: string
  typeId: string
  address: string
  isCreated?: boolean
}

const AddressSchema = new Schema<IAddress>(
  {
    typeId: String,
    address: String,
    isCreated: Boolean,
  },
  {
    timestamps: false,
    collection: "addresses",
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
export const Address = models.Address || model("Address", AddressSchema)
