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