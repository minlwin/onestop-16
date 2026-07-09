import z from "zod"

export const CheckoutSchema = z.object({
    name: z.string().nonempty("Please enter your name."),
    phone: z.string().nonempty("Please enter your phone number."),
    email: z.string().nonempty("Please enter your email address."),
    address: z.string().nonempty("Please enter your delivery address."),
    township: z.string().nonempty("Please enter your township."),
})

export type CheckoutForm = z.infer<typeof CheckoutSchema>
