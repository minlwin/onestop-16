"use client"

import { useEffect } from "react"
import { usePageTitle } from "../../_states/page-title-provider"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Section from "@/components/widgets/section"
import DetailsLink from "@/components/widgets/details-link"
import NoDataWidget from "@/components/widgets/no-data"
import LoadingWidget from "@/components/widgets/loading-widget"
import { useFetch } from "@/hooks/use-fetch"
import { OrderCuisineSummary, WeeklyInvoiceItem } from "@/lib/model/output/management.model"

import * as ordersService from "@/lib/action/shopper/management/orders.action"

export default function OrdersManagementPage() {
    const { setTitle } = usePageTitle()

    const [weeklyInvoices] = useFetch(() => ordersService.weeklyInvoices(), [])
    const [cuisineSummary] = useFetch(() => ordersService.cuisineSummary(), [])

    useEffect(() => {
        setTitle("Order Management")
    }, [])

    if (!weeklyInvoices || !cuisineSummary) {
        return <LoadingWidget />
    }

    return (
        <section className="flex gap-6">
            <div className="flex-2">
                <ResultTable list={weeklyInvoices} />
            </div>

            <div className="flex-1">
                <OrderTable list={cuisineSummary} />
            </div>
        </section>
    )
}

function ResultTable({ list }: { list: WeeklyInvoiceItem[] }) {
    if (list.length === 0) {
        return (
            <Section title="Invoice for this week">
                <NoDataWidget />
            </Section>
        )
    }

    return (
        <Section title="Invoice for this week">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Invoice ID</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Confirm Date</TableHead>
                        <TableHead>Delivery Date</TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {list.map((item) => (
                        <TableRow key={item.id}>
                            <TableCell>{item.id}</TableCell>
                            <TableCell>{item.customer}</TableCell>
                            <TableCell>{item.confirmDate}</TableCell>
                            <TableCell>{item.deliveryDate}</TableCell>
                            <TableCell className="flex justify-center">
                                <DetailsLink url={`/shopper/invoices/${item.id}`} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Section>
    )
}

function OrderTable({ list }: { list: OrderCuisineSummary[] }) {
    if (list.length === 0) {
        return (
            <Section title="Orders">
                <NoDataWidget />
            </Section>
        )
    }

    return (
        <Section title="Orders">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Cuisine</TableHead>
                        <TableHead className="text-end">Quantity</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {list.map((item) => (
                        <TableRow key={item.cuisine}>
                            <TableCell>{item.cuisine}</TableCell>
                            <TableCell className="text-end">{item.quantity}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Section>
    )
}
