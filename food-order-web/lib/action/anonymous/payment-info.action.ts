"use server"

import * as client from "@/lib/client/anonymous/payment-info.client"
import { PaymentInfoSearchForm } from "@/lib/model/form/master-data.schema"
import { PaymentInfoListItem } from "@/lib/model/output/master-data.model"

export async function search(form: PaymentInfoSearchForm): Promise<PaymentInfoListItem[]> {
    return await client.search(form)
}
