import "server-only"

import { ModificationResult } from "@/lib/model"
import { DeliTimeForm, DeliTimeSearchForm } from "@/lib/model/form/master-data.schema"
import { DeliTimeListItem } from "@/lib/model/output/master-data.model"

export async function search(form: DeliTimeSearchForm): Promise<DeliTimeListItem[]> {
    return MOCK_DELI_TIMES.filter((data) => {
        if (form.status && data.status != form.status) {
            return false
        }

        if (form.time && !(data.timeFrom.includes(form.time) || data.timeTo.includes(form.time))) {
            return false
        }

        return true
    })
}

export async function findById(id: any): Promise<DeliTimeForm & { id: number }> {
    return {
        id: id,
        timeFrom: "09:00",
        timeTo: "11:00",
        status: "Enable",
    }
}

export async function create(form: DeliTimeForm): Promise<ModificationResult<number>> {
    return {
        id: 1,
    }
}

export async function update(id: any, form: DeliTimeForm): Promise<ModificationResult<number>> {
    return {
        id: 1,
    }
}

export const MOCK_DELI_TIMES: DeliTimeListItem[] = [
    {
        id: 1,
        name: "Morning",
        timeFrom: "09:00",
        timeTo: "11:00",
        status: "Enable",
        createdAt: "2026-01-01 10:00",
        modifiedAt: "2026-01-01 10:00",
    },
    {
        id: 2,
        name: "Afternoon",
        timeFrom: "13:00",
        timeTo: "15:00",
        status: "Enable",
        createdAt: "2026-01-01 10:00",
        modifiedAt: "2026-01-01 10:00",
    },
    {
        id: 3,
        name: "Evening",
        timeFrom: "17:00",
        timeTo: "19:00",
        status: "Enable",
        createdAt: "2026-01-01 10:00",
        modifiedAt: "2026-01-01 10:00",
    },
]
