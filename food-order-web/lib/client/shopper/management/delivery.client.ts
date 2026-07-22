import "server-only"

import { DeliSearchForm } from "@/lib/model/form/management.schema"
import { DeliveryListItem } from "@/lib/model/output/management.model"
import { securedRequest } from "../.."

const PATH = 'shopper/management/deliveries'

export async function search(form: DeliSearchForm): Promise<DeliveryListItem[]> {
    return await securedRequest({path : PATH})
}
