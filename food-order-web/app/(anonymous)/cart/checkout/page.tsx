"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowLeft, ShoppingBasket01Icon } from "@hugeicons/core-free-icons"
import { Button } from "@/components/ui/button"
import FormsInput from "@/components/widgets/forms/forms-input"
import Section from "@/components/widgets/section"
import NoDataWidget from "@/components/widgets/no-data"
import { CheckoutForm, CheckoutSchema } from "@/lib/model/form/checkout.schema"
import { formatCurrency } from "@/lib/utils"
import { useCart } from "../_states/cart-provider"

import * as checkoutService from "@/lib/action/anonymous/checkout.action"

export default function CheckOutPage() {
    const router = useRouter()
    const cart = useCart()

    const form = useForm<CheckoutForm>({
        resolver: zodResolver(CheckoutSchema),
        defaultValues: {
            name: "",
            phone: "",
            email: "",
            address: "",
            township: "",
        },
    })

    const save = async (values: CheckoutForm) => {
        const result = await checkoutService.checkout(values, cart.items)
        cart.clear()
        router.push(`/cart/invoice?id=${result.id}`)
    }

    if (cart.items.length === 0) {
        return (
            <div className="space-y-4 px-20 pb-8">
                <Section>
                    <NoDataWidget message="Your cart is empty. Add a dish before checking out." />
                </Section>

                <Button type="button" variant="outline" onClick={() => router.push("/cart")}>
                    <HugeiconsIcon icon={ArrowLeft} size={14} /> Back to Menu
                </Button>
            </div>
        )
    }

    return (
        <div className="space-y-4 px-20 pb-8">
            <Button type="button" variant="ghost" onClick={() => router.push("/cart")}>
                <HugeiconsIcon icon={ArrowLeft} size={14} /> Back to Menu
            </Button>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
                <form onSubmit={form.handleSubmit(save)} className="space-y-6">
                    <Section title="Contact Information">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <FormsInput control={form.control} path="name" label="Full Name" />
                            <FormsInput control={form.control} path="phone" label="Phone Number" />
                            <FormsInput
                                control={form.control}
                                path="email"
                                label="Email"
                                className="sm:col-span-2"
                            />
                        </div>
                    </Section>

                    <Section title="Delivery Address">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <FormsInput
                                control={form.control}
                                path="address"
                                label="Address"
                                className="sm:col-span-2"
                            />
                            <FormsInput control={form.control} path="township" label="Township" />
                        </div>
                    </Section>

                    <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                        <HugeiconsIcon icon={ShoppingBasket01Icon} /> Place Order
                    </Button>
                </form>

                <div className="lg:sticky lg:top-4 lg:self-start">
                    <Section title="Order Summary">
                        <div className="space-y-3">
                            {cart.items.map((item) => (
                                <div
                                    key={item.cuisineId}
                                    className="flex items-center justify-between text-sm"
                                >
                                    <span>
                                        {item.name} x {item.quantity}
                                    </span>
                                    <span className="font-medium">
                                        {formatCurrency(item.price * item.quantity)}
                                    </span>
                                </div>
                            ))}

                            <div className="flex items-center justify-between border-t pt-3 font-medium">
                                <span>Subtotal</span>
                                <span>{formatCurrency(cart.subtotal)}</span>
                            </div>
                        </div>
                    </Section>
                </div>
            </div>
        </div>
    )
}
