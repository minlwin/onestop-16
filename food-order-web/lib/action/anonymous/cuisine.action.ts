'use server'

import * as client from "@/lib/client/anonymous/cuisine.client"
import { PageResult } from "@/lib/model"
import { CuisineSearchForm } from "@/lib/model/form/master-data.schema"
import { CuisineListItem, CuisineDetails } from "@/lib/model/output/master-data.model"

export async function search(form: CuisineSearchForm): Promise<PageResult<CuisineListItem>> {
    return await client.search(form)
}

export async function findById(id: any): Promise<CuisineDetails> {
    return await client.findById(id)
}
