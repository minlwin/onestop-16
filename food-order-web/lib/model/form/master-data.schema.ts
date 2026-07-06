import z from "zod";

export const MASTER_STATUS: {
    value: string
    label: string
}[] = [
    {value : 'Pending', label: 'Pending'},
    {value : 'Enable', label: 'Enable'},
]

export const CategorySearchSchema = z.object({
    status: z.enum(["Pending", "Enable", ""]),
    keyword: z.string()
})

export type CategorySearchForm = z.infer<typeof CategorySearchSchema>

export const CategorySchema = z.object({
    name : z.string().nonempty("Please enter category name."),
    status: z.enum(["Pending", "Enable", ""]).nonoptional("Please select status.")
}).refine(data => data.status !== "", {
    message: "Please select status.",
    path: ['status']
})

export type CategoryForm = z.infer<typeof CategorySchema>

export const CusineSearchSchema = z.object({
    status: z.enum(["Pending", "Enable", ""]),
    keyword: z.string()
})

export type CuisineSearchForm = z.infer<typeof CusineSearchSchema>

export const CuisineSchema = z.object({
    status: z.enum(["Pending", "Enable", ""]),
}).refine(data => data.status !== "", {
    message: "Please select status.",
    path: ['status']
})

export const DeliTimeSearchSchema = z.object({
    status: z.enum(["Pending", "Enable", ""]),
    time: z.string()
})

export type DeliTimeSearchForm = z.infer<typeof DeliTimeSearchSchema>

export const DeliTimeSchema = z.object({
    timeFrom : z.string().nonempty("Please enter start time."),
    timeTo: z.string().nonempty("Please enter end time."),
    status: z.enum(["Pending", "Enable", ""])
}).refine(data => data.status !== "", {
    message: "Please select status.",
    path: ['status']
})

export type DeliTimeForm = z.infer<typeof DeliTimeSchema>

export const PaymentInfoSearchSchema = z.object({
    status: z.enum(["Pending", "Enable", ""]),
    bank: z.string(),
    account: z.string()
})

export type PaymentInfoSearchForm = z.infer<typeof PaymentInfoSearchSchema>

export const PaymentInfoSchema = z.object({
    bank: z.string().nonempty("Please enter bank name."),
    accountNo: z.string().nonempty("Please enter account no."),
    accountName: z.string().nonempty("Please enter account name."),
    status: z.enum(["Pending", "Enable", ""]),
}).refine(data => data.status !== "", {
    message: "Please select status.",
    path: ['status']
})

export type PaymentInfoForm = z.infer<typeof PaymentInfoSchema>