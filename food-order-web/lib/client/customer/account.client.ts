import "server-only"

import { ModificationResult } from "@/lib/model"
import { AddressForm, ProfileForm } from "@/lib/model/form/account.schema"
import { ChangePasswordForm } from "@/lib/model/form/security.schema"
import { CustomerProfile, DeliveryAddress } from "@/lib/model/output/account.model"

const MOCK_PROFILE: CustomerProfile = {
    name: "U Win Ko",
    phone: "0917181777",
    email: "winko@gmail.com",
}

const MOCK_ADDRESSES: DeliveryAddress[] = [
    { id: 1, label: "Home", address: "No. 12, 5th Street", township: "Kamayut", isDefault: true },
    {
        id: 2,
        label: "Office",
        address: "Level 3, Junction Tower",
        township: "Kyauktada",
        isDefault: false,
    },
]

export async function profile(): Promise<CustomerProfile> {
    return MOCK_PROFILE
}

export async function updateProfile(form: ProfileForm): Promise<ModificationResult<number>> {
    return { id: 1 }
}

export async function changePassword(
    form: ChangePasswordForm
): Promise<ModificationResult<number>> {
    return { id: 1 }
}

export async function addresses(): Promise<DeliveryAddress[]> {
    return MOCK_ADDRESSES
}

export async function addAddress(form: AddressForm): Promise<ModificationResult<number>> {
    return { id: Date.now() }
}

export async function removeAddress(id: any): Promise<void> {}
