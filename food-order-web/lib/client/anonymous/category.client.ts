import "server-only"

import { CategorySearchForm } from "@/lib/model/form/master-data.schema"
import { CategoryListItem } from "@/lib/model/output/master-data.model"
import { MOAK_CATEGORIES } from "../shopper/master/category.client"

export async function search(form: CategorySearchForm): Promise<CategoryListItem[]> {
    return MOAK_CATEGORIES.filter((data) => {
        if (form.status && data.status != form.status) {
            return false
        }

        if (
            form.keyword &&
            !data.name.toLocaleLowerCase().startsWith(form.keyword.toLocaleLowerCase())
        ) {
            return false
        }

        return true
    })
}
