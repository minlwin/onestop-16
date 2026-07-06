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
import DetailsLink from "@/components/widgets/details-link"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export default function PaymentInfoMasterPage() {

    const {setTitle} = usePageTitle()

    useEffect(() => {
        setTitle('Payment Info Master')
    }, [])

    const [open, setOpen] = useState(false)
    const form = useForm<PaymentInfoForm>({
        resolver: zodResolver(PaymentInfoSchema),
        defaultValues: {
            bank: '',
            accountNo: '',
            accountName: '',
            status: ''
        }
    })

    const save = (form: PaymentInfoForm) => {

    }

    return (
        <section className="space-y-6">
            <SearchForm onAddNew={() => {
                form.reset()
                setOpen(true)
            }} />
            
            <ResultTable />

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <form onSubmit={form.handleSubmit(save)}>
                        <DialogHeader>
                            <DialogTitle>Create Payment Information</DialogTitle>
                            <DialogDescription>Add a new payment method with its bank, account, and status details.</DialogDescription>
                        </DialogHeader>

                        <section className="my-4 space-y-4">
                            <FormsInput control={form.control} path="bank" label="Bank / Provider" />
                            <FormsInput control={form.control} path="accountNo" label="Account No" />
                            <FormsInput control={form.control} path="accountName" label="Account Name" />
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
    const form = useForm<PaymentInfoSearchForm>({
        resolver: zodResolver(PaymentInfoSearchSchema),
        defaultValues: {
            status: '',
            bank: '',
            account: ''
        }
    })

    const search = (form:PaymentInfoSearchForm) => {

    }

    return (
        <Section>
            <form onSubmit={form.handleSubmit(search)} className="flex gap-4">
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

function ResultTable() {
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
                    <TableRow>
                        <TableCell>KBZ Pay</TableCell>
                        <TableCell>09782003098</TableCell>
                        <TableCell>U Zaw Min Lwin</TableCell>
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