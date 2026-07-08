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

export default function OrdersManagementPage() {
    const { setTitle } = usePageTitle()

    useEffect(() => {
        setTitle("Order Management")
    }, [])

    return (
        <section className="flex gap-6">
            <div className="flex-2">
                <ResultTable />
            </div>

            <div className="flex-1">
                <OrderTable />
            </div>
        </section>
    )
}

function ResultTable() {
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
                    <TableRow>
                        <TableCell>202606010001</TableCell>
                        <TableCell>U Win Ko</TableCell>
                        <TableCell>2026-06-03</TableCell>
                        <TableCell>2026-06-05</TableCell>
                        <TableCell className="flex justify-center">
                            <DetailsLink url={`/shopper/invoices/1`} />
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </Section>
    )
}

function OrderTable() {
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
                    <TableRow>
                        <TableCell>Curry</TableCell>
                        <TableCell className="text-end">89</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </Section>
    )
}
