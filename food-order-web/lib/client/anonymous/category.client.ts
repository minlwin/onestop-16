import "server-only"

import { CategoryListItem } from "@/lib/model/output/master-data.model"
import { request } from "@/lib/client"

export async function search(): Promise<CategoryListItem[]> {
    return await request('anonymous/categories')
}
