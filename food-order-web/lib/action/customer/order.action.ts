"use server"

import * as client from "@/lib/client/customer/order.client"
import { InvoiceSearchForm } from "@/lib/model/form/management.schema"
import { InvoiceDetails, InvoiceListItem } from "@/lib/model/output/management.model"

export async function search(form: InvoiceSearchForm): Promise<InvoiceListItem[]> {
    return await client.search(form)
}

export async function findById(id: any): Promise<InvoiceDetails> {
    return await client.findById(id)
}
