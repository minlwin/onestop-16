"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { HugeiconsIcon } from "@hugeicons/react"
import { Search } from "@hugeicons/core-free-icons"
import { Button } from "@/components/ui/button"
import Section from "@/components/widgets/section"
import FormsInput from "@/components/widgets/forms/forms-input"
import InvoiceResultWidget from "@/components/widgets/invoice-result-widget"
import { CheckOrderForm, CheckOrderSchema } from "@/lib/model/form/check-order.schema"

export default function CheckOrderPage() {

    const [invoiceId, setInvoiceId] = useState<string>()

    const form = useForm<CheckOrderForm>({
        resolver: zodResolver(CheckOrderSchema),
        defaultValues: { invoiceId: "" },
    })

    const check = (values: CheckOrderForm) => {
        setInvoiceId(values.invoiceId)
    }

    return (
        <div className="space-y-6 px-20 pb-8">
            <Section>
                <form onSubmit={form.handleSubmit(check)} className="flex gap-4">
                    <FormsInput
                        control={form.control}
                        path="invoiceId"
                        label="Invoice ID"
                        placeholder="Enter your invoice ID"
                        className="flex-1"
                    />

                    <div className="flex items-end">
                        <Button type="submit">
                            <HugeiconsIcon icon={Search} /> Check Status
                        </Button>
                    </div>
                </form>
            </Section>

            {invoiceId && <InvoiceResultWidget id={invoiceId} showId={false} />}
        </div>
    )
}
