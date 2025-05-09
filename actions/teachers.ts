"use server"
import { IState } from "@/types/shared-t"
import { postApi, putApi, deleteApi } from "@/utils/server-api"
import { z } from "zod"

export async function createTeachers(
  prevState: IState,
  formData: FormData
): Promise<IState> {
  const schema = z.object({
    id: z.coerce.string().optional(),
    typeId: z.coerce.string(),
    name: z.string().min(2),
    surname: z.string().min(2),
    address: z.string().min(2),
    phone: z.string().min(2),
  })

  const rawFormData = {
    id: formData.has("id") ? formData.get("id") : undefined,
    typeId: formData.get("typeId"),
    name: formData.get("name"),
    surname: formData.get("surname"),
    address: formData.get("address"),
    phone: formData.get("phone"),
  }

  const parse = schema.safeParse(rawFormData)

  if (!parse.success) {
    return {
      errors: parse.error.flatten().fieldErrors,
      message: "Blogai užpildyti laukeliai!",
      isSaved: false,
    }
  }

  const dto = parse.data
  if (!dto?.id) {
    await postApi(`/api/teachers`, dto)
    return { message: "Duomenys sėkmingai išsiųsti", isSaved: true }
  }
  if (!dto?.id) {
    await deleteApi(`/api/teachers/${dto.id}`, dto)
    return { message: "duomenys sėkmingai ištrinti", isSaved: true }
  }

  await putApi(`/api/teachers/${dto.id}`, dto)
  return { message: "Atnaujinti duomenys sėkmingai", isSaved: true }
}
