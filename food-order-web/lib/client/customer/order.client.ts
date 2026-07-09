import "server-only"

import { InvoiceSearchForm } from "@/lib/model/form/management.schema"
import { InvoiceDetails, InvoiceListItem } from "@/lib/model/output/management.model"
import { MOCK_INVOICE, MOCK_INVOICES } from "../shopper/management/invoice.client"

export async function search(form: InvoiceSearchForm): Promise<InvoiceListItem[]> {
    return MOCK_INVOICES.filter((data) => {
        if (form.status && data.status != form.status) {
            return false
        }

        if (form.from && data.invoiceDate < form.from) {
            return false
        }

        if (form.to && data.invoiceDate > form.to) {
            return false
        }

        return true
    })
}

export async function findById(id: any): Promise<InvoiceDetails> {
    return {
        ...MOCK_INVOICE,
        id: String(id),
    }
}
