"use client"

import { useState } from "react"
import Image from "next/image"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { HugeiconsIcon } from "@hugeicons/react"
import {
    Add01Icon,
    Cancel,
    Delete02Icon,
    Edit02Icon,
    FavouriteIcon,
    PlusSignIcon,
    Save,
} from "@hugeicons/core-free-icons"
import { Button } from "@/components/ui/button"
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Section from "@/components/widgets/section"
import StatusBadge from "@/components/widgets/status-badge"
import DetailsLink from "@/components/widgets/details-link"
import LoadingWidget from "@/components/widgets/loading-widget"
import FormsInput from "@/components/widgets/forms/forms-input"
import FormsSwitch from "@/components/widgets/forms/forms-switch"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    AddressForm,
    AddressSchema,
    ProfileForm,
    ProfileSchema,
} from "@/lib/model/form/account.schema"
import { foodPhotoUrl, formatCurrency } from "@/lib/utils"
import { useFetch } from "@/hooks/use-fetch"
import * as accountService from "@/lib/action/customer/account.action"
import * as dashboardService from "@/lib/action/customer/dashboard.action"

export default function CustomerHomePage() {
    const [profile, setProfile] = useFetch(() => accountService.profile(), [])
    const [addresses, setAddresses] = useFetch(() => accountService.addresses(), [])
    const [recentOrders] = useFetch(() => dashboardService.recentOrders(), [])
    const [favoriteCuisines] = useFetch(() => dashboardService.favoriteCuisines(), [])
    const [weeklySpecials] = useFetch(() => dashboardService.weeklySpecials(), [])

    const [editingProfile, setEditingProfile] = useState(false)
    const [addingAddress, setAddingAddress] = useState(false)

    const profileForm = useForm<ProfileForm>({
        resolver: zodResolver(ProfileSchema),
        defaultValues: { name: "", phone: "", email: "" },
    })

    const addressForm = useForm<AddressForm>({
        resolver: zodResolver(AddressSchema),
        defaultValues: {
            label: "",
            address: "",
            township: "",
            isDefault: false,
        },
    })

    const startEditProfile = () => {
        if (profile) profileForm.reset(profile)
        setEditingProfile(true)
    }

    const saveProfile = async (values: ProfileForm) => {
        await accountService.updateProfile(values)
        setProfile(values)
        setEditingProfile(false)
    }

    const addAddress = async (values: AddressForm) => {
        const result = await accountService.addAddress(values)
        setAddresses((prev) => [...(prev ?? []), { id: result.id, ...values }])
        addressForm.reset()
        setAddingAddress(false)
    }

    const removeAddress = async (id: number) => {
        await accountService.removeAddress(id)
        setAddresses((prev) => (prev ?? []).filter((address) => address.id !== id))
    }

    if (!profile || !addresses || !recentOrders || !favoriteCuisines || !weeklySpecials) {
        return <LoadingWidget />
    }

    return (
        <section className="space-y-6 px-20 pb-8">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_minmax(0,320px)]">
                <div className="space-y-6 lg:order-2">
                    <Section
                        title="Profile"
                        action={
                            !editingProfile && (
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={startEditProfile}
                                >
                                    <HugeiconsIcon icon={Edit02Icon} size={14} /> Edit
                                </Button>
                            )
                        }
                    >
                        {editingProfile ? (
                            <form
                                onSubmit={profileForm.handleSubmit(saveProfile)}
                                className="space-y-4"
                            >
                                <FormsInput
                                    control={profileForm.control}
                                    path="name"
                                    label="Name"
                                />
                                <FormsInput
                                    control={profileForm.control}
                                    path="phone"
                                    label="Phone"
                                />
                                <FormsInput
                                    control={profileForm.control}
                                    path="email"
                                    label="Email"
                                />

                                <div className="flex justify-end gap-2">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => setEditingProfile(false)}
                                    >
                                        <HugeiconsIcon icon={Cancel} size={14} /> Cancel
                                    </Button>
                                    <Button type="submit">
                                        <HugeiconsIcon icon={Save} size={14} /> Save
                                    </Button>
                                </div>
                            </form>
                        ) : (
                            <div className="space-y-4">
                                <div>
                                    <p className="text-sm text-muted-foreground">Name</p>
                                    <p className="font-medium">{profile.name}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Phone</p>
                                    <p className="font-medium">{profile.phone}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Email</p>
                                    <p className="font-medium">{profile.email}</p>
                                </div>
                            </div>
                        )}
                    </Section>

                    <Section
                        title={
                            <span className="flex items-center gap-2">
                                <HugeiconsIcon icon={FavouriteIcon} size={16} /> Favorite Cuisines
                            </span>
                        }
                    >
                        <div className="space-y-3">
                            {favoriteCuisines.map((item, index) => (
                                <div
                                    key={item.cuisine}
                                    className="flex items-center justify-between gap-3"
                                >
                                    <div className="flex items-center gap-2">
                                        <span className="flex size-6 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                                            {index + 1}
                                        </span>
                                        <span className="font-medium">{item.cuisine}</span>
                                    </div>
                                    <span className="text-sm text-muted-foreground">
                                        {item.quantity} orders
                                    </span>
                                </div>
                            ))}
                        </div>
                    </Section>
                </div>

                <div className="space-y-6 lg:order-1">
                    <Section
                        title="Latest Orders"
                        action={<DetailsLink url="/customer/orders" label="View All" />}
                    >
                        <div className="space-y-3">
                            {recentOrders.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex items-center justify-between gap-3 rounded-lg border border-foreground/10 p-3"
                                >
                                    <div>
                                        <p className="font-medium">{item.id}</p>
                                        <p className="text-sm text-muted-foreground">
                                            {item.invoiceDate}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <StatusBadge status={item.status} />
                                        <span className="w-24 text-end font-medium">
                                            {formatCurrency(item.amount)}
                                        </span>
                                        <DetailsLink url={`/customer/orders/${item.id}`} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Section>

                    <Section
                        title="Delivery Addresses"
                        action={
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                    addressForm.reset()
                                    setAddingAddress(true)
                                }}
                            >
                                <HugeiconsIcon icon={Add01Icon} size={14} /> Add Address
                            </Button>
                        }
                    >
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            {addresses.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex items-start justify-between gap-3 rounded-lg border border-foreground/10 p-4"
                                >
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <p className="font-medium">{item.label}</p>
                                            {item.isDefault && (
                                                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                                                    Default
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-sm text-muted-foreground">
                                            {item.address}, {item.township}
                                        </p>
                                    </div>

                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon-sm"
                                        onClick={() => removeAddress(item.id)}
                                    >
                                        <HugeiconsIcon icon={Delete02Icon} size={14} />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </Section>
                </div>
            </div>

            <section className="space-y-4">
                <h3 className="text-xl font-semibold text-primary">This Week&apos;s Specials</h3>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {weeklySpecials.map((cuisine) => (
                        <Card key={cuisine.id}>
                            <Image
                                src={foodPhotoUrl(
                                    cuisine.id,
                                    400,
                                    240,
                                    `food,${cuisine.category.name.toLowerCase()}`
                                )}
                                alt={cuisine.name}
                                width={400}
                                height={240}
                                unoptimized
                                className="h-40 w-full object-cover"
                            />

                            <CardHeader>
                                <CardTitle>{cuisine.name}</CardTitle>
                                <CardAction className="text-sm text-muted-foreground">
                                    {formatCurrency(cuisine.price)}
                                </CardAction>
                            </CardHeader>

                            <CardContent className="space-y-3">
                                <p className="line-clamp-2 text-sm text-muted-foreground">
                                    {cuisine.description}
                                </p>

                                <Button type="button" size="sm" className="w-full" asChild>
                                    <a href="/cart">
                                        <HugeiconsIcon icon={PlusSignIcon} size={14} /> Order Now
                                    </a>
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            <Dialog open={addingAddress} onOpenChange={setAddingAddress}>
                <DialogContent>
                    <form onSubmit={addressForm.handleSubmit(addAddress)}>
                        <DialogHeader>
                            <DialogTitle>Add Delivery Address</DialogTitle>
                        </DialogHeader>

                        <section className="my-4 space-y-4">
                            <FormsInput control={addressForm.control} path="label" label="Label" />
                            <FormsInput
                                control={addressForm.control}
                                path="address"
                                label="Address"
                            />
                            <FormsInput
                                control={addressForm.control}
                                path="township"
                                label="Township"
                            />
                            <FormsSwitch
                                control={addressForm.control}
                                path="isDefault"
                                label="Set as Default"
                            />
                        </section>

                        <DialogFooter>
                            <Button type="submit">
                                <HugeiconsIcon icon={Save} size={14} /> Save
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </section>
    )
}
