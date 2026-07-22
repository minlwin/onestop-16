import "server-only"

import { ModificationResult, NO_RESULT_PAGER, PageResult } from "@/lib/model"
import { CuisineForm, CuisineSearchForm } from "@/lib/model/form/master-data.schema"
import {
    CuisineDetails,
    CuisineForEdit,
    CuisineListItem,
} from "@/lib/model/output/master-data.model"
import { POST_OPTION, PUT_OPTION, securedRequest } from "../.."

const PATH = 'shopper/cuisines'

export async function search(form: CuisineSearchForm): Promise<PageResult<CuisineListItem>> {
    return await securedRequest({
        path: PATH,
        params: form
    })
}

export async function findById(id: any): Promise<CuisineDetails> {
    return await securedRequest({path: `${PATH}/${id}`})
}

export async function findForEdit(id: any): Promise<CuisineForEdit> {
    return await securedRequest({path: `${PATH}/${id}/edit`})
}

export async function create(form: CuisineForm): Promise<ModificationResult<number>> {
    return await securedRequest({
        path: PATH,
        options: {
            ...POST_OPTION,
            body: JSON.stringify(form)
        }
    })
}

export async function update(id: any, form: CuisineForm): Promise<ModificationResult<number>> {
    return await securedRequest({
        path: `${PATH}/${id}`,
        options: {
            ...PUT_OPTION,
            body: JSON.stringify(form)
        }
    })
}

export async function uploadPhoto(id: any, form: FormData): Promise<ModificationResult<number>> {
    return await securedRequest({
        path: `${PATH}/${id}/photos`,
        options: {
            ...POST_OPTION,
            body: form
        }
    })
}

export async function updateCoverPhoto(
    id: any,
    form: { photo: string }
): Promise<ModificationResult<number>> {
    return await securedRequest({
        path: `${PATH}/${id}/cover-photo`,
        options: {
            ...PUT_OPTION,
            body: JSON.stringify(form)
        }
    })
}
