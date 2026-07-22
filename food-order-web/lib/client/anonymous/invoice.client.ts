import "server-only"

import { InvoiceDetails } from "@/lib/model/output/management.model"
import { ModificationResult } from "@/lib/model"
import { CheckoutForm } from "@/lib/model/form/checkout.schema"
import { CartItem } from "@/lib/model/output/cart.model"
import { anonymousRequest, POST_OPTION, securedRequest } from ".."

const PATH = 'anonymous/invoices'

export async function checkout(
    form: CheckoutForm,
    items: CartItem[]
): Promise<ModificationResult<string>> {
    return await anonymousRequest({
        path: PATH,
        options: {
            ...POST_OPTION,
            body: JSON.stringify({
                ...form,
                items: items
            })
        }
    })
}

export async function findById(id: any): Promise<InvoiceDetails> {
    return await securedRequest({path : `${PATH}/${id}`})
}
