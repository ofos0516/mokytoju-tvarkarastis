import { OfficeService } from "@/services/office-serivce"
import { LstartService } from "@/services/lstart-service"
import { LendService } from "@/services/lend-service"
import { SubjectService } from "@/services/subject-service"
import { type NextRequest } from "next/server"
import { Types } from "mongoose"

export async function GET(request: NextRequest) {
  const officeService = new OfficeService()
  const offices = await officeService.getOffices()
  const subjectService = new SubjectService()
  const subjects = await subjectService.getSubjects()
  const lstartService = new LstartService()
  const lstarts = await lstartService.getLstarts()
  const lendService = new LendService()
  const lends = await lendService.getLends()
  return Response.json({ offices, subjects, lstarts, lends })
}

export async function POST(request: NextRequest) {
  const data = await request.json()

  // Generate a shared ID for all documents
  const sharedId = new Types.ObjectId()

  // Create data objects with the shared ID
  const subjectData = {
    _id: sharedId,
    typeId: data.typeId,
    subject: data.subject,
  }

  const officeData = {
    _id: sharedId,
    typeId: data.typeId,
    office: data.office,
  }

  const lstartData = {
    _id: sharedId,
    typeId: data.typeId,
    lstart: data.lstart,
  }

  const lendData = {
    _id: sharedId,
    typeId: data.typeId,
    lend: data.lend,
  }

  // Save all documents with the same ID
  const subjectService = new SubjectService()
  await subjectService.saveSubject(subjectData)

  const officeService = new OfficeService()
  await officeService.saveOffice(officeData)

  const lstartService = new LstartService()
  await lstartService.saveLstart(lstartData)

  const lendService = new LendService()
  await lendService.saveLend(lendData)

  return Response.json({
    message: "Duomenys išsaugoti",
    id: sharedId.toString(),
  })
}
