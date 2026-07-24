"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowLeft, ShoppingBasket01Icon } from "@hugeicons/core-free-icons"
import { Button } from "@/components/ui/button"
import FormsInput from "@/components/widgets/forms/forms-input"
import FormsSelect from "@/components/widgets/forms/forms-select"
import FormsTextarea from "@/components/widgets/forms/forms-textarea"
import Section from "@/components/widgets/section"
import NoDataWidget from "@/components/widgets/no-data"
import LoadingWidget from "@/components/widgets/loading-widget"
import { useFetch } from "@/hooks/use-fetch"
import { CheckoutForm, CheckoutSchema } from "@/lib/model/form/checkout.schema"
import { formatCurrency } from "@/lib/utils"
import { useCart } from "../_states/cart-provider"

import * as checkoutService from "@/lib/action/anonymous/invoice.action"
import * as deliveryTimeService from "@/lib/action/anonymous/delivery-time.action"

export default function CheckOutPage() {
    const router = useRouter()
    const cart = useCart()

    const [deliveryTimes] = useFetch(() => deliveryTimeService.search(), [])

    const form = useForm<CheckoutForm>({
        resolver: zodResolver(CheckoutSchema),
        defaultValues: {
            name: "",
            phone: "",
            email: "",
            address: "",
            township: "",
            deliveryDate: "",
            deliveryTimeId: "",
            remark: "",
        },
    })

    const save = async (values: CheckoutForm) => {
        const request = {
            items: cart.items,
            ...values
        }
        console.log(JSON.stringify(request))
        const result = await checkoutService.checkout(request)
        cart.clear()
        router.push(`/cart/checkout/${result.id}`)
    }

    if (!deliveryTimes) {
        return <LoadingWidget />
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

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <Section title="Delivery Address">
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <FormsInput
                                    control={form.control}
                                    path="township"
                                    label="Township"
                                />
                                <FormsTextarea
                                    control={form.control}
                                    path="address"
                                    label="Address"
                                    className="sm:col-span-2"
                                />
                            </div>
                        </Section>

                        <Section title="Delivery Schedule">
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <FormsInput
                                    control={form.control}
                                    path="deliveryDate"
                                    type="date"
                                    label="Delivery Date"
                                />
                                <FormsSelect
                                    control={form.control}
                                    path="deliveryTimeId"
                                    label="Delivery Time"
                                    options={deliveryTimes.map((slot) => ({
                                        value: String(slot.id),
                                        label: `${slot.timeFrom} - ${slot.timeTo}`,
                                    }))}
                                />
                                <FormsTextarea
                                    control={form.control}
                                    path="remark"
                                    label="Remark"
                                    placeholder="Any note for the rider or kitchen"
                                    className="sm:col-span-2"
                                />
                            </div>
                        </Section>
                    </div>

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
