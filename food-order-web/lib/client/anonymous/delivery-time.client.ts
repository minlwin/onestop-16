import "server-only"

import { DeliTimeSearchForm } from "@/lib/model/form/master-data.schema"
import { DeliTimeListItem } from "@/lib/model/output/master-data.model"
import { MOCK_DELI_TIMES } from "../shopper/master/delivery-time.client"

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
