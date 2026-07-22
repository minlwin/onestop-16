import "server-only"

import { DeliTimeListItem } from "@/lib/model/output/master-data.model"
import { anonymousRequest } from ".."

const PATH = 'anonymous/delivery-times'

export async function search(): Promise<DeliTimeListItem[]> {
    return await anonymousRequest({ path : PATH })
}
