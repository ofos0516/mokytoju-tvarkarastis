import { OfficeService } from "@/services/office-serivce"
import { LstartService } from "@/services/lstart-service"
import { LendService } from "@/services/lend-service"
import { SubjectService } from "@/services/subject-service"
import { type NextRequest } from "next/server"

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
  const res = await request.json()
  const officeService = new OfficeService()
  await officeService.saveOffice(res)
  const subjectService = new SubjectService()
  await subjectService.saveSubject(res)
  const lstartService = new LstartService()
  await lstartService.saveLstart(res)
  const lendService = new LendService()
  await lendService.saveLend(res)
  return Response.json({ message: "Duomenys išsaugoti" })
}
