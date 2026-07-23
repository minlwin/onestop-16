import "server-only"

import { InvoiceSearchForm } from "@/lib/model/form/management.schema"
import { InvoiceDetails, InvoiceListItem } from "@/lib/model/output/management.model"
import { securedRequest } from "../.."
import { PageResult } from "@/lib/model"

const PATH = 'shopper/management/invoices'

export async function search(form: InvoiceSearchForm): Promise<PageResult<InvoiceListItem>> {
    return await securedRequest({path: PATH, params: form})
}

export async function findById(id: any): Promise<InvoiceDetails> {
    return await securedRequest({path : `${PATH}/${id}`})
}