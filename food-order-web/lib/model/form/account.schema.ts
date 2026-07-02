import z from "zod";

export const CustomerSearchSchema = z.object({
    from: z.string(),
    to: z.string(),
    keyword: z.string()
})

export type CustomerSearchForm = z.infer<typeof CustomerSearchSchema>

export const EmployeeSearchSchema = z.object({
    status: z.string(),
    keyword: z.string()
})

export type EmployeeSearchForm = z.infer<typeof EmployeeSearchSchema>
