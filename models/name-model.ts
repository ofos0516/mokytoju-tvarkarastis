import { model, models, Schema } from "mongoose"

export interface IName {
  id?: string
  typeId: string
  name: string
  isCreated?: boolean
}

const NameSchema = new Schema<IName>(
  {
    typeId: String,
    name: String,
    isCreated: Boolean,
  },
  {
    timestamps: false,
    collection: "names",
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
export const Name = models.Name || model("Name", NameSchema)
