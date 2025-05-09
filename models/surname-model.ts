import { model, models, Schema } from "mongoose"

export interface ISurname {
  id?: string
  typeId: string
  surname: string
  isCreated?: boolean
}

const SurnameSchema = new Schema<ISurname>(
  {
    typeId: String,
    surname: String,
    isCreated: Boolean,
  },
  {
    timestamps: false,
    collection: "surnames",
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
export const Surname = models.Surname || model("Surname", SurnameSchema)
