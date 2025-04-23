import { IProgrammeWithFaculty, Programme } from "@/models/programme-model"
import { connMongoose } from "@/utils/connect-mongoose"
import { Types } from "mongoose"

export class ProgrammeService {
  async getProgrammes(facultyId: string) {
    await connMongoose()
    const programmes = await Programme.find()
    return programmes
  }
}

const programmeWithFaculty = await Programme.aggregate<IProgrammeWithFaculty>([
  {
    $match: {
      facultyId: new Types.ObjectId(""),
    },
  },
  {
    $lookup: {
      from: "faculties",
      localField: "facultyId",
      foreignField: "_id",
      as: "faculty",
    },
  },
  {
    $unwind: "$faculty",
  },
  {
    $project: {
      facultyId: 0,
    },
  },
])
