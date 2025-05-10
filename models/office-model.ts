import { model, models, Schema } from "mongoose"

export interface IOffice {
  id?: string
  typeId: string
  office: string
  isCreated?: boolean
}

const OfficeSchema = new Schema<IOffice>(
  {
    typeId: String,
    office: String,
    isCreated: Boolean,
  },
  {
    timestamps: false,
    collection: "offices",
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
export const Office = models.Office || model("Office", OfficeSchema)
