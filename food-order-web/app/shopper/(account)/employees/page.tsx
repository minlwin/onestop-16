'use client'

import { useEffect } from "react"
import { usePageTitle } from "../../_states/page-title-provider"
import Section from "@/components/widgets/section"
import { useForm } from "react-hook-form"
import { EmployeeSearchForm, EmployeeSearchSchema } from "@/lib/model/form/account.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import FormsSelect from "@/components/widgets/forms/forms-select"
import FormsInput from "@/components/widgets/forms/forms-input"
import { Button } from "@/components/ui/button"
import { HugeiconsIcon } from "@hugeicons/react"
import { Plus, Search } from "@hugeicons/core-free-icons"
import Link from "next/link"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import DetailsLink from "@/components/widgets/details-link"

export default function EmployeeManagementPage() {
    
    const {setTitle} = usePageTitle()
    
    useEffect(() => {
        setTitle('Employee Management')
    }, [])

    return (
        <section className="space-y-6">
            <SearchForm />
            <ResultTable />
        </section>
    )
}

function SearchForm() {

    const form = useForm<EmployeeSearchForm>({
        resolver: zodResolver(EmployeeSearchSchema),
        defaultValues: {
            status: '',
            keyword: ''
        }
    })

    const search = (form: EmployeeSearchForm) => {

    }

    return (
        <Section>
            <form onSubmit={form.handleSubmit(search)} className="flex gap-4">
                <FormsSelect control={form.control} path="status" label="Status" options={[
                    {value: 'Active', label: 'Active'},
                    {value: 'Retired', label: 'Retired'},
                ]} className="flex-1" />
                <FormsInput control={form.control} path="keyword" label="Keyword" className="flex-1" />
                <div className="flex-4 flex items-end gap-2">
                    <Button type="submit">
                        <HugeiconsIcon icon={Search} /> Search
                    </Button>

                    <Button asChild variant={"outline"}>
                        <Link href={'/shopper/employees/edit'}>
                            <HugeiconsIcon icon={Plus} /> Add Employee
                        </Link>
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
                        <TableHead>Code</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Entry At</TableHead>
                        <TableHead>Retired At</TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    <TableRow>
                        <TableCell>E0001</TableCell>
                        <TableCell>Aung Aung</TableCell>
                        <TableCell>091817662</TableCell>
                        <TableCell>aung@gmail.com</TableCell>
                        <TableCell>2020-01-01</TableCell>
                        <TableCell></TableCell>
                        <TableCell className="flex items-center justify-center">
                            <DetailsLink url="" />
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </Section>
    )
}