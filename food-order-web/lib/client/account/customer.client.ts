import 'server-only'

import { NO_RESULT_PAGER, PageResult } from '@/lib/model'
import { CustomerSearchForm } from '@/lib/model/form/account.schema'
import { CustomerDetails, CustomerListItem } from '@/lib/model/output/account.model'

export async function search(form: CustomerSearchForm): Promise<PageResult<CustomerListItem>> {
    return {
        contents: [],
        pager: NO_RESULT_PAGER
    }
}

export async function findById(id: any): Promise<CustomerDetails> {
    return {
        id: id,
        name: "Thidar",
        phone: "019181817",
        email: "thidar@gmail.com",
        registeredAt: "2025-10-01",
        addresses: [
            { id: 1, label: "Home", address: "No. 12, 5th Street", township: "Kamayut", isDefault: true },
            { id: 2, label: "Office", address: "Level 3, Junction Tower", township: "Kyauktada", isDefault: false },
        ],
        orderSummary: [
            { status: "Confirmed", count: 3, amount: "60,000 MMK" },
            { status: "Delivered", count: 15, amount: "820,000 MMK" },
            { status: "Canceled", count: 2, amount: "30,000 MMK" },
        ]
    }
}
