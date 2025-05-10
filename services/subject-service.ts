import { Subject, ISubject } from "@/models/subject-model"
import { connMongoose } from "@/utils/connect-mongoose"
import { Types } from "mongoose"

export class SubjectService {
  async getSubjects(): Promise<ISubject[]> {
    await connMongoose()
    const subjects = await Subject.find().sort({ subject: 1 })
    return subjects
  }

  async saveSubject(subject: ISubject): Promise<void> {
    await connMongoose()
    await Subject.create(subject)
  }

  async updateSubject(subject: ISubject): Promise<void> {
    await connMongoose()
    const id = subject.id ?? ""
    delete subject.id
    await Subject.updateOne({ _id: new Types.ObjectId(id) }, subject)
  }

  async deleteSubject(id: string): Promise<void> {
    await connMongoose()
    await Subject.deleteOne({ _id: new Types.ObjectId(id) })
  }
}
