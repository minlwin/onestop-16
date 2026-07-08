"use server"

import { PageResult, ModificationResult } from "@/lib/model"
import { CuisineSearchForm, CuisineForm } from "@/lib/model/form/master-data.schema"
import {
    CuisineListItem,
    CuisineDetails,
    CuisineForEdit,
} from "@/lib/model/output/master-data.model"

import * as client from "@/lib/client/master/cuisine.client"

export async function search(form: CuisineSearchForm): Promise<PageResult<CuisineListItem>> {
    return await client.search(form)
}

export async function findById(id: any): Promise<CuisineDetails> {
    return await client.findById(id)
}

export async function findForEdit(id: any): Promise<CuisineForEdit> {
    return await client.findForEdit(id)
}

export async function create(form: CuisineForm): Promise<ModificationResult<number>> {
    return await client.create(form)
}

export async function update(id: any, form: CuisineForm): Promise<ModificationResult<number>> {
    return await client.update(id, form)
}

export async function uploadPhoto(id: any, files: FileList): Promise<ModificationResult<number>> {
    const form = new FormData()

    for (const file of files) {
        form.append("files", file)
    }

    return await client.uploadPhoto(id, form)
}

export async function updateCoverPhoto(
    id: any,
    photo: string
): Promise<ModificationResult<number>> {
    return await client.updateCoverPhoto(id, { photo: photo })
}
