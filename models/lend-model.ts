import { model, models, Schema } from "mongoose"

export interface ILend {
  id?: string
  typeId: string
  lend: string
  isCreated?: boolean
}

const LendSchema = new Schema<ILend>(
  {
    typeId: String,
    lend: String,
    isCreated: Boolean,
  },
  {
    timestamps: false,
    collection: "lends",
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
export const Lend = models.Lend || model("Lend", LendSchema)
