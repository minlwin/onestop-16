import "server-only"

import { PaymentInfoListItem } from "@/lib/model/output/master-data.model"
import { securedRequest } from ".."

const PATH = 'anonymous/payment-infos'

export async function search(): Promise<PaymentInfoListItem[]> {
    return await securedRequest({path : PATH})
}
