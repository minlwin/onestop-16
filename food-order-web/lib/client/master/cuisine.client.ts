import 'server-only'

import { ModificationResult, NO_RESULT_PAGER, PageResult } from '@/lib/model';
import { CuisineForm, CuisineSearchForm } from '@/lib/model/form/master-data.schema';
import { CuisineDetails, CuisineForEdit, CuisineListItem } from '@/lib/model/output/master-data.model';

export async function search(form : CuisineSearchForm): Promise<PageResult<CuisineListItem>> {
    return {
        contents: [],
        pager: NO_RESULT_PAGER
    }
}

export async function findById(id: any): Promise<CuisineDetails> {
    return {
        id: 1,
        category: {
            id: 1,
            name: "Curry"
        },
        name: "Chicken Curry",
        description: "Slow cooked chicken curry with coconut milk and Myanmar spices.",
        isRegular: true,
        spiceLevel: "Mild",
        status: 'Pending',
        createdAt: '2026-01-01 10:00',
        modifiedAt: '2026-01-01 10:00',
    }
}

export async function findForEdit(id: any): Promise<CuisineForEdit> {
    return {
        id: 1,
        category: '1',
        name: "Chicken Curry",
        isRegular: true,
        spiceLevel: "Mild",
        status: 'Pending',
        description: '',
        ingredients: [
            {name : "Chicken", value : "1kg"}
        ]
    }
}


export async function create(form: CuisineForm) : Promise<ModificationResult<number>> {
    return {
        id: 1
    }
}

export async function update(id: any, form: CuisineForm) : Promise<ModificationResult<number>> {
    return {
        id: 1
    }
}

export async function uploadPhoto(id: any, form: FormData) : Promise<ModificationResult<number>> {
    return {
        id: 1
    }
}

export async function updateCoverPhoto(id: any, form: { photo: string }) : Promise<ModificationResult<number>> {
    return {
        id: 1
    }
}