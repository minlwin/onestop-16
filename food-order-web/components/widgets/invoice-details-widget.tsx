'use client'

import { useEffect, useState } from "react"
import Section from "@/components/widgets/section"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CustomerInfo, DeliveryInfo, InvoiceDetails } from "@/lib/model/output/management.model"
import LoadingWidget from "./loading-widget"

const MOCK_INVOICE: InvoiceDetails = {
    id: "202606010001",
    status: "Confirmed",
    invoiceDate: "2026-06-28",
    statusChangedAt: "2026-06-28 09:00am",
    customer: {
        name: "U Win Ko",
        phone: "0917181777",
        email: "winko@gmail.com"
    },
    delivery: {
        label: "Home",
        address: "No. 12, 5th Street",
        township: "Kamayut",
        dispatchDate: "2026-06-30",
        timeFrom: "09:00AM",
        timeTo: "11:00AM",
        fees: 3000
    },
    items: [
        { id: "1", cuisine: "Chicken Curry", quantity: 2, price: 18000 },
        { id: "2", cuisine: "Fish Curry", quantity: 3, price: 15000 },
        { id: "3", cuisine: "Ginger Salad", quantity: 1, price: 7000 },
    ]
}

export default function InvoiceDetailsWidget({id} : {id : string}) {

    const [invoice, setInvoice] = useState<InvoiceDetails>()

    const subtotal = invoice?.items.map(item => item.price * item.quantity).reduce((a, b) => a + b) ?? 0
    const deliveryFees = subtotal + (invoice?.delivery.fees ?? 0)
    const allTotal = subtotal + deliveryFees
    
    useEffect(() => {
        setInvoice(MOCK_INVOICE)
    }, [id])

    if(invoice === undefined) {
        return (
            <LoadingWidget />
        )
    }

    return (
        <section className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,360px)_1fr]">
            <div className="space-y-6">
                <CustomerInfoCard customer={invoice.customer} />
                <DeliveryInfoCard info={invoice.delivery} />
            </div>

            <div className="space-y-6">
                <InvoiceStatusCard invoice={invoice} />
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
                                {invoice.items.map(item => (
                                    <TableRow key={item.id}>
                                        <TableCell>{item.cuisine}</TableCell>
                                        <TableCell className="text-end">{item.quantity}</TableCell>
                                        <TableCell className="text-end">{item.price.toLocaleString()} MMK</TableCell>
                                        <TableCell className="text-end">{(item.quantity * item.price).toLocaleString()} MMK</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                        <div className="ml-auto w-full max-w-xs space-y-2 pt-4">
                            <div className="flex justify-between text-sm">
                                <p className="text-muted-foreground">Sub Total</p>
                                <p className="font-medium">{subtotal.toLocaleString()} MMK</p>
                            </div>

                            <div className="flex justify-between text-sm">
                                <p className="text-muted-foreground">Delivery Fee</p>
                                <p className="font-medium">{deliveryFees.toLocaleString()} MMK</p>
                            </div>

                            <div className="flex justify-between border-t pt-2 text-base">
                                <p className="font-semibold">Total</p>
                                <p className="font-semibold">{allTotal.toLocaleString()} MMK</p>
                            </div>
                        </div>
                    </Section>
                </section>
            </div>

        </section>
    )
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

function DeliveryInfoCard({ info }: { info : DeliveryInfo }) {
    return (
        <Section title="Delivery Information">
            <div className="space-y-4">
                <div>
                    <p className="text-sm text-muted-foreground">Address</p>
                    <p className="font-medium">{`${info.address}, ${info.township}`}</p>
                </div>

                <div>
                    <p className="text-sm text-muted-foreground">Dispatch Date</p>
                    <p className="font-medium">{info.dispatchDate}</p>
                </div>

                <div>
                    <p className="text-sm text-muted-foreground">Time Range</p>
                    <p className="font-medium">{info.timeFrom} - {info.timeTo}</p>
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