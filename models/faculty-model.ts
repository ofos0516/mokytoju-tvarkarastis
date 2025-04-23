import { model, models, Schema } from "mongoose"

export interface IFaculty {
  id: string
  title: string
}

const FacultySchema = new Schema<IFaculty>(
  {
    title: String,
  },
  {
    timestamps: false,
    collection: "faculties",
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

export const Faculty = models.Faculty || model("Faculty", FacultySchema)
