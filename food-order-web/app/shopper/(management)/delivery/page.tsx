"use client"

import { useEffect } from "react"
import { usePageTitle } from "../../_states/page-title-provider"
import Section from "@/components/widgets/section"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import DetailsLink from "@/components/widgets/details-link"
import { useForm } from "react-hook-form"
import { DeliSearchForm, DeliSearchSchema } from "@/lib/model/form/management.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { HugeiconsIcon } from "@hugeicons/react"
import { Search } from "@hugeicons/core-free-icons"
import FormsInput from "@/components/widgets/forms/forms-input"

export default function DeliveryManagementPage() {
    const { setTitle } = usePageTitle()

    useEffect(() => {
        setTitle("Delivery Management")
    }, [])

    return (
        <section className="space-y-6">
            <SearchForm />
            <ResultTable />
        </section>
    )
}

function SearchForm() {
    const form = useForm<DeliSearchForm>({
        resolver: zodResolver(DeliSearchSchema),
        defaultValues: {
            from: "",
            to: "",
            keyword: "",
        },
    })

    const search = (form: DeliSearchForm) => {}

    return (
        <Section>
            <form onSubmit={form.handleSubmit(search)} className="flex gap-4">
                <FormsInput
                    control={form.control}
                    path="from"
                    label="Date From"
                    type="date"
                    className="flex-1"
                />
                <FormsInput
                    control={form.control}
                    path="to"
                    label="Date To"
                    type="date"
                    className="flex-1"
                />
                <FormsInput
                    control={form.control}
                    path="keyword"
                    label="Keyword"
                    className="flex-2"
                />

                <div className="flex-2 flex items-end">
                    <Button type="submit">
                        <HugeiconsIcon icon={Search} /> Search
                    </Button>
                </div>
            </form>
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
                            <DetailsLink url={`/shopper/invoices/1`} />
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </Section>
    )
}
