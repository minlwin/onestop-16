import 'server-only'

import { ModificationResult } from '@/lib/model'
import { DeliTimeForm, DeliTimeSearchForm } from '@/lib/model/form/master-data.schema'
import { DeliTimeListItem } from '@/lib/model/output/master-data.model'

export async function search(form: DeliTimeSearchForm) : Promise<DeliTimeListItem[]> {
    return []
}

export async function findById(id: any) : Promise<DeliTimeForm & {id: number}> {
    return {
        id: id,
        timeFrom: '09:00',
        timeTo: '11:00',
        status: 'Enable'
    }
}

export async function create(form: DeliTimeForm) : Promise<ModificationResult<number>> {
    return {
        id: 1
    }
}

export async function update(id:any, form: DeliTimeForm) : Promise<ModificationResult<number>> {
    return {
        id: 1
    }
}