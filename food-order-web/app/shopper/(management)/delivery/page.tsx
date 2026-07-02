'use client'

import { useEffect } from "react"
import { usePageTitle } from "../../_states/page-title-provider"
import Section from "@/components/widgets/section"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import DetailsLink from "@/components/widgets/details-link"

export default function DeliveryManagementPage() {

    const {setTitle} = usePageTitle()

    useEffect(() => {
        setTitle('Delivery Management')
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
                        <TableHead>Deilvery Date</TableHead>
                        <TableHead>Time Range</TableHead>
                        <TableHead>Address</TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    <TableRow>
                        <TableCell>202606010001</TableCell>
                        <TableCell>U Win Ko</TableCell>
                        <TableCell>2026-06-05</TableCell>
                        <TableCell>09:00AM - 11:00AM</TableCell>
                        <TableCell>Yangon, Kamayut</TableCell>
                        <TableCell className="flex justify-center">
                            <DetailsLink url="" />
                        </TableCell>
                    </TableRow>
                </TableBody>

            </Table>
        </Section>
    )
}