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

export default function EmployeeManagementPage() {
    
    const {setTitle} = usePageTitle()
    
    useEffect(() => {
        setTitle('Employee Management')
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

    const addNew = () => {
        setId(undefined)
        form.reset()
        setOpen(true)
    }

    const edit = (id : string) => {
        setId(id)
        setOpen(true)
    }

    const save = (form: EmployeeForm) => {
        console.log(form)
        setOpen(false)
    }

    return (
        <section className="space-y-6">
            <SearchForm onAddNew={addNew} />

            <ResultTable onEdit={edit} />

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <form onSubmit={form.handleSubmit(save)}>
                        <DialogHeader>
                            <DialogTitle>Create Employee</DialogTitle>
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

function SearchForm({onAddNew} : {onAddNew : VoidFunction}) {

    const form = useForm<EmployeeSearchForm>({
        resolver: zodResolver(EmployeeSearchSchema),
        defaultValues: {
            status: '',
            keyword: ''
        }
    })

    const search = (form: EmployeeSearchForm) => {
        console.log(form)
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

                    <AddNewBtn onClick={onAddNew} />
                </div>
            </form>
        </Section>
    )
}

function ResultTable({onEdit} : {onEdit : EditAction}) {
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
                    <TableRow>
                        <TableCell>Aung Aung</TableCell>
                        <TableCell>091817662</TableCell>
                        <TableCell>aung@gmail.com</TableCell>
                        <TableCell>2020-01-01</TableCell>
                        <TableCell></TableCell>
                        <TableCell className="flex items-center justify-center">
                            <EditLink onClick={() => onEdit(1)} />
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </Section>
    )
}