"use server"

import * as client from "@/lib/client/anonymous/checkout.client"
import { ModificationResult } from "@/lib/model"
import { CheckoutForm } from "@/lib/model/form/checkout.schema"
import { CartItem } from "@/lib/model/output/cart.model"

export async function checkout(
    form: CheckoutForm,
    items: CartItem[]
): Promise<ModificationResult<string>> {
    return await client.checkout(form, items)
}
