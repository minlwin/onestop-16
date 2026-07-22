import "server-only"

import { ModificationResult } from "@/lib/model"
import { AddressForm, ProfileForm } from "@/lib/model/form/account.schema"
import { ChangePasswordForm } from "@/lib/model/form/security.schema"
import { CustomerProfile, DeliveryAddress } from "@/lib/model/output/account.model"
import { POST_OPTION, PUT_OPTION, securedRequest } from ".."

const PATH = 'customer/account'

export async function profile(): Promise<CustomerProfile> {
    return await securedRequest({path : `${PATH}/profile`})
}

export async function updateProfile(form: ProfileForm): Promise<ModificationResult<number>> {
    return await securedRequest({
        path : `${PATH}/profile`,
        options: {
            ...PUT_OPTION,
            body: JSON.stringify(form)
        }
    })
}

export async function changePassword(
    form: ChangePasswordForm
): Promise<ModificationResult<number>> {
    return await securedRequest({
        path : `${PATH}/password`,
        options: {
            ...PUT_OPTION,
            body: JSON.stringify(form)
        }
    })
}

export async function addresses(): Promise<DeliveryAddress[]> {
    return await securedRequest({path : `${PATH}/addresses`})
}

export async function addAddress(form: AddressForm): Promise<ModificationResult<number>> {
    return await securedRequest({
        path : `${PATH}/addresses`,
        options: {
            ...POST_OPTION,
            body: JSON.stringify(form)
        }
    })
}

export async function removeAddress(id: any): Promise<void> {
    await securedRequest({path : `${PATH}/addresses/${id}`, options: {
        method: "DELETE"
    }})
}
