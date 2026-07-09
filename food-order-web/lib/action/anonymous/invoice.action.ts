"use server"

import * as client from "@/lib/client/anonymous/invoice.client"
import { InvoiceDetails } from "@/lib/model/output/management.model"

export async function findById(id: any): Promise<InvoiceDetails> {
    return await client.findById(id)
}
