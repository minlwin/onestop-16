"use server"

import { PageResult } from "@/lib/model"
import { CustomerSearchForm } from "@/lib/model/form/account.schema"
import { CustomerDetails, CustomerListItem } from "@/lib/model/output/account.model"

import * as client from "@/lib/client/account/customer.client"

export async function search(form: CustomerSearchForm): Promise<PageResult<CustomerListItem>> {
    return await client.search(form)
}

export async function findById(id: any): Promise<CustomerDetails> {
    return await client.findById(id)
}
