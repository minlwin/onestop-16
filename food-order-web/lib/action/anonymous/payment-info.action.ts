"use server"

import * as client from "@/lib/client/anonymous/payment-info.client"
import { PaymentInfoListItem } from "@/lib/model/output/master-data.model"

export async function search(): Promise<PaymentInfoListItem[]> {
    return await client.search()
}
