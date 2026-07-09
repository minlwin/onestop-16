export type CustomerInfo = {
    name: string
    phone: string
    email: string
}

export type DeliveryInfo = {
    label: string
    address: string
    township: string
    fees: number
    dispatchDate: string
    timeFrom: string
    timeTo: string
    remark: string
}

export type InvoiceItem = {
    id: string
    cuisine: string
    quantity: number
    price: number
}

export type InvoiceDetails = {
    id: string
    status: string
    invoiceDate: string
    statusChangedAt: string
    items: InvoiceItem[]
    customer: CustomerInfo
    delivery: DeliveryInfo
}

export type InvoiceListItem = {
    id: string
    customer: string
    phone: string
    invoiceDate: string
    status: string
    statusChangedAt: string
    amount: number
}

export type DeliveryListItem = {
    invoiceId: string
    customer: string
    deliveryDate: string
    timeRange: string
    address: string
}

export type WeeklyInvoiceItem = {
    id: string
    customer: string
    confirmDate: string
    deliveryDate: string
}

export type OrderCuisineSummary = {
    cuisine: string
    quantity: number
}
