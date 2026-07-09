"use server"

import * as client from "@/lib/client/customer/account.client"
import { ModificationResult } from "@/lib/model"
import { AddressForm, ProfileForm } from "@/lib/model/form/account.schema"
import { ChangePasswordForm } from "@/lib/model/form/security.schema"
import { CustomerProfile, DeliveryAddress } from "@/lib/model/output/account.model"

export async function profile(): Promise<CustomerProfile> {
    return await client.profile()
}

export async function updateProfile(form: ProfileForm): Promise<ModificationResult<number>> {
    return await client.updateProfile(form)
}

export async function changePassword(
    form: ChangePasswordForm
): Promise<ModificationResult<number>> {
    return await client.changePassword(form)
}

export async function addresses(): Promise<DeliveryAddress[]> {
    return await client.addresses()
}

export async function addAddress(form: AddressForm): Promise<ModificationResult<number>> {
    return await client.addAddress(form)
}

export async function removeAddress(id: any): Promise<void> {
    return await client.removeAddress(id)
}
