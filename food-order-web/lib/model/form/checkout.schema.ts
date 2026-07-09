import z from "zod"

export const CheckoutSchema = z.object({
    name: z.string().nonempty("Please enter your name."),
    phone: z.string().nonempty("Please enter your phone number."),
    email: z.string().nonempty("Please enter your email address."),
    address: z.string().nonempty("Please enter your delivery address."),
    township: z.string().nonempty("Please enter your township."),
    deliveryDate: z.string().nonempty("Please select a delivery date."),
    deliveryTimeId: z.string().nonempty("Please select a delivery time."),
    remark: z.string(),
})

export type CheckoutForm = z.infer<typeof CheckoutSchema>
