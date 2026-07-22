import { PageResult } from "@/lib/model"
import { CuisineSearchForm } from "@/lib/model/form/master-data.schema"
import { CuisineListItem, CuisineDetails } from "@/lib/model/output/master-data.model"
import { anonymousRequest } from ".."

const PATH = 'anonymous/cuisines'

export async function search(form: CuisineSearchForm): Promise<PageResult<CuisineListItem>> {
    return await anonymousRequest({
        path : PATH,
        params: form
    })
}

export async function findById(id: any): Promise<CuisineDetails> {
    return await anonymousRequest({path : `${PATH}/${id}`})
}
