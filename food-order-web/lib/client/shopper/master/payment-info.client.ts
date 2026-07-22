import "server-only"

import { ModificationResult } from "@/lib/model"
import { PaymentInfoForm, PaymentInfoSearchForm } from "@/lib/model/form/master-data.schema"
import { PaymentInfoListItem } from "@/lib/model/output/master-data.model"
import { POST_OPTION, PUT_OPTION, securedRequest } from "../.."

const PATH = 'shopper/payment-infos'

export async function search(form: PaymentInfoSearchForm): Promise<PaymentInfoListItem[]> {
    return await securedRequest({
        path: PATH,
        params: form
    })
}

export async function findById(id: any): Promise<PaymentInfoForm & { id: number }> {
    return await securedRequest({path : `${PATH}/${id}`})
}

export async function create(form: PaymentInfoForm): Promise<ModificationResult<number>> {
    return await securedRequest({
        path: PATH,
        options: {
            ...POST_OPTION,
            body : JSON.stringify(form)
        }
    })
}

export async function update(id: any, form: PaymentInfoForm): Promise<ModificationResult<number>> {
    return await securedRequest({
        path: `${PATH}/${id}`,
        options: {
            ...PUT_OPTION
        }
    })
}