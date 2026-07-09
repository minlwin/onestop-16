import "server-only"

import { DeliSearchForm } from "@/lib/model/form/management.schema"
import { DeliveryListItem } from "@/lib/model/output/management.model"

export async function search(form: DeliSearchForm): Promise<DeliveryListItem[]> {
    return MOCK_DELIVERIES.filter((data) => {
        if (form.from && data.deliveryDate < form.from) {
            return false
        }

        if (form.to && data.deliveryDate > form.to) {
            return false
        }

        if (
            form.keyword &&
            !(
                data.customer.toLocaleLowerCase().includes(form.keyword.toLocaleLowerCase()) ||
                data.invoiceId.includes(form.keyword)
            )
        ) {
            return false
        }

        return true
    })
}

const MOCK_DELIVERIES: DeliveryListItem[] = [
    {
        invoiceId: "202606010001",
        customer: "U Win Ko",
        deliveryDate: "2026-06-05",
        timeRange: "09:00AM - 11:00AM",
        address: "Yangon, Kamayut",
    },
    {
        invoiceId: "202606010002",
        customer: "Thidar",
        deliveryDate: "2026-06-06",
        timeRange: "13:00PM - 15:00PM",
        address: "Yangon, Bahan",
    },
    {
        invoiceId: "202606010003",
        customer: "Aung Aung",
        deliveryDate: "2026-06-07",
        timeRange: "17:00PM - 19:00PM",
        address: "Yangon, Sanchaung",
    },
]
