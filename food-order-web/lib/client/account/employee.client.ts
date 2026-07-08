import "server-only"

import { ModificationResult } from "@/lib/model"
import { EmployeeForm, EmployeeSearchForm } from "@/lib/model/form/account.schema"
import { EmployeeListItem } from "@/lib/model/output/account.model"

export async function search(form: EmployeeSearchForm): Promise<EmployeeListItem[]> {
    return []
}

export async function findById(id: any): Promise<EmployeeForm & { id: number }> {
    return {
        id: id,
        name: "Aung Aung",
        phone: "091817662",
        email: "aung@gmail.com",
        entryAt: "2020-01-01",
        retireAt: "",
    }
}

export async function create(form: EmployeeForm): Promise<ModificationResult<number>> {
    return {
        id: 1,
    }
}

export async function update(id: any, form: EmployeeForm): Promise<ModificationResult<number>> {
    return {
        id: 1,
    }
}
