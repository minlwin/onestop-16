'use client'

import { useEffect } from "react"
import { usePageTitle } from "../../_states/page-title-provider"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Section from "@/components/widgets/section"
import { Button } from "@/components/ui/button"
import FormsInput from "@/components/widgets/forms/forms-input"
import FormsSelect from "@/components/widgets/forms/forms-select"
import { DeliTimeSearchForm, DeliTimeSearchSchema, MASTER_STATUS } from "@/lib/model/form/master-data.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Search } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { useForm } from "react-hook-form"
import AddNewBtn from "@/components/widgets/add-new-btn"
import DetailsLink from "@/components/widgets/details-link"

export default function DeliveryTimeMasterPage() {
    const {setTitle} = usePageTitle()

    useEffect(() => {
        setTitle('Delivery Time Master')
    }, [])

    return (
        <section className="space-y-6">
            <SearchForm />
            <ResultTable />
        </section>
    )
}

function SearchForm() {
    const form = useForm<DeliTimeSearchForm>({
        resolver: zodResolver(DeliTimeSearchSchema),
        defaultValues: {
            status: '',
            time: ''
        }
    })

    const search = (form:DeliTimeSearchForm) => {

    }

    const addNew = () => {}

    return (
        <Section>
            <form onSubmit={form.handleSubmit(search)} className="flex gap-4">
                <FormsSelect control={form.control} path="status" label="Status" options={MASTER_STATUS} className="flex-2" />
                <FormsInput control={form.control} path="time" label="Time" className="flex-3" />

                <div className="flex-4 flex gap-2 items-end">
                    <Button type="submit">
                        <HugeiconsIcon icon={Search} /> Search
                    </Button>

                    <AddNewBtn onClick={addNew} />
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
                        <TableHead>Time From</TableHead>
                        <TableHead>Time To</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Created At</TableHead>
                        <TableHead>Last Modified At</TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    <TableRow>
                        <TableCell>09:00 AM</TableCell>
                        <TableCell>11:00 AM</TableCell>
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