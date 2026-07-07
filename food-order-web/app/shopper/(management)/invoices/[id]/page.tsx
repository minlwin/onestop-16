'use client'

import { usePageTitle } from "@/app/shopper/_states/page-title-provider"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import Section from "@/components/widgets/section"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type InvoiceDetails = {
    id: string
    status: string
    invoiceDate: string
    statusChangedAt: string
}

type CustomerInfo = {
    name: string
    phone: string
    email: string
}

type DeliveryAddress = {
    label: string
    address: string
    township: string
}

type DispatchSchedule = {
    date: string
    from: string
    to: string
}

type InvoiceItem = {
    id: string
    cuisine: string
    quantity: number
    price: string
    amount: string
}

type InvoiceSummary = {
    subTotal: string
    deliveryFee: string
    total: string
}

const MOCK_INVOICE: InvoiceDetails = {
    id: "202606010001",
    status: "Confirmed",
    invoiceDate: "2026-06-28",
    statusChangedAt: "2026-06-28 09:00am"
}

const MOCK_CUSTOMER: CustomerInfo = {
    name: "U Win Ko",
    phone: "0917181777",
    email: "winko@gmail.com"
}

const MOCK_ADDRESS: DeliveryAddress = {
    label: "Home",
    address: "No. 12, 5th Street",
    township: "Kamayut"
}

const MOCK_DISPATCH: DispatchSchedule = {
    date: "2026-06-30",
    from: "09:00AM",
    to: "11:00AM"
}

const MOCK_ITEMS: InvoiceItem[] = [
    { id: "1", cuisine: "Chicken Curry", quantity: 2, price: "15,000 MMK", amount: "30,000 MMK" },
    { id: "2", cuisine: "Fish Curry", quantity: 3, price: "20,000 MMK", amount: "60,000 MMK" },
    { id: "3", cuisine: "Ginger Salad", quantity: 1, price: "3,000 MMK", amount: "3,000 MMK" },
]

const MOCK_SUMMARY: InvoiceSummary = {
    subTotal: "93,000 MMK",
    deliveryFee: "2,000 MMK",
    total: "95,000 MMK"
}

function CustomerInfoCard({ customer }: { customer: CustomerInfo }) {
    return (
        <Section title="Customer Information">
            <div className="space-y-4">
                <div>
                    <p className="text-sm text-muted-foreground">Name</p>
                    <p className="font-medium">{customer.name}</p>
                </div>

                <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-medium">{customer.phone}</p>
                </div>

                <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{customer.email}</p>
                </div>
            </div>
        </Section>
    )
}

function DeliveryInfoCard({ address, dispatch }: { address: DeliveryAddress, dispatch: DispatchSchedule }) {
    return (
        <Section title="Delivery Information">
            <div className="space-y-4">
                <div>
                    <p className="text-sm text-muted-foreground">Address</p>
                    <p className="font-medium">{`${address.address}, ${address.township}`}</p>
                </div>

                <div>
                    <p className="text-sm text-muted-foreground">Dispatch Date</p>
                    <p className="font-medium">{dispatch.date}</p>
                </div>

                <div>
                    <p className="text-sm text-muted-foreground">Time Range</p>
                    <p className="font-medium">{dispatch.from} - {dispatch.to}</p>
                </div>
            </div>
        </Section>
    )
}

function InvoiceStatusCard({ invoice }: { invoice: InvoiceDetails }) {
    return (
        <Section title="Invoice Status">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div>
                    <p className="text-sm text-muted-foreground">Invoice ID</p>
                    <p className="font-medium">{invoice.id}</p>
                </div>

                <div>
                    <p className="text-sm text-muted-foreground">Invoice Date</p>
                    <p className="font-medium">{invoice.invoiceDate}</p>
                </div>

                <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <p className="font-medium">{invoice.status}</p>
                </div>

                <div>
                    <p className="text-sm text-muted-foreground">Status Changed At</p>
                    <p className="font-medium">{invoice.statusChangedAt}</p>
                </div>
            </div>
        </Section>
    )
}

function InvoiceItemsCard({ items, summary }: { items: InvoiceItem[], summary: InvoiceSummary }) {
    return (
        <section className="space-y-4">
            <h3 className="text-xl font-semibold text-primary">Invoice Items</h3>

            <Section>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Cuisine</TableHead>
                            <TableHead className="text-end">Quantity</TableHead>
                            <TableHead className="text-end">Price</TableHead>
                            <TableHead className="text-end">Amount</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {items.map(item => (
                            <TableRow key={item.id}>
                                <TableCell>{item.cuisine}</TableCell>
                                <TableCell className="text-end">{item.quantity}</TableCell>
                                <TableCell className="text-end">{item.price}</TableCell>
                                <TableCell className="text-end">{item.amount}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                <div className="ml-auto w-full max-w-xs space-y-2 pt-4">
                    <div className="flex justify-between text-sm">
                        <p className="text-muted-foreground">Sub Total</p>
                        <p className="font-medium">{summary.subTotal}</p>
                    </div>

                    <div className="flex justify-between text-sm">
                        <p className="text-muted-foreground">Delivery Fee</p>
                        <p className="font-medium">{summary.deliveryFee}</p>
                    </div>

                    <div className="flex justify-between border-t pt-2 text-base">
                        <p className="font-semibold">Total</p>
                        <p className="font-semibold">{summary.total}</p>
                    </div>
                </div>
            </Section>
        </section>
    )
}

export default function InvoiceDetailsPage() {

    const { setTitle } = usePageTitle()
    useEffect(() => setTitle('Invoice Details'), [])

    const { id } = useParams()

    const [invoice] = useState<InvoiceDetails>(MOCK_INVOICE)
    const [customer] = useState<CustomerInfo>(MOCK_CUSTOMER)
    const [address] = useState<DeliveryAddress>(MOCK_ADDRESS)
    const [dispatch] = useState<DispatchSchedule>(MOCK_DISPATCH)
    const [items] = useState<InvoiceItem[]>(MOCK_ITEMS)
    const [summary] = useState<InvoiceSummary>(MOCK_SUMMARY)

    return (
        <section className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,360px)_1fr]">
            <div className="space-y-6">
                <CustomerInfoCard customer={customer} />
                <DeliveryInfoCard address={address} dispatch={dispatch} />
            </div>

            <div className="space-y-6">
                <InvoiceStatusCard invoice={invoice} />
                <InvoiceItemsCard items={items} summary={summary} />
            </div>

        </section>
    )
}
