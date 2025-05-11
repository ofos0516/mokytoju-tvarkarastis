import { LessonService } from "@/services/lesson-service"
import { type NextRequest } from "next/server"

export async function GET(request: NextRequest) {
  const lessonService = new LessonService()
  const lessons = await lessonService.getLessons()
  return Response.json({ lessons })
}

export async function POST(request: NextRequest) {
  const res = await request.json()
  const lessonService = new LessonService()
  await lessonService.saveLesson(res)
  return Response.json({ message: "Duomenys išsaugoti" })
}
