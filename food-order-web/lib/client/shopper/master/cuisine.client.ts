import "server-only"

import { ModificationResult, NO_RESULT_PAGER, PageResult } from "@/lib/model"
import { CuisineForm, CuisineSearchForm } from "@/lib/model/form/master-data.schema"
import {
    CuisineDetails,
    CuisineForEdit,
    CuisineListItem,
} from "@/lib/model/output/master-data.model"
import { foodPhotoUrl } from "@/lib/utils"

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

export async function findForEdit(id: any): Promise<CuisineForEdit> {
    return {
        id: 1,
        category: "1",
        name: "Chicken Curry",
        isRegular: true,
        spiceLevel: "Mild",
        price: 3500,
        status: "Pending",
        description: "",
        ingredients: [{ name: "Chicken", value: "1kg" }],
    }
}

export async function create(form: CuisineForm): Promise<ModificationResult<number>> {
    return {
        id: 1,
    }
}

export async function update(id: any, form: CuisineForm): Promise<ModificationResult<number>> {
    return {
        id: 1,
    }
}

export async function uploadPhoto(id: any, form: FormData): Promise<ModificationResult<number>> {
    return {
        id: 1,
    }
}

export async function updateCoverPhoto(
    id: any,
    form: { photo: string }
): Promise<ModificationResult<number>> {
    return {
        id: 1,
    }
}

export const MOCK_CUISINES: CuisineListItem[] = [
    {
        id: 1,
        name: "Chicken Curry",
        category: { id: 1, name: "Curry" },
        spiceLevel: "Medium",
        isRegular: true,
        price: 3500,
        status: "Enable",
        description: "Slow cooked chicken curry with coconut milk and Myanmar spices.",
        createdAt: "2026-01-01 10:00",
        modifiedAt: "2026-01-01 10:00",
    },
    {
        id: 2,
        name: "Fish Curry",
        category: { id: 1, name: "Curry" },
        spiceLevel: "High",
        isRegular: false,
        price: 4200,
        status: "Enable",
        description: "Tangy and spicy.",
        createdAt: "2026-01-01 10:00",
        modifiedAt: "2026-01-01 10:00",
    },
    {
        id: 3,
        name: "Pork Curry",
        category: { id: 1, name: "Curry" },
        spiceLevel: "Mild",
        isRegular: true,
        price: 3800,
        status: "Pending",
        description:
            "Tender pork belly braised for hours in a rich, dark curry sauce with garlic, ginger, and shallots. Finished with a touch of tamarind for a subtle tang that balances the deep, savory spices. Best enjoyed with steamed rice and a side of pickled vegetables.",
        createdAt: "2026-01-01 10:00",
        modifiedAt: "2026-01-01 10:00",
    },
    {
        id: 4,
        name: "Tomato Soup",
        category: { id: 2, name: "Soup" },
        spiceLevel: "Mild",
        isRegular: false,
        price: 1800,
        status: "Pending",
        description: "Light and refreshing tomato broth with fresh herbs.",
        createdAt: "2026-01-01 10:00",
        modifiedAt: "2026-01-01 10:00",
    },
    {
        id: 5,
        name: "Shan Noodle",
        category: { id: 3, name: "Noodle" },
        spiceLevel: "Mild",
        isRegular: true,
        price: 2500,
        status: "Enable",
        description:
            "Flat rice noodles tossed in a savory tomato and pork sauce, topped with crushed peanuts, pickled mustard greens, and a squeeze of lime. A Shan State classic served warm or at room temperature.",
        createdAt: "2026-01-01 10:00",
        modifiedAt: "2026-01-01 10:00",
    },
    {
        id: 6,
        name: "Mohinga",
        category: { id: 3, name: "Noodle" },
        spiceLevel: "Medium",
        isRegular: true,
        price: 2000,
        status: "Enable",
        description:
            "Myanmar's beloved breakfast noodle soup, made with a fragrant catfish and lemongrass broth thickened with toasted rice powder and banana stem. Served over rice vermicelli and garnished with crispy fritters, boiled egg, coriander, and a wedge of lime. Every family has their own version, but this one sticks close to the traditional recipe passed down through generations of street food vendors in Yangon.",
        createdAt: "2026-01-01 10:00",
        modifiedAt: "2026-01-01 10:00",
    },
    {
        id: 7,
        name: "Coconut Noodle",
        category: { id: 3, name: "Noodle" },
        spiceLevel: "So High",
        isRegular: false,
        price: 3000,
        status: "Enable",
        description: "Creamy coconut broth with egg noodles and crispy shallots on top.",
        createdAt: "2026-01-01 10:00",
        modifiedAt: "2026-01-01 10:00",
    },
]
