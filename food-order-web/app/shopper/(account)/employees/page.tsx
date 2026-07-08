'use client'

import { useEffect, useState } from "react"
import { usePageTitle } from "../../_states/page-title-provider"
import Section from "@/components/widgets/section"
import { useForm } from "react-hook-form"
import { EmployeeForm, EmployeeSchema, EmployeeSearchForm, EmployeeSearchSchema } from "@/lib/model/form/account.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import FormsSelect from "@/components/widgets/forms/forms-select"
import FormsInput from "@/components/widgets/forms/forms-input"
import { Button } from "@/components/ui/button"
import { HugeiconsIcon } from "@hugeicons/react"
import { Save, Search } from "@hugeicons/core-free-icons"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import AddNewBtn from "@/components/widgets/add-new-btn"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { EditAction } from "@/lib/utils"
import EditLink from "@/components/widgets/edit-link"
import { EmployeeListItem } from "@/lib/model/output/account.model"
import NoDataWidget from "@/components/widgets/no-data"

import * as service from "@/lib/action/account/employee.action"

const SEARCH_FORM:EmployeeSearchForm = {
    status: '',
    keyword: ''
}

export default function EmployeeManagementPage() {

    const {setTitle} = usePageTitle()

    const [searchForm, setSearchForm] = useState<EmployeeSearchForm>({...SEARCH_FORM})
    const [list, setList] = useState<EmployeeListItem[]>([])

    useEffect(() => {
        setTitle('Employee Management')
        const load = async () => await search({...SEARCH_FORM})
        load()
    }, [])

    const [id, setId] = useState<string>()
    const [open, setOpen] = useState(false)
    const form = useForm<EmployeeForm>({
        resolver: zodResolver(EmployeeSchema),
        defaultValues: {
            name: '',
            email: '',
            phone: '',
            entryAt: '',
            retireAt: ''
        }
    })

    const search = async (form: EmployeeSearchForm) => {
        const result = await service.search(form)
        setList(result)
    }

    const addNew = () => {
        setId(undefined)
        form.reset()
        setOpen(true)
    }

    const edit = async (id : string) => {
        const result = await service.findById(id)
        form.reset({
            name: result.name,
            phone: result.phone,
            email: result.email,
            entryAt: result.entryAt,
            retireAt: result.retireAt
        })
        setId(id)
        setOpen(true)
    }

    const save = async (form: EmployeeForm) => {
        if(id) {
            await service.update(id, form)
        } else {
            await service.create(form)
        }

        setSearchForm({...SEARCH_FORM})
        await search({...SEARCH_FORM})

        setOpen(false)
    }

    return (
        <section className="space-y-6">
            <SearchForm searchForm={searchForm} onAddNew={addNew} onSearch={search} />

            <ResultTable list={list} onEdit={edit} />

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <form onSubmit={form.handleSubmit(save)}>
                        <DialogHeader>
                            <DialogTitle>{id == undefined ? 'Create' : 'Edit'} Employee</DialogTitle>
                        </DialogHeader>

                        <section className="space-y-4 my-4">
                            <FormsInput control={form.control} path="name" label="Name" />
                            <FormsInput control={form.control} path="phone" label="Phone" />
                            <FormsInput control={form.control} path="email" label="Email" />
                            <FormsInput control={form.control} path="entryAt" label="Entry Date" type="date" className={id != undefined ? 'hidden' : ''} />
                            <FormsInput control={form.control} path="retireAt" label="Retire Date" type="date" className={id == undefined ? 'hidden' : ''} />
                        </section>

                        <DialogFooter>
                            <Button type="submit" disabled={!form.formState.isValid}>
                                <HugeiconsIcon icon={Save} /> Save 
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </section>
    )
}

function SearchForm({searchForm, onAddNew, onSearch} : {
    searchForm: EmployeeSearchForm,
    onAddNew : VoidFunction,
    onSearch : (form: EmployeeSearchForm) => void
}) {

    const form = useForm<EmployeeSearchForm>({
        resolver: zodResolver(EmployeeSearchSchema),
        defaultValues: searchForm
    })

    return (
        <Section>
            <form onSubmit={form.handleSubmit(onSearch)} className="flex gap-4">
                <FormsSelect control={form.control} path="status" label="Status" options={[
                    {value: 'Active', label: 'Active'},
                    {value: 'Retired', label: 'Retired'},
                ]} className="flex-1" />
                <FormsInput control={form.control} path="keyword" label="Keyword" className="flex-1" />
                <div className="flex-4 flex items-end gap-2">
                    <Button type="submit">
                        <HugeiconsIcon icon={Search} /> Search
                    </Button>

                    <AddNewBtn onClick={onAddNew} />
                </div>
            </form>
        </Section>
    )
}

function ResultTable({list, onEdit} : {list: EmployeeListItem[], onEdit : EditAction}) {
    if(list.length === 0) {
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
                        <TableHead>Entry At</TableHead>
                        <TableHead>Retired At</TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {list.map(item =>
                        <TableRow key={item.id}>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.phone}</TableCell>
                            <TableCell>{item.email}</TableCell>
                            <TableCell>{item.entryAt}</TableCell>
                            <TableCell>{item.retireAt}</TableCell>
                            <TableCell className="flex items-center justify-center">
                                <EditLink onClick={() => onEdit(item.id)} />
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </Section>
    )
}