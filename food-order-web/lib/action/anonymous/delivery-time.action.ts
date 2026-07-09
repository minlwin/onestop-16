"use server"

import * as client from "@/lib/client/anonymous/delivery-time.client"
import { DeliTimeSearchForm } from "@/lib/model/form/master-data.schema"
import { DeliTimeListItem } from "@/lib/model/output/master-data.model"

export async function search(form: DeliTimeSearchForm): Promise<DeliTimeListItem[]> {
    return await client.search(form)
}
