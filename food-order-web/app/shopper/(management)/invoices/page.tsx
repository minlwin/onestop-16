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
import NoDataWidget from "@/components/widgets/no-data"
import {
    INVOICE_STATUS_OPTION,
    InvoiceSearchForm,
    InvoiceSearchSchema,
} from "@/lib/model/form/management.schema"
import { InvoiceListItem } from "@/lib/model/output/management.model"
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { Search } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { useForm } from "react-hook-form"
import FormsSelect from "@/components/widgets/forms/forms-select"
import FormsInput from "@/components/widgets/forms/forms-input"
import { useFetch } from "@/hooks/use-fetch"
import { formatCurrency } from "@/lib/utils"

import * as invoiceService from "@/lib/action/shopper/management/invoice.action"

const SEARCH_FORM: InvoiceSearchForm = {
    status: "",
    from: "",
    to: "",
    keyword: "",
}

export default function InvoiceHistoryPage() {
    const { setTitle } = usePageTitle()

    const [list, setList] = useFetch(() => invoiceService.search(SEARCH_FORM), [])

    useEffect(() => {
        setTitle("Invoice History")
    }, [])

    const search = async (form: InvoiceSearchForm) => {
        const result = await invoiceService.search(form)
        setList(result)
    }

    return (
        <section className="space-y-6">
            <SearchForm onSearch={search} />
            <ResultTable list={list ?? []} />
        </section>
    )
}

function SearchForm({ onSearch }: { onSearch: (form: InvoiceSearchForm) => void }) {
    const form = useForm<InvoiceSearchForm>({
        resolver: zodResolver(InvoiceSearchSchema),
        defaultValues: { ...SEARCH_FORM },
    })

    return (
        <Section>
            <form onSubmit={form.handleSubmit(onSearch)} className="flex gap-4">
                <FormsSelect
                    control={form.control}
                    path="status"
                    label="Status"
                    options={INVOICE_STATUS_OPTION}
                    className="flex-1"
                />
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

                <div className="flex-1 flex items-end">
                    <Button type="submit">
                        <HugeiconsIcon icon={Search} /> Search
                    </Button>
                </div>
            </form>
        </Section>
    )
}

function ResultTable({ list }: { list: InvoiceListItem[] }) {
    if (list.length === 0) {
        return (
            <Section>
                <NoDataWidget />
            </Section>
        )
    }

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
                    {list.map((item) => (
                        <TableRow key={item.id}>
                            <TableCell>{item.id}</TableCell>
                            <TableCell>{item.customer}</TableCell>
                            <TableCell>{item.phone}</TableCell>
                            <TableCell>{item.invoiceDate}</TableCell>
                            <TableCell>{item.status}</TableCell>
                            <TableCell>{item.statusChangedAt}</TableCell>
                            <TableCell className="text-end">
                                {formatCurrency(item.amount)}
                            </TableCell>
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
