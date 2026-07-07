'use client'

import { useEffect } from "react"
import { usePageTitle } from "../../_states/page-title-provider"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Section from "@/components/widgets/section"
import { HugeiconsIcon } from "@hugeicons/react"
import { Search } from "@hugeicons/core-free-icons"
import FormsInput from "@/components/widgets/forms/forms-input"
import { useForm } from "react-hook-form"
import { CustomerSearchForm, CustomerSearchSchema } from "@/lib/model/form/account.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import DetailsLink from "@/components/widgets/details-link"

export default function CustomerManagementPage() {
    const {setTitle} = usePageTitle()

    useEffect(() => {
        setTitle('Customer Management')
    }, [setTitle])

    return (
        <section className="space-y-6">
            <SearchForm />
            <ResultTable />
        </section>
    )
}

function SearchForm() {

    const form = useForm<CustomerSearchForm>({
        resolver: zodResolver(CustomerSearchSchema),
        defaultValues: {
            from: "",
            to: "",
            keyword: ""
        }
    })

    const search = (form:CustomerSearchForm) => {

    }

    return (
        <Section>
            <form onSubmit={form.handleSubmit(search)} className="flex gap-4">
                <FormsInput type="date" control={form.control} path="from" label="Date From" className="flex-1" />
                <FormsInput type="date" control={form.control} path="to" label="Date To" className="flex-1" />
                <FormsInput control={form.control} path="keyword" label="Keyword" className="flex-2" />
                <div className="flex-4 flex items-end">
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
                        <TableHead>Name</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Registered At</TableHead>
                        <TableHead className="text-end">Invoices</TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    <TableRow>
                        <TableCell>Thidar</TableCell>
                        <TableCell>019181817</TableCell>
                        <TableCell>thidar@gmail.com</TableCell>
                        <TableHead>2025/10/01</TableHead>
                        <TableCell className="text-end">20</TableCell>
                        <TableCell className="flex justify-center">
                            <DetailsLink url="/shopper/customers/1" />
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </Section>
    );
}