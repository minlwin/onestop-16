"use server"

import * as client from "@/lib/client/anonymous/delivery-time.client"
import { DeliTimeListItem } from "@/lib/model/output/master-data.model"

export async function search(): Promise<DeliTimeListItem[]> {
    return await client.search()
}
