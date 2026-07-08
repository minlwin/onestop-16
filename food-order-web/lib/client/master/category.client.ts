import 'server-only'

import { CategoryForm, CategorySearchForm } from '@/lib/model/form/master-data.schema';
import { CategoryDetails, CategoryListItem } from '@/lib/model/output/master-data.model';
import { ModificationResult } from '@/lib/model';

export async function search(form: CategorySearchForm) : Promise<CategoryListItem[]> {
    return MOAK_CATEGORIES.filter(data => {
        if(form.status && data.status != form.status) {
            return false;
        }

        if(form.keyword && !data.name.toLocaleLowerCase().startsWith(form.keyword.toLocaleLowerCase())) {
            return false;
        }

        return true
    })
}

export async function findById(id: any) : Promise<CategoryDetails> {
    return MOAK_DETAILS
}

export async function create(form: CategoryForm) : Promise<ModificationResult<number>> {
    return {
        id: 1
    }
}

export async function update(id: any, form: CategoryForm) : Promise<ModificationResult<number>> {
    return {
        id: 1
    }
}


const MOAK_DETAILS:CategoryDetails = {
    id: 1,
    name: "Curry",
    cusines: [
    ],
    status: 'Enable',
    createdAt: '2026-01-01 10:00',
    modifiedAt: '2026-01-01 10:00',
}


const MOAK_CATEGORIES: CategoryListItem[] = [
        {
            id: 1,
            name: "Curry",
            cusines: 5,
            status: 'Enable',
            createdAt: '2026-01-01 10:00',
            modifiedAt: '2026-01-01 10:00',
        },
        {
            id: 2,
            name: "Soup",
            cusines: 0,
            status: 'Pending',
            createdAt: '2026-01-01 10:00',
            modifiedAt: '2026-01-01 10:00',
        },
        {
            id: 3,
            name: "Noodle",
            cusines: 3,
            status: 'Enable',
            createdAt: '2026-01-01 10:00',
            modifiedAt: '2026-01-01 10:00',
        }
    ]