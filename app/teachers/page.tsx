import { Wrapper } from "@/components/teachers/wrapper"
import { ICertType } from "@/models/cert-type-model"
import { getApi } from "@/utils/server-api"

export default async function CertificatePage() {
  const certTypes = await getApi<ICertType[]>(`/api/classificators/teachers`)

  return <Wrapper certTypes={certTypes ?? []} />
}
