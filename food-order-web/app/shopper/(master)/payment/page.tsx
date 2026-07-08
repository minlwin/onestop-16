'use client'

import { useEffect, useState } from "react"
import { usePageTitle } from "../../_states/page-title-provider"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Section from "@/components/widgets/section"
import { Button } from "@/components/ui/button"
import FormsInput from "@/components/widgets/forms/forms-input"
import FormsSelect from "@/components/widgets/forms/forms-select"
import { MASTER_STATUS, PaymentInfoForm, PaymentInfoSchema, PaymentInfoSearchForm, PaymentInfoSearchSchema } from "@/lib/model/form/master-data.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Save, Search } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { useForm } from "react-hook-form"
import AddNewBtn from "@/components/widgets/add-new-btn"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import EditLink from "@/components/widgets/edit-link"
import { EditAction } from "@/lib/utils"

import * as service from "@/lib/action/master/payment-info.action"
import { PaymentInfoListItem } from "@/lib/model/output/master-data.model"
import NoDataWidget from "@/components/widgets/no-data"

const SEARCH_FORM:PaymentInfoSearchForm = {
    account: "",
    bank: "",
    status: ""
};

export default function PaymentInfoMasterPage() {

    const {setTitle} = usePageTitle()

    const [id, setId] = useState<string>()
    const [open, setOpen] = useState(false)
    const [searchForm, setSearchForm] = useState<PaymentInfoSearchForm>({...SEARCH_FORM})
    const [searchResult, setSearchResult] = useState<PaymentInfoListItem[]>([])

    const editForm = useForm<PaymentInfoForm>({
        resolver: zodResolver(PaymentInfoSchema),
        defaultValues: {
            bank: '',
            accountNo: '',
            accountName: '',
            status: ''
        }
    })

    useEffect(() => {
        setTitle('Payment Info Master')
        const load = async () => await search({...SEARCH_FORM})
        load()
    }, [])

    useEffect(() => {
        editForm.reset()
        const load = async () => {
            if(id) {
                const result = await service.findById(id)
                editForm.reset({
                    bank: result.bank,
                    accountNo: result.accountNo,
                    accountName: result.accountName,
                    status: result.status
                })
            }
            setOpen(true)
        }
        load()
    }, [id])

    const search = async (form:PaymentInfoSearchForm) => {
        const result = await service.search(form)
        setSearchResult(result)
    }

    const save = async (form: PaymentInfoForm) => {
        if(id) {
            await service.update(id, form)
        } else {
            await service.create(form)
        }
        
        setSearchForm({...SEARCH_FORM})
        search({...SEARCH_FORM})

        setOpen(false)
    }

    return (
        <section className="space-y-6">
            <SearchForm searchForm={searchForm} onSearch={search} onAddNew={() => setId(undefined)} />
            
            <ResultTable onEdit={setId} list={searchResult} />

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <form onSubmit={editForm.handleSubmit(save)}>
                        <DialogHeader>
                            <DialogTitle>{id == undefined ? 'Create' : 'Edit'} Payment Information</DialogTitle>
                            <DialogDescription>Add a new payment method with its bank, account, and status details.</DialogDescription>
                        </DialogHeader>

                        <section className="my-4 space-y-4">
                            <FormsInput control={editForm.control} path="bank" label="Bank / Provider" />
                            <FormsInput control={editForm.control} path="accountNo" label="Account No" />
                            <FormsInput control={editForm.control} path="accountName" label="Account Name" />
                            <FormsSelect control={editForm.control} path="status" label="Status" options={MASTER_STATUS} />
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

function SearchForm({searchForm, onAddNew, onSearch} : {searchForm: PaymentInfoSearchForm, onAddNew : VoidFunction, onSearch: (form: PaymentInfoSearchForm) => void}) {
    const form = useForm<PaymentInfoSearchForm>({
        resolver: zodResolver(PaymentInfoSearchSchema),
        defaultValues: searchForm
    })

    return (
        <Section>
            <form onSubmit={form.handleSubmit(onSearch)} className="flex gap-4">
                <FormsSelect control={form.control} path="status" label="Status" options={MASTER_STATUS} className="flex-2" />
                <FormsSelect control={form.control} path="bank" label="Bank" options={[]} className="flex-2" />
                <FormsInput control={form.control} path="account" label="Account" className="flex-3" />

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

function ResultTable({list, onEdit} : {list: PaymentInfoListItem[] , onEdit : EditAction}) {
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
                        <TableHead>Bank / Provider</TableHead>
                        <TableHead>Account No</TableHead>
                        <TableHead>Account</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Created At</TableHead>
                        <TableHead>Last Modified At</TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {list.map(item => 
                        <TableRow key={item.id}>
                            <TableCell>{item.provider}</TableCell>
                            <TableCell>{item.accountNo}</TableCell>
                            <TableCell>{item.accountName}</TableCell>
                            <TableCell>{item.status}</TableCell>
                            <TableCell>{item.createdAt}</TableCell>
                            <TableCell>{item.modifiedAt}</TableCell>
                            <TableCell className="flex justify-center">
                                <EditLink onClick={() => onEdit(item.id)} />
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </Section>
    )
}