import "server-only"

import { ModificationResult } from "@/lib/model"
import { CheckoutForm } from "@/lib/model/form/checkout.schema"
import { CartItem } from "@/lib/model/output/cart.model"

export async function checkout(
    form: CheckoutForm,
    items: CartItem[]
): Promise<ModificationResult<string>> {
    return {
        id: "INV-0001",
    }
}
