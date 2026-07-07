'use client'

import { usePageTitle } from "@/app/shopper/_states/page-title-provider"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import Section from "@/components/widgets/section"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type CustomerDetails = {
    name: string
    phone: string
    email: string
    registeredAt: string
}

type DeliveryAddress = {
    id: string
    label: string
    address: string
    township: string
    isDefault: boolean
}

type OrderStatusSummary = {
    status: string
    count: number
    amount: string
}

const MOCK_CUSTOMER: CustomerDetails = {
    name: "Thidar",
    phone: "019181817",
    email: "thidar@gmail.com",
    registeredAt: "2025-10-01"
}

const MOCK_ADDRESSES: DeliveryAddress[] = [
    { id: "1", label: "Home", address: "No. 12, 5th Street", township: "Kamayut", isDefault: true },
    { id: "2", label: "Office", address: "Level 3, Junction Tower", township: "Kyauktada", isDefault: false },
]

const MOCK_ORDER_SUMMARY: OrderStatusSummary[] = [
    { status: "Confirmed", count: 3, amount: "60,000 MMK" },
    { status: "Delivered", count: 15, amount: "820,000 MMK" },
    { status: "Canceled", count: 2, amount: "30,000 MMK" },
]

export default function CustomerDetailsPage() {

    const { setTitle } = usePageTitle()
    useEffect(() => setTitle('Customer Details'), [])

    const { id } = useParams()

    const [customer] = useState<CustomerDetails>(MOCK_CUSTOMER)
    const [addresses] = useState<DeliveryAddress[]>(MOCK_ADDRESSES)
    const [orderSummary] = useState<OrderStatusSummary[]>(MOCK_ORDER_SUMMARY)

    return (
        <section className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,280px)_1fr]">
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

                    <div>
                        <p className="text-sm text-muted-foreground">Registered At</p>
                        <p className="font-medium">{customer.registeredAt}</p>
                    </div>
                </div>
            </Section>

            <div className="space-y-6">
                <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-primary">Delivery Addresses</h3>

                    <Section>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Label</TableHead>
                                    <TableHead>Address</TableHead>
                                    <TableHead>Township</TableHead>
                                    <TableHead></TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {addresses.map(address => (
                                    <TableRow key={address.id}>
                                        <TableCell>{address.label}</TableCell>
                                        <TableCell>{address.address}</TableCell>
                                        <TableCell>{address.township}</TableCell>
                                        <TableCell>{address.isDefault && "Default"}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Section>
                </section>

                <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-primary">Order Status Summary</h3>

                    <Section>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-end">Orders</TableHead>
                                    <TableHead className="text-end">Amount</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {orderSummary.map(summary => (
                                    <TableRow key={summary.status}>
                                        <TableCell>{summary.status}</TableCell>
                                        <TableCell className="text-end">{summary.count}</TableCell>
                                        <TableCell className="text-end">{summary.amount}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Section>
                </section>
            </div>
        </section>
    )
}
