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
import { HugeiconsIcon } from "@hugeicons/react"
import { Search } from "@hugeicons/core-free-icons"
import FormsInput from "@/components/widgets/forms/forms-input"
import { useForm } from "react-hook-form"
import { CustomerSearchForm, CustomerSearchSchema } from "@/lib/model/form/account.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import DetailsLink from "@/components/widgets/details-link"
import { CustomerListItem } from "@/lib/model/output/account.model"
import Pagination from "@/components/widgets/pagination"
import NoDataWidget from "@/components/widgets/no-data"
import { useFetch } from "@/hooks/use-fetch"

import * as service from "@/lib/action/shopper/account/customer.action"

const SEARCH_FORM: CustomerSearchForm = {
    from: "",
    to: "",
    keyword: "",
    page: 0,
}

export default function CustomerManagementPage() {
    const { setTitle } = usePageTitle()

    const [searchResult, setSearchResult] = useFetch(() => service.search(SEARCH_FORM), [])

    const form = useForm<CustomerSearchForm>({
        resolver: zodResolver(CustomerSearchSchema),
        defaultValues: { ...SEARCH_FORM },
    })

    useEffect(() => {
        setTitle("Customer Management")
    }, [setTitle])

    const search = async (form: CustomerSearchForm) => {
        const result = await service.search(form)
        setSearchResult(result)
    }

    const onPageChange = async (page: number) => {
        form.setValue("page", page)
        await search(form.getValues())
    }

    return (
        <section className="space-y-6">
            <Section>
                <form onSubmit={form.handleSubmit(search)} className="flex gap-4">
                    <FormsInput
                        type="date"
                        control={form.control}
                        path="from"
                        label="Date From"
                        className="flex-1"
                    />
                    <FormsInput
                        type="date"
                        control={form.control}
                        path="to"
                        label="Date To"
                        className="flex-1"
                    />
                    <FormsInput
                        control={form.control}
                        path="keyword"
                        label="Keyword"
                        className="flex-2"
                    />
                    <div className="flex-4 flex items-end">
                        <Button type="submit">
                            <HugeiconsIcon icon={Search} /> Search
                        </Button>
                    </div>
                </form>
            </Section>

            <ResultTable list={searchResult?.contents || []} />

            <Pagination pager={searchResult?.pager} className="my-4" onPageClick={onPageChange} />
        </section>
    )
}

function ResultTable({ list }: { list: CustomerListItem[] }) {
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
                        <TableHead>Name</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Registered At</TableHead>
                        <TableHead className="text-end">Invoices</TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {list.map((item) => (
                        <TableRow key={item.id}>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.phone}</TableCell>
                            <TableCell>{item.email}</TableCell>
                            <TableCell>{item.registeredAt}</TableCell>
                            <TableCell className="text-end">{item.invoices}</TableCell>
                            <TableCell className="flex justify-center">
                                <DetailsLink url={`/shopper/customers/${item.id}`} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Section>
    )
}
