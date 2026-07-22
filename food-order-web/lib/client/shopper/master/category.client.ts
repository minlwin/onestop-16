import "server-only"

import { CategoryForm, CategorySearchForm } from "@/lib/model/form/master-data.schema"
import { CategoryDetails, CategoryListItem } from "@/lib/model/output/master-data.model"
import { ModificationResult } from "@/lib/model"
import { POST_OPTION, PUT_OPTION, securedRequest } from "../.."

const PATH = 'shopper/categories'

export async function search(form: CategorySearchForm): Promise<CategoryListItem[]> {
    return await securedRequest({
        path: PATH,
        params: form
    })
}

export async function findById(id: any): Promise<CategoryDetails> {
    return await securedRequest({path : `${PATH}/${id}`})
}

export async function create(form: CategoryForm): Promise<ModificationResult<number>> {
    return await securedRequest({
        path: PATH,
        options: {
            ...POST_OPTION,
            body : JSON.stringify(form)
        }
    })
}

export async function update(id: any, form: CategoryForm): Promise<ModificationResult<number>> {
    return await securedRequest({
        path : `${PATH}/${id}`,
        options: {
            ...PUT_OPTION,
            body : JSON.stringify(form)
        }
    })
}
