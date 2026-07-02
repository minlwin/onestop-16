'use client'

import { useEffect } from "react"
import { usePageTitle } from "../../_states/page-title-provider"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Section from "@/components/widgets/section"
import DetailsLink from "@/components/widgets/details-link"

export default function OrdersManagementPage() {

    const {setTitle} = usePageTitle()

    useEffect(() => {
        setTitle('Order Management')
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
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    <TableRow>

                        <TableCell className="flex justify-center">
                            <DetailsLink url="" />
                        </TableCell>
                    </TableRow>
                </TableBody>

            </Table>
        </Section>
    )
}