'use server'

import * as client from "@/lib/client/anonymous/category.client"
import { CategorySearchForm } from "@/lib/model/form/master-data.schema"
import { CategoryListItem } from "@/lib/model/output/master-data.model"

export async function search(form: CategorySearchForm): Promise<CategoryListItem[]> {
    return await client.search(form)
}
