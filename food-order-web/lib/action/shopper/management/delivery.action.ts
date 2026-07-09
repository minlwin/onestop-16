"use server"

import * as client from "@/lib/client/shopper/management/delivery.client"
import { DeliSearchForm } from "@/lib/model/form/management.schema"
import { DeliveryListItem } from "@/lib/model/output/management.model"

export async function search(form: DeliSearchForm): Promise<DeliveryListItem[]> {
    return await client.search(form)
}
