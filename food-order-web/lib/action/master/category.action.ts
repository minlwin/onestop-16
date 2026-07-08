'use server'

import * as client from "@/lib/client/master/category.client";
import { ModificationResult } from "@/lib/model";
import { CategoryForm, CategorySearchForm } from "@/lib/model/form/master-data.schema";
import { CategoryDetails, CategoryListItem } from "@/lib/model/output/master-data.model";

export async function search(form: CategorySearchForm) : Promise<CategoryListItem[]> {
    return await client.search(form)
}

export async function create(form: CategoryForm) : Promise<ModificationResult<number>> {
    return await client.create(form)
}

export async function findById(id: any) : Promise<CategoryDetails> {
    return await client.findById(id)
}

export async function update(id: any, form: CategoryForm) : Promise<ModificationResult<number>> {
    return await client.update(id, form)
}
