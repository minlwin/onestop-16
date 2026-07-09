import z from "zod"

export const CheckOrderSchema = z.object({
    invoiceId: z.string().nonempty("Please enter your invoice ID."),
})

export type CheckOrderForm = z.infer<typeof CheckOrderSchema>
