"use server"

import * as client from "@/lib/client/anonymous/category.client"
import { CategoryListItem } from "@/lib/model/output/master-data.model"

export async function search(): Promise<CategoryListItem[]> {
    return await client.search()
}
