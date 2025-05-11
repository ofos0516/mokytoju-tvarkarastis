import { model, models, Schema } from "mongoose"

export interface ILesson {
  id?: string
  typeId: string
  lesson: string
  isCreated?: boolean
}

const LessonSchema = new Schema<ILesson>(
  {
    typeId: String,
    lesson: String,
    isCreated: Boolean,
  },
  {
    timestamps: false,
    collection: "lessons",
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
export const Lesson = models.Lesson || model("Lesson", LessonSchema)
