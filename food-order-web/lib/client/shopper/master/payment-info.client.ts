import "server-only"

import { ModificationResult } from "@/lib/model"
import { PaymentInfoForm, PaymentInfoSearchForm } from "@/lib/model/form/master-data.schema"
import { PaymentInfoListItem } from "@/lib/model/output/master-data.model"

export async function search(form: PaymentInfoSearchForm): Promise<PaymentInfoListItem[]> {
    return MOCK_PAYMENT_INFOS.filter((data) => {
        if (form.status && data.status != form.status) {
            return false
        }

        if (
            form.bank &&
            !data.provider.toLocaleLowerCase().includes(form.bank.toLocaleLowerCase())
        ) {
            return false
        }

        if (form.account && !data.accountNo.includes(form.account)) {
            return false
        }

        return true
    })
}

export async function findById(id: any): Promise<PaymentInfoForm & { id: number }> {
    return {
        id: id,
        bank: "KBZ Pay",
        accountNo: "09782003098",
        accountName: "U Zaw Min Lwin",
        status: "Enable",
    }
}

export async function create(form: PaymentInfoForm): Promise<ModificationResult<number>> {
    return {
        id: 1,
    }
}

export async function update(id: any, form: PaymentInfoForm): Promise<ModificationResult<number>> {
    return {
        id: 1,
    }
}

export const MOCK_PAYMENT_INFOS: PaymentInfoListItem[] = [
    {
        id: 1,
        name: "KBZ Pay",
        provider: "KBZ Pay",
        accountNo: "09-7820-03098",
        accountName: "U Zaw Min Lwin",
        status: "Enable",
        createdAt: "2026-01-01 10:00",
        modifiedAt: "2026-01-01 10:00",
    },
    {
        id: 2,
        name: "Wave Pay",
        provider: "Wave Pay",
        accountNo: "09-9761-04512",
        accountName: "U Zaw Min Lwin",
        status: "Enable",
        createdAt: "2026-01-01 10:00",
        modifiedAt: "2026-01-01 10:00",
    },
    {
        id: 3,
        name: "KBZ Bank",
        provider: "KBZ Bank",
        accountNo: "0012-3456789-01",
        accountName: "Food Order Co., Ltd.",
        status: "Enable",
        createdAt: "2026-01-01 10:00",
        modifiedAt: "2026-01-01 10:00",
    },
]
