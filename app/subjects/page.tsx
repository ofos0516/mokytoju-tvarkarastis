import { Wrapper } from "@/components/subjects/wrapper"
import { ICertType } from "@/models/cert-type-model"
import { getApi } from "@/utils/server-api"

export default async function CertificatePage() {
  const certTypes = await getApi<ICertType[]>(`/api/classificators/subjects`)

  return <Wrapper certTypes={certTypes ?? []} />
}
