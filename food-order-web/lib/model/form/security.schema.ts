import z from "zod";

export const SignInSchema = z.object({
    email: z.email().nonempty("Please enter email address."),
    password: z.string().nonempty("Please enter password.")
})

export type SignInForm = z.infer<typeof SignInSchema>

export const SignUpSchema = z.object({
    name: z.string().nonempty("Please enter your name."),
    email: z.email().nonempty("Please enter email address."),
    password: z.string().nonempty("Please enter password.")
})

export type SignUpForm = z.infer<typeof SignUpSchema>

export const ChangePasswordSchema = z.object({
    email: z.email().nonempty("Please enter email address."),
    oldPass: z.string().nonempty("Please enter old password."),
    newPass: z.string().nonempty("Please enter new password."),
    confPass: z.string().nonempty("Please enter confirm password.")
}).refine(data => data.newPass === data.confPass, {
    message: "Password doesn't match.",
    path: ['confPass']
})

export type ChangePasswordForm = z.infer<typeof ChangePasswordSchema>