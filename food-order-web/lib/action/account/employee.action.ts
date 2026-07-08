'use server'

import { ModificationResult } from "@/lib/model"
import { EmployeeForm, EmployeeSearchForm } from "@/lib/model/form/account.schema"
import { EmployeeListItem } from "@/lib/model/output/account.model"

import * as client from "@/lib/client/account/employee.client"

export async function search(form: EmployeeSearchForm): Promise<EmployeeListItem[]> {
    return await client.search(form)
}

export async function findById(id: any): Promise<EmployeeForm & {id: number}> {
    return await client.findById(id)
}

export async function create(form: EmployeeForm): Promise<ModificationResult<number>> {
    return await client.create(form)
}

export async function update(id: any, form: EmployeeForm): Promise<ModificationResult<number>> {
    return await client.update(id, form)
}
