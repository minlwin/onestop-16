import "server-only"

import {  PageResult } from "@/lib/model"
import { CustomerSearchForm } from "@/lib/model/form/account.schema"
import { CustomerDetails, CustomerListItem } from "@/lib/model/output/account.model"
import { securedRequest } from "../.."

export async function search(form: CustomerSearchForm): Promise<PageResult<CustomerListItem>> {
    return await securedRequest({
        path: 'shopper/customers',
        params: form
    })
}

export async function findById(id: any): Promise<CustomerDetails> {
    return await securedRequest({
        path: `shopper/customers/${id}`
    })
}
