import { Lesson, ILesson } from "@/models/lesson-model"
import { connMongoose } from "@/utils/connect-mongoose"
import { Types } from "mongoose"

export class LessonService {
  async getLessons(): Promise<ILesson[]> {
    await connMongoose()
    const lessons = await Lesson.find().sort({ lesson: 1 })
    return lessons
  }

  async saveLesson(lesson: ILesson): Promise<void> {
    await connMongoose()
    await Lesson.create(lesson)
  }

  async updateLesson(lesson: ILesson): Promise<void> {
    await connMongoose()
    const id = lesson.id ?? ""
    delete lesson.id
    await Lesson.updateOne({ _id: new Types.ObjectId(id) }, lesson)
  }

  async deleteLesson(id: string): Promise<void> {
    await connMongoose()
    await Lesson.deleteOne({ _id: new Types.ObjectId(id) })
  }
}
