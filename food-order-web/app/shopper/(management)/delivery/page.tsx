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
import { useForm } from "react-hook-form"
import { DeliSearchForm, DeliSearchSchema } from "@/lib/model/form/management.schema"
import { DeliveryListItem } from "@/lib/model/output/management.model"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { HugeiconsIcon } from "@hugeicons/react"
import { Search } from "@hugeicons/core-free-icons"
import FormsInput from "@/components/widgets/forms/forms-input"
import { useFetch } from "@/hooks/use-fetch"

import * as deliveryService from "@/lib/action/shopper/management/delivery.action"

const SEARCH_FORM: DeliSearchForm = {
    from: "",
    to: "",
    keyword: "",
}

export default function DeliveryManagementPage() {
    const { setTitle } = usePageTitle()

    const [list, setList] = useFetch(() => deliveryService.search(SEARCH_FORM), [])

    useEffect(() => {
        setTitle("Delivery Management")
    }, [])

    const search = async (form: DeliSearchForm) => {
        const result = await deliveryService.search(form)
        setList(result)
    }

    return (
        <section className="space-y-6">
            <SearchForm onSearch={search} />
            <ResultTable list={list ?? []} />
        </section>
    )
}

function SearchForm({ onSearch }: { onSearch: (form: DeliSearchForm) => void }) {
    const form = useForm<DeliSearchForm>({
        resolver: zodResolver(DeliSearchSchema),
        defaultValues: { ...SEARCH_FORM },
    })

    return (
        <Section>
            <form onSubmit={form.handleSubmit(onSearch)} className="flex gap-4">
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

function ResultTable({ list }: { list: DeliveryListItem[] }) {
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
                        <TableHead>Deilvery Date</TableHead>
                        <TableHead>Time Range</TableHead>
                        <TableHead>Address</TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {list.map((item) => (
                        <TableRow key={item.invoiceId}>
                            <TableCell>{item.invoiceId}</TableCell>
                            <TableCell>{item.customer}</TableCell>
                            <TableCell>{item.deliveryDate}</TableCell>
                            <TableCell>{item.timeRange}</TableCell>
                            <TableCell>{item.address}</TableCell>
                            <TableCell className="flex justify-center">
                                <DetailsLink url={`/shopper/invoices/${item.invoiceId}`} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Section>
    )
}
