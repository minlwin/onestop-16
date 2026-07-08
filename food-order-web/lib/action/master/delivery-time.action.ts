"use server"

import { ModificationResult } from "@/lib/model"
import { DeliTimeForm, DeliTimeSearchForm } from "@/lib/model/form/master-data.schema"
import { DeliTimeListItem } from "@/lib/model/output/master-data.model"

import * as client from "@/lib/client/master/delivery-time.client"

export async function search(form: DeliTimeSearchForm): Promise<DeliTimeListItem[]> {
    return client.search(form)
}

export async function findById(id: any): Promise<DeliTimeForm & { id: number }> {
    return client.findById(id)
}

export async function create(form: DeliTimeForm): Promise<ModificationResult<number>> {
    return client.create(form)
}

export async function update(id: any, form: DeliTimeForm): Promise<ModificationResult<number>> {
    return client.update(id, form)
}
