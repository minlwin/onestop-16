"use server"

import * as client from "@/lib/client/anonymous/invoice.client"
import { ModificationResult } from "@/lib/model"
import { CheckoutForm } from "@/lib/model/form/checkout.schema"
import { CartItem } from "@/lib/model/output/cart.model"
import { InvoiceDetails } from "@/lib/model/output/management.model"

export async function checkout(
    form: CheckoutForm & {
        items: CartItem[]
    }
): Promise<ModificationResult<string>> {
    return await client.checkout(form)
}

export async function findById(id: any): Promise<InvoiceDetails> {
    return await client.findById(id)
}
