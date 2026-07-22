import "server-only"

import { CategoryListItem } from "@/lib/model/output/master-data.model"
import { anonymousRequest } from "@/lib/client"

export async function search(): Promise<CategoryListItem[]> {
    return await anonymousRequest({
        path: 'anonymous/categories'
    })
}
