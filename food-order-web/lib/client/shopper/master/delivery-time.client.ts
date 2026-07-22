import "server-only"

import { ModificationResult } from "@/lib/model"
import { DeliTimeForm, DeliTimeSearchForm } from "@/lib/model/form/master-data.schema"
import { DeliTimeListItem } from "@/lib/model/output/master-data.model"
import { POST_OPTION, PUT_OPTION, securedRequest } from "../.."

const PATH = 'shopper/delivery-times'

export async function search(form: DeliTimeSearchForm): Promise<DeliTimeListItem[]> {
    return await securedRequest({
        path: PATH,
        params: form
    })
}

export async function findById(id: any): Promise<DeliTimeForm & { id: number }> {
    return await securedRequest({path : `${PATH}/${id}`})
}

export async function create(form: DeliTimeForm): Promise<ModificationResult<number>> {
    return await securedRequest({
        path : PATH,
        options: {
            ...POST_OPTION,
            body: JSON.stringify(form)
        }
    })
}

export async function update(id: any, form: DeliTimeForm): Promise<ModificationResult<number>> {
    return await securedRequest({
        path: `${PATH}/${id}`,
        options: {
            ...PUT_OPTION,
            body: JSON.stringify(form)
        }
    })
}