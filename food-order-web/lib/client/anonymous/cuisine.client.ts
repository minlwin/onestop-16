import { PageResult, NO_RESULT_PAGER } from "@/lib/model"
import { CuisineSearchForm } from "@/lib/model/form/master-data.schema"
import { CuisineListItem, CuisineDetails } from "@/lib/model/output/master-data.model"
import { foodPhotoUrl } from "@/lib/utils"
import { MOCK_CUISINES } from "../shopper/master/cuisine.client"

export async function search(form: CuisineSearchForm): Promise<PageResult<CuisineListItem>> {
    const contents = MOCK_CUISINES.filter((cuisine) => {
        if (form.status && cuisine.status != form.status) {
            return false
        }

        if (
            form.keyword &&
            !cuisine.name.toLocaleLowerCase().startsWith(form.keyword.toLocaleLowerCase())
        ) {
            return false
        }

        return true
    })

    if (contents.length === 0) {
        return {
            contents: [],
            pager: NO_RESULT_PAGER,
        }
    }

    return {
        contents,
        pager: {
            page: form.page ?? 0,
            size: contents.length,
            totalCount: contents.length,
            totalPage: 1,
            links: [0],
        },
    }
}

export async function findById(id: any): Promise<CuisineDetails> {
    const cuisine = MOCK_CUISINES.find((item) => item.id === Number(id)) ?? MOCK_CUISINES[0]
    const tag = `food,${cuisine.category.name.toLowerCase()}`

    const photos = [
        foodPhotoUrl(cuisine.id * 10 + 1, 800, 480, tag),
        foodPhotoUrl(cuisine.id * 10 + 2, 800, 480, tag),
        foodPhotoUrl(cuisine.id * 10 + 3, 800, 480, tag),
    ]

    return {
        ...cuisine,
        description: `Delicious ${cuisine.name.toLowerCase()} prepared with fresh ingredients and traditional Myanmar spices.`,
        coverPhoto: photos[0],
        photos,
        ingredients: [
            { name: "Main Ingredient", value: "500g" },
            { name: "Spice Mix", value: "2 tbsp" },
        ],
    }
}