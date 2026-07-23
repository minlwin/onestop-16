"use client"

import { useEffect, useState } from "react"
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
import { Button } from "@/components/ui/button"
import FormsInput from "@/components/widgets/forms/forms-input"
import FormsSelect from "@/components/widgets/forms/forms-select"
import {
    DeliTimeForm,
    DeliTimeSchema,
    DeliTimeSearchForm,
    DeliTimeSearchSchema,
    MASTER_STATUS,
} from "@/lib/model/form/master-data.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Save, Search } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { useForm } from "react-hook-form"
import AddNewBtn from "@/components/widgets/add-new-btn"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import EditLink from "@/components/widgets/edit-link"

import * as service from "@/lib/action/shopper/master/delivery-time.action"
import { DeliTimeListItem } from "@/lib/model/output/master-data.model"
import NoDataWidget from "@/components/widgets/no-data"
import { useFetch } from "@/hooks/use-fetch"

const SEARCH_FORM: DeliTimeSearchForm = {
    time: "",
    status: "",
}

export default function DeliveryTimeMasterPage() {
    const { setTitle } = usePageTitle()

    const [searchForm, setSearchForm] = useState<DeliTimeSearchForm>({ ...SEARCH_FORM })
    const [list, setList] = useFetch(() => service.search(SEARCH_FORM), [])

    const editForm = useForm<DeliTimeForm>({
        resolver: zodResolver(DeliTimeSchema),
        defaultValues: {
            timeFrom: "",
            timeTo: "",
            status: "",
        },
    })

    const [open, setOpen] = useState(false)
    const [id, setId] = useState<string>()

    useEffect(() => {
        setTitle("Delivery Time Master")
    }, [])

    useEffect(() => {
        editForm.reset()
        if (id) {
            const load = async () => {
                const result = await service.findById(id)
                editForm.reset({
                    timeFrom: result.timeFrom,
                    timeTo: result.timeTo,
                    status: result.status,
                })
            }
            load()
        }
    }, [id])

    const search = async (form: DeliTimeSearchForm) => {
        const result = await service.search(form)
        setList(result)
    }

    const save = async (form: DeliTimeForm) => {
        if (id) {
            await service.update(id, form)
        } else {
            await service.create(form)
        }
        
        editForm.reset()
        setId(undefined)

        setSearchForm({ status: "", time: "" })
        await search({ status: "", time: "" })
        setOpen(false)
    }

    return (
        <section className="space-y-6">
            <SearchForm
                searchForm={searchForm}
                onAddNew={() => {
                    setId(undefined)
                    setOpen(true)
                }}
                onSearch={search}
            />

            <ResultTable
                list={list ?? []}
                onEdit={(id) => {
                    setId(id)
                    setOpen(true)
                }}
            />

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <form onSubmit={editForm.handleSubmit(save)}>
                        <DialogHeader>
                            <DialogTitle>
                                {id == undefined ? "Create" : "Edit"} Delivery Time
                            </DialogTitle>
                            <DialogDescription>
                                Define a delivery time slot by setting the start and end time.
                            </DialogDescription>
                        </DialogHeader>

                        <section className="my-4 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <FormsInput
                                    control={editForm.control}
                                    path="timeFrom"
                                    type="time"
                                    label="Time From"
                                />
                                <FormsInput
                                    control={editForm.control}
                                    path="timeTo"
                                    type="time"
                                    label="Time To"
                                />
                            </div>
                            <FormsSelect
                                control={editForm.control}
                                path="status"
                                label="Status"
                                options={MASTER_STATUS}
                            />
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

function SearchForm({
    searchForm,
    onAddNew,
    onSearch,
}: {
    searchForm: DeliTimeSearchForm
    onAddNew: VoidFunction
    onSearch: (form: DeliTimeSearchForm) => void
}) {
    const form = useForm<DeliTimeSearchForm>({
        resolver: zodResolver(DeliTimeSearchSchema),
        defaultValues: searchForm,
    })

    return (
        <Section>
            <form onSubmit={form.handleSubmit(onSearch)} className="flex gap-4">
                <FormsSelect
                    control={form.control}
                    path="status"
                    label="Status"
                    options={MASTER_STATUS}
                    className="flex-2"
                />
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

function ResultTable({ list, onEdit }: { list: DeliTimeListItem[]; onEdit: (id: any) => void }) {
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
                        <TableHead>Time From</TableHead>
                        <TableHead>Time To</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Created At</TableHead>
                        <TableHead>Last Modified At</TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {list.map((item) => (
                        <TableRow key={item.id}>
                            <TableCell>{item.timeFrom}</TableCell>
                            <TableCell>{item.timeTo}</TableCell>
                            <TableCell>{item.status}</TableCell>
                            <TableCell>{item.createdAt}</TableCell>
                            <TableCell>{item.modifiedAt}</TableCell>
                            <TableCell className="flex justify-center">
                                <EditLink onClick={() => onEdit(item.id)} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Section>
    )
}
