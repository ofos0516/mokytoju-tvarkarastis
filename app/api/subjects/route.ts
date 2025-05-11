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
  try {
    const data = await request.json()
    console.log("POST /api/subjects received data:", data)

    // Generate a single MongoDB ObjectId to use for all records
    const sharedId = new Types.ObjectId()

    // Create objects with the same ID for all services
    const subjectData = {
      _id: sharedId,
      typeId: data.typeId || "",
      subject: data.subject,
      isCreated: true,
    }

    const officeData = {
      _id: sharedId,
      typeId: data.typeId || "",
      office: data.office,
      isCreated: true,
    }

    const lstartData = {
      _id: sharedId,
      typeId: data.typeId || "",
      lstart: data.lstart,
      isCreated: true,
    }

    const lendData = {
      _id: sharedId,
      typeId: data.typeId || "",
      lend: data.lend,
      isCreated: true,
    }

    // Save all records with the same ID
    const subjectService = new SubjectService()
    await subjectService.saveSubject(subjectData)

    const officeService = new OfficeService()
    await officeService.saveOffice(officeData)

    const lstartService = new LstartService()
    await lstartService.saveLstart(lstartData)

    const lendService = new LendService()
    await lendService.saveLend(lendData)

    console.log("Subject data saved successfully with ID:", sharedId.toString())

    return Response.json({
      message: "Duomenys išsaugoti",
      id: sharedId.toString(),
    })
  } catch (error) {
    console.error("Error in POST /api/subjects:", error)
    return Response.json(
      {
        message: "Klaida išsaugant duomenis",
        error: String(error),
      },
      { status: 500 }
    )
  }
}
