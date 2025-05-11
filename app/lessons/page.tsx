import { Wrapper } from "@/components/lessons/wrapper"
import { ICertType } from "@/models/cert-type-model"
import { getApi } from "@/utils/server-api"

export default async function CertificatePage() {
  const certTypes = await getApi<ICertType[]>(`/api/classificators/lessons`)

  return <Wrapper certTypes={certTypes ?? []} />
}
