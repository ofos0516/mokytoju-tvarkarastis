import { Select } from "../parts/select"
import { IState } from "@/types/shared-t"
import { toSelArr } from "@/utils/form/select-helper"
import { TextField } from "../parts/text-field"
import { SubmitButton } from "../parts/submit-button"
import { useEffect, useMemo, useRef } from "react"
import { useActionState } from "react"
import { ICertType } from "@/models/cert-type-model"
import { ICertificate } from "@/models/certificate-model"
import { createSubjects } from "@/actions/subjects"
import { ISubject } from "@/models/subject-model"
import { IOffice } from "@/models/office-model"
import { ILstart } from "@/models/lstart-model"
import { ILend } from "@/models/lend-model"

const initialState: IState = {
  message: "",
  errors: undefined,
  isSaved: false,
}

type IProps = {
  certTypes: ICertType[]
  getCertFromApi: () => void
  setEditCert: (cert?: ICertificate) => void
  editCert?: any
}

export function FormFields(props: IProps) {
  const ref = useRef<HTMLFormElement>(null)
  const { certTypes, getCertFromApi, editCert, setEditCert } = props

  const [state, formAction] = useActionState<IState, FormData>(
    createSubjects,
    initialState
  )

  useEffect(() => {
    if (state.isSaved) {
      getCertFromApi()
    }
  }, [state])
  const handleAction = (data: FormData) => {
    formAction(data)
    ref.current?.reset()
    if (data.has("id")) {
      setEditCert(undefined)
    }
  }
  return (
    <form ref={ref} action={handleAction} className="grid gap-y-5 max-w-md">
      <div className="grid grid-cols-2">
        <TextField
          label="Dalykas"
          name="subject"
          isRequired={true}
          defaultValue={editCert?.subject}
          errors={state?.errors?.subject}
        />
      </div>
      <div className="grid grid-cols-2">
        <TextField
          label="Kabinetas"
          name="office"
          isRequired={true}
          defaultValue={editCert?.office}
          errors={state?.errors?.office}
        />
      </div>
      <div className="grid grid-cols-2">
        <TextField
          label="Pamokos pradžia"
          name="lstart"
          isRequired={true}
          defaultValue={editCert?.lstart}
          errors={state?.errors?.lstart}
        />
      </div>
      <div className="grid grid-cols-2">
        <TextField
          label="Pamokos pabaiga"
          name="lend"
          isRequired={true}
          defaultValue={editCert?.lend}
          errors={state?.errors?.lend}
        />
      </div>
      {editCert?.id && <input type="hidden" name="id" value={editCert.id} />}
      <div
        className={`my-2 text-sm italic p-1 ${
          state?.errors ? "bg-red-100" : state?.message ? "bg-green-100" : ""
        }`}
      >
        {state?.message}
      </div>
      <div className="mt-1 w-14">
        <SubmitButton />
      </div>
    </form>
  )
}
