import z from "zod";

export const MASTER_STATUS: {
    value: string
    label: string
}[] = [
    {value : 'Pending', label: 'Pending'},
    {value : 'Available', label: 'Available'},
]

export const CategorySearchSchema = z.object({
    status: z.string(),
    keyword: z.string()
})

export type CategorySearchForm = z.infer<typeof CategorySearchSchema>

export const CusineSearchSchema = z.object({
    status: z.string(),
    keyword: z.string()
})

export type CuisineSearchForm = z.infer<typeof CusineSearchSchema>

export const DeliTimeSearchSchema = z.object({
    status: z.string(),
    time: z.string()
})

export type DeliTimeSearchForm = z.infer<typeof DeliTimeSearchSchema>

export const PaymentInfoSearchSchema = z.object({
    status: z.string(),
    bank: z.string(),
    account: z.string()
})

export type PaymentInfoSearchForm = z.infer<typeof PaymentInfoSearchSchema>
