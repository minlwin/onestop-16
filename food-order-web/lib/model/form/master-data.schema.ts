import z from "zod"
import { PageSearch } from ".."

export const MASTER_STATUS: {
    value: string
    label: string
}[] = [
    { value: "Disable", label: "Disable" },
    { value: "Enable", label: "Enable" },
]

export const CategorySearchSchema = z.object({
    status: z.enum(["Enable", "Disable", ""]),
    keyword: z.string(),
})

export type CategorySearchForm = z.infer<typeof CategorySearchSchema>

export const CategorySchema = z
    .object({
        name: z.string().nonempty("Please enter category name."),
        status: z.enum(["Enable", "Disable", ""]).nonoptional("Please select status."),
    })
    .refine((data) => data.status !== "", {
        message: "Please select status.",
        path: ["status"],
    })

export type CategoryForm = z.infer<typeof CategorySchema>

export const SPICE_LEVEL_OPTIONS: {
    value: string
    label: string
}[] = [
    { value: "Low", label: "Low" },
    { value: "Medium", label: "Medium" },
    { value: "High", label: "High" },
]

export const CuisineSearchSchema = z.object({
    status: z.enum(["Disable", "Enable", ""]),
    keyword: z.string(),
})

export type CuisineSearchForm = z.infer<typeof CuisineSearchSchema> & PageSearch

export const CuisineSchema = z
    .object({
        name: z.string().nonempty("Please enter cuisine name."),
        description: z.string().nonempty("Please enter description."),
        category: z.string().nonempty("Please select category."),
        isRegular: z.boolean().nonoptional(),
        spiceLevel: z.enum(["", "Low", "Medium", "High"]),
        price: z.number().positive("Please enter a valid price."),
        status: z.enum(["Enable", "Disable", ""]),
        ingredients: z.array(
            z.object({
                name: z.string().nonempty("Please enter ingredient name."),
                value: z.string().nonempty("Please enter ingredient value."),
            })
        ),
    })
    .refine((data) => data.spiceLevel !== "", {
        message: "Please select spice level.",
        path: ["spiceLevel"],
    })
    .refine((data) => data.status !== "", {
        message: "Please select status.",
        path: ["status"],
    })

export type CuisineForm = z.infer<typeof CuisineSchema>

export const DeliTimeSearchSchema = z.object({
    status: z.enum(["Enable", "Disable", ""]),
    time: z.string(),
})

export type DeliTimeSearchForm = z.infer<typeof DeliTimeSearchSchema>

export const DeliTimeSchema = z
    .object({
        timeFrom: z.string().nonempty("Please enter start time."),
        timeTo: z.string().nonempty("Please enter end time."),
        status: z.enum(["Enable", "Disable", ""]),
    })
    .refine((data) => data.status !== "", {
        message: "Please select status.",
        path: ["status"],
    })

export type DeliTimeForm = z.infer<typeof DeliTimeSchema>

export const PaymentInfoSearchSchema = z.object({
    status: z.enum(["Enable", "Disable", ""]),
    bank: z.string(),
    account: z.string(),
})

export type PaymentInfoSearchForm = z.infer<typeof PaymentInfoSearchSchema>

export const PaymentInfoSchema = z
    .object({
        bank: z.string().nonempty("Please enter bank name."),
        accountNo: z.string().nonempty("Please enter account no."),
        accountName: z.string().nonempty("Please enter account name."),
        status: z.enum(["Enable", "Disable", ""]),
    })
    .refine((data) => data.status !== "", {
        message: "Please select status.",
        path: ["status"],
    })

export type PaymentInfoForm = z.infer<typeof PaymentInfoSchema>
