"use client"

import { ReactNode } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { Alert01Icon } from "@hugeicons/core-free-icons"
import Section from "@/components/widgets/section"
import LoadingWidget from "@/components/widgets/loading-widget"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useFetch } from "@/hooks/use-fetch"
import { formatCurrency } from "@/lib/utils"

import * as invoiceService from "@/lib/action/anonymous/invoice.action"
import * as paymentInfoService from "@/lib/action/anonymous/payment-info.action"

export default function InvoiceResultWidget({
    id,
    showId = true,
    actions,
}: {
    id: string
    showId?: boolean
    actions?: ReactNode
}) {
    const [invoice] = useFetch(() => invoiceService.findById(id), [id])
    const [paymentInfos] = useFetch(
        () => paymentInfoService.search({ status: "Enable", bank: "", account: "" }),
        []
    )

    if (!invoice || !paymentInfos) {
        return <LoadingWidget />
    }

    const subtotal = invoice.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const total = subtotal + invoice.delivery.fees

    const dueDate = new Date(invoice.invoiceDate)
    dueDate.setDate(dueDate.getDate() + 3)
    const dueDateLabel = dueDate.toISOString().slice(0, 10)

    return (
        <div className="space-y-6">
            {showId && (
                <Section>
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <div>
                            <p className="text-sm text-muted-foreground">Invoice ID</p>
                            <p className="text-2xl font-semibold text-primary">{invoice.id}</p>
                        </div>

                        {actions && <div className="flex gap-2">{actions}</div>}
                    </div>
                </Section>
            )}

            <div className="flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
                <HugeiconsIcon icon={Alert01Icon} size={18} className="mt-0.5 shrink-0" />
                <p>
                    Please pay <span className="font-semibold">{formatCurrency(total)}</span> within{" "}
                    <span className="font-semibold">3 days</span> of the invoice date (by{" "}
                    <span className="font-semibold">{dueDateLabel}</span>) to avoid order
                    cancellation.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,280px)_1fr_minmax(0,280px)]">
                <div className="space-y-6">
                    <Section title="Customer Information">
                        <div className="space-y-4">
                            <div>
                                <p className="text-sm text-muted-foreground">Name</p>
                                <p className="font-medium">{invoice.customer.name}</p>
                            </div>

                            <div>
                                <p className="text-sm text-muted-foreground">Phone</p>
                                <p className="font-medium">{invoice.customer.phone}</p>
                            </div>

                            <div>
                                <p className="text-sm text-muted-foreground">Email</p>
                                <p className="font-medium">{invoice.customer.email}</p>
                            </div>
                        </div>
                    </Section>

                    <Section title="Delivery Information">
                        <div className="space-y-4">
                            <div>
                                <p className="text-sm text-muted-foreground">Address</p>
                                <p className="font-medium">
                                    {invoice.delivery.address}, {invoice.delivery.township}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-muted-foreground">Status</p>
                                <p className="font-medium">{invoice.status}</p>
                            </div>
                        </div>
                    </Section>
                </div>

                <Section title="Order Items">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Cuisine</TableHead>
                                <TableHead className="text-end">Quantity</TableHead>
                                <TableHead className="text-end">Price</TableHead>
                                <TableHead className="text-end">Amount</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {invoice.items.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>{item.cuisine}</TableCell>
                                    <TableCell className="text-end">{item.quantity}</TableCell>
                                    <TableCell className="text-end">
                                        {formatCurrency(item.price)}
                                    </TableCell>
                                    <TableCell className="text-end">
                                        {formatCurrency(item.price * item.quantity)}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    <div className="ml-auto w-full max-w-xs space-y-2 pt-4">
                        <div className="flex justify-between text-sm">
                            <p className="text-muted-foreground">Subtotal</p>
                            <p className="font-medium">{formatCurrency(subtotal)}</p>
                        </div>

                        <div className="flex justify-between text-sm">
                            <p className="text-muted-foreground">Delivery Fee</p>
                            <p className="font-medium">{formatCurrency(invoice.delivery.fees)}</p>
                        </div>

                        <div className="flex justify-between border-t pt-2 text-base">
                            <p className="font-semibold">Total</p>
                            <p className="font-semibold">{formatCurrency(total)}</p>
                        </div>
                    </div>
                </Section>

                <div>
                    <Section title="Payment Information">
                        <div className="space-y-4">
                            {paymentInfos.map((info) => (
                                <div key={info.id}>
                                    <p className="text-sm text-muted-foreground">{info.provider}</p>
                                    <p className="font-medium">{info.accountNo}</p>
                                    <p className="text-sm text-muted-foreground">
                                        {info.accountName}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </Section>
                </div>
            </div>
        </div>
    )
}
