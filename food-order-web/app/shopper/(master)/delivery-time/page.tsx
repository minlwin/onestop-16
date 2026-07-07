'use client'

import { useEffect, useState } from "react"
import { usePageTitle } from "../../_states/page-title-provider"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Section from "@/components/widgets/section"
import { Button } from "@/components/ui/button"
import FormsInput from "@/components/widgets/forms/forms-input"
import FormsSelect from "@/components/widgets/forms/forms-select"
import { DeliTimeForm, DeliTimeSchema, DeliTimeSearchForm, DeliTimeSearchSchema, MASTER_STATUS } from "@/lib/model/form/master-data.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Save, Search } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { useForm } from "react-hook-form"
import AddNewBtn from "@/components/widgets/add-new-btn"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import EditLink from "@/components/widgets/edit-link"

export default function DeliveryTimeMasterPage() {
    const {setTitle} = usePageTitle()

    useEffect(() => {
        setTitle('Delivery Time Master')
    }, [])

    const form = useForm<DeliTimeForm>({
        resolver: zodResolver(DeliTimeSchema),
        defaultValues: {
            timeFrom: "",
            timeTo: "",
            status: ""
        }
    })
    const [open, setOpen] = useState(false)
    const [id, setId] = useState<string>()

    const addNew = () => {
        setId(undefined)
        form.reset()
        setOpen(true)
    }

    const edit = (id: string) => {
        setId(id)
        setOpen(true)
    }

    const save = (form:DeliTimeForm) => {
        console.log(form)
        setOpen(false)
    }

    return (
        <section className="space-y-6">
            <SearchForm onAddNew={addNew}/>

            <ResultTable onEdit={edit} />

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <form onSubmit={form.handleSubmit(save)}>
                        <DialogHeader>
                            <DialogTitle>{id == undefined ? 'Create' : 'Edit'} Delivery Time</DialogTitle>
                            <DialogDescription>Define a delivery time slot by setting the start and end time.</DialogDescription>
                        </DialogHeader>

                        <section className="my-4 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <FormsInput control={form.control} path="timeFrom" type="time" label="Time From" />
                                <FormsInput control={form.control} path="timeTo" type="time" label="Time To" />
                            </div>
                            <FormsSelect control={form.control} path="status" label="Status" options={MASTER_STATUS} />
                        </section>

                        <DialogFooter>
                            <Button type="submit">
                                <HugeiconsIcon icon={Save} /> Save
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </section>
    )
}

function SearchForm({onAddNew} : {onAddNew : VoidFunction}) {
    const form = useForm<DeliTimeSearchForm>({
        resolver: zodResolver(DeliTimeSearchSchema),
        defaultValues: {
            status: '',
            time: ''
        }
    })

    const search = (form:DeliTimeSearchForm) => {

    }

    return (
        <Section>
            <form onSubmit={form.handleSubmit(search)} className="flex gap-4">
                <FormsSelect control={form.control} path="status" label="Status" options={MASTER_STATUS} className="flex-2" />
                <FormsInput control={form.control} path="time" label="Time" className="flex-3" />

                <div className="flex-4 flex gap-2 items-end">
                    <Button type="submit">
                        <HugeiconsIcon icon={Search} /> Search
                    </Button>

                    <AddNewBtn onClick={onAddNew} />
                </div>
            </form>
        </Section>
    )
}

function ResultTable({onEdit} : {onEdit : (id:any) => void}) {
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
                            <EditLink onClick={() => onEdit(10)} />
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </Section>
    )
}