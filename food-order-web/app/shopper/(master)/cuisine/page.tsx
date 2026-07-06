'use client'

import { useEffect } from "react"
import { usePageTitle } from "../../_states/page-title-provider"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Section from "@/components/widgets/section"
import { HugeiconsIcon } from "@hugeicons/react"
import { Button } from "@/components/ui/button"
import FormsInput from "@/components/widgets/forms/forms-input"
import FormsSelect from "@/components/widgets/forms/forms-select"
import { CuisineSearchForm, CusineSearchSchema, MASTER_STATUS } from "@/lib/model/form/master-data.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Search } from "@hugeicons/core-free-icons"
import { useForm } from "react-hook-form"
import AddNewBtn from "@/components/widgets/add-new-btn"
import DetailsLink from "@/components/widgets/details-link"
import { useRouter } from "next/navigation"

export default function CuisineMasterPage() {

    const {setTitle} = usePageTitle()

    useEffect(() => {
        setTitle('Cuisine Master')
    }, [])

    return (
        <section className="space-y-6">
            <SearchForm />
            <ResultTable />
        </section>
    )
}

function SearchForm() {

    const router = useRouter()

    const form = useForm<CuisineSearchForm>({
        resolver: zodResolver(CusineSearchSchema),
        defaultValues: {
            status: '',
            keyword: ''
        }
    })

    const search = (form:CuisineSearchForm) => {

    }

    return (
        <Section>
            <form onSubmit={form.handleSubmit(search)} className="flex gap-4">
                <FormsSelect control={form.control} path="status" label="Status" options={MASTER_STATUS} className="flex-2" />
                <FormsInput control={form.control} path="keyword" label="Keyword" className="flex-3" />

                <div className="flex-4 flex gap-2 items-end">
                    <Button type="submit">
                        <HugeiconsIcon icon={Search} /> Search
                    </Button>

                    <AddNewBtn onClick={() => router.push('/shopper/cuisine/edit')} />
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
                        <TableHead>Cuisine</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Created At</TableHead>
                        <TableHead>Last Modified At</TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    <TableRow>
                        <TableCell>Chicken Curry</TableCell>
                        <TableCell>Curry</TableCell>
                        <TableCell>Available</TableCell>
                        <TableCell>2020-01-01 09:00</TableCell>
                        <TableCell>2023-05-01 10:00</TableCell>
                        <TableCell className="flex justify-center">
                            <DetailsLink url="" />
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </Section>
    )
}