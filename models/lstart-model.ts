import { model, models, Schema } from "mongoose"

export interface ILstart {
  id?: string
  typeId: string
  lstart: string
  isCreated?: boolean
}

const LstartSchema = new Schema<ILstart>(
  {
    typeId: String,
    lstart: String,
    isCreated: Boolean,
  },
  {
    timestamps: false,
    collection: "lstarts",
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
export const Lstart = models.Lstart || model("Lstart", LstartSchema)
