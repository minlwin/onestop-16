import z from "zod"
import { PageSearch } from ".."

export const CustomerSearchSchema = z.object({
    from: z.string(),
    to: z.string(),
    keyword: z.string(),
})

export type CustomerSearchForm = z.infer<typeof CustomerSearchSchema> & PageSearch

export const EmployeeSearchSchema = z.object({
    status: z.string(),
    keyword: z.string(),
})

export type EmployeeSearchForm = z.infer<typeof EmployeeSearchSchema>

export const EmployeeSchema = z.object({
    name: z.string().nonempty("Please enter employee name."),
    phone: z.string().nonempty("Please enter phone number."),
    email: z.string().nonempty("Please enter email address."),
    entryAt: z.string().nonempty("Please enter entry date."),
    retireAt: z.string().optional(),
})

export type EmployeeForm = z.infer<typeof EmployeeSchema>
