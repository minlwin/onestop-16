import z from "zod"

export const INVOICE_STATUS_OPTION: {
    value: string
    label: string
}[] = [
    { value: "Invoiced", label: "Invoiced" },
    { value: "Confirmed", label: "Confirmed" },
    { value: "Canceled", label: "Canceled" },
    { value: "Delivered", label: "Delivered" },
]

export const InvoiceSearchSchema = z.object({
    status: z.string(),
    from: z.string(),
    to: z.string(),
    keyword: z.string(),
})

export type InvoiceSearchForm = z.infer<typeof InvoiceSearchSchema>

export const DeliSearchSchema = z.object({
    from: z.string(),
    to: z.string(),
    keyword: z.string(),
})

export type DeliSearchForm = z.infer<typeof DeliSearchSchema>
