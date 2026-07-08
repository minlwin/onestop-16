export type CustomerListItem = {
    id: number
    name: string
    phone: string
    email: string
    registeredAt: string
    invoices: number
}

export type DeliveryAddress = {
    id: number
    label: string
    address: string
    township: string
    isDefault: boolean
}

export type OrderStatusSummary = {
    status: string
    count: number
    amount: string
}

export type CustomerDetails = {
    id: number
    name: string
    phone: string
    email: string
    registeredAt: string
    addresses: DeliveryAddress[]
    orderSummary: OrderStatusSummary[]
}

export type EmployeeListItem = {
    id: number
    name: string
    phone: string
    email: string
    entryAt: string
    retireAt?: string
    status: "Active" | "Retired"
}
