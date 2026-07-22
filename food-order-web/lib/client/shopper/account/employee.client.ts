import "server-only"

import { ModificationResult } from "@/lib/model"
import { EmployeeForm, EmployeeSearchForm } from "@/lib/model/form/account.schema"
import { EmployeeListItem } from "@/lib/model/output/account.model"
import { POST_OPTION, PUT_OPTION, securedRequest } from "../.."

const PATH = 'shopper/employees'

export async function search(form: EmployeeSearchForm): Promise<EmployeeListItem[]> {
    return await securedRequest({
        path: PATH,
        params: form
    })
}

export async function findById(id: any): Promise<EmployeeForm & { id: number }> {
    return await securedRequest({path: `${PATH}/${id}`})
}

export async function create(form: EmployeeForm): Promise<ModificationResult<number>> {
    return await securedRequest({
        path: PATH,
        options: {
            ...POST_OPTION,
            body: JSON.stringify(form)
        }
    })
}

export async function update(id: any, form: EmployeeForm): Promise<ModificationResult<number>> {
    return await securedRequest({
        path: `${PATH}/${id}`,
        options: {
            ...PUT_OPTION,
            body: JSON.stringify(form)
        }
    })
}
