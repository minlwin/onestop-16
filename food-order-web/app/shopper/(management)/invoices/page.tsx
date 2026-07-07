'use client'

import { useEffect } from "react"
import { usePageTitle } from "../../_states/page-title-provider"
import Section from "@/components/widgets/section"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import DetailsLink from "@/components/widgets/details-link"
import { INVOICE_STATUS_OPTION, InvoiceSearchForm, InvoiceSearchSchema } from "@/lib/model/form/management.schema"
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { Search } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { useForm } from "react-hook-form"
import FormsSelect from "@/components/widgets/forms/forms-select"
import FormsInput from "@/components/widgets/forms/forms-input"

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
    const form = useForm<InvoiceSearchForm>({
        resolver: zodResolver(InvoiceSearchSchema),
        defaultValues: {
            status: "",
            from: "",
            to: "",
            keyword: ""
        }
    })

    const search = (form: InvoiceSearchForm) => {

    }

    return (
        <Section>
            <form onSubmit={form.handleSubmit(search)} className="flex gap-4">
                <FormsSelect control={form.control} path="status" label="Status" options={INVOICE_STATUS_OPTION} className="flex-1" />
                <FormsInput control={form.control} path="from" label="Date From" type="date" className="flex-1" />
                <FormsInput control={form.control} path="to" label="Date To" type="date" className="flex-1" />
                <FormsInput control={form.control} path="keyword" label="Keyword" className="flex-2" />

                <div className="flex-1 flex items-end">
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
                        <TableHead>Phone</TableHead>
                        <TableHead>Invoice Date</TableHead>
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
                        <TableCell>2026-06-28</TableCell>
                        <TableCell>Confirmed</TableCell>
                        <TableCell>2026-06-28 9:00am</TableCell>
                        <TableCell className="text-end">90,000 MMK</TableCell>
                        <TableCell className="flex justify-center">
                            <DetailsLink url={`/shopper/invoices/1`} />
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </Section>
    )
}