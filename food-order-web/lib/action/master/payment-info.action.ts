"use server"

import { ModificationResult } from "@/lib/model"
import { PaymentInfoSearchForm, PaymentInfoForm } from "@/lib/model/form/master-data.schema"
import { PaymentInfoListItem } from "@/lib/model/output/master-data.model"

import * as client from "@/lib/client/master/payment-info.client"

export async function search(form: PaymentInfoSearchForm): Promise<PaymentInfoListItem[]> {
    return await client.search(form)
}

export async function findById(id: any): Promise<PaymentInfoForm & { id: number }> {
    return await client.findById(id)
}

export async function create(form: PaymentInfoForm): Promise<ModificationResult<number>> {
    return await client.create(form)
}

export async function update(id: any, form: PaymentInfoForm): Promise<ModificationResult<number>> {
    return await client.update(id, form)
}
