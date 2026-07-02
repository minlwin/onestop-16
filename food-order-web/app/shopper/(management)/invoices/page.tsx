'use client'

import { useEffect } from "react"
import { usePageTitle } from "../../_states/page-title-provider"
import Section from "@/components/widgets/section"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import DetailsLink from "@/components/widgets/details-link"

export default function InvoiceHistoryPage() {

    const {setTitle} = usePageTitle()

    useEffect(() => {
        setTitle('Invoice History')
    }, [])

    return (
        <section className="space-y-6">
            <SearchForm />
            <ResultTable />
        </section>
    )
}

function SearchForm() {
    return (
        <Section>
            <form action=""></form>
        </Section>
    )
}

function ResultTable() {
    return (
        <Section>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Invoice ID</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Status Change At</TableHead>
                        <TableHead className="text-end">Amount</TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    <TableRow>
                        <TableCell>202606010001</TableCell>
                        <TableCell>U Win Ko</TableCell>
                        <TableCell>0917181777</TableCell>
                        <TableCell>Confirmed</TableCell>
                        <TableCell>2026-06-28 9:00am</TableCell>
                        <TableCell className="text-end">90,000 MMK</TableCell>
                        <TableCell className="flex justify-center">
                            <DetailsLink url="" />
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </Section>
    )
}