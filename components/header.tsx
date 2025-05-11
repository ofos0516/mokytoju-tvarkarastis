import { AcademicCapIcon } from "@heroicons/react/24/solid"
import { Nav } from "./nav"
import { INav } from "@/types/nav-t"
const menu: INav[] = [
  { title: "Mokytojai", slug: "teachers" },
  { title: "Dalykai", slug: "subjects" },
  { title: "Pamokos", slug: "lessons" },
]

export function Header() {
  return (
    <header className="border-b border-gray-400 p-1 mb-5">
      <Nav menu={menu} />
    </header>
  )
}
