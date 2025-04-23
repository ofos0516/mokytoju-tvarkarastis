import { model, models, Schema } from "mongoose"
import { IFaculty } from "./faculty-model"

export interface IProgramme {
  id: string
  title: string
}

export interface IProgrammeWithFaculty extends IProgramme {
  faculty: IFaculty
}

const ProgrammeSchema = new Schema<IProgramme>(
  {
    title: String,
  },
  {
    timestamps: false,
    collection: "programmes",
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

export const Programme = models.Programme || model("Programme", ProgrammeSchema)
