"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { HugeiconsIcon } from "@hugeicons/react"
import {
    ArrowRight,
    Delete02Icon,
    MinusSignIcon,
    PlusSignIcon,
    ShoppingBasket01Icon,
} from "@hugeicons/core-free-icons"
import { Button } from "@/components/ui/button"
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import Section from "@/components/widgets/section"
import LoadingWidget from "@/components/widgets/loading-widget"
import NoDataWidget from "@/components/widgets/no-data"
import { useFetch } from "@/hooks/use-fetch"
import { CuisineListItem } from "@/lib/model/output/master-data.model"
import { foodPhotoUrl, formatCurrency } from "@/lib/utils"
import { useCart } from "./_states/cart-provider"

import * as categoryService from "@/lib/action/anonymous/category.action"
import * as cuisineService from "@/lib/action/anonymous/cuisine.action"

export default function ShoppingCartPage() {
    const router = useRouter()
    const cart = useCart()

    const [categories] = useFetch(
        () => categoryService.search({ keyword: "", status: "Enable" }),
        []
    )
    const [cuisineResult] = useFetch(
        () => cuisineService.search({ keyword: "", status: "Enable", page: 0 }),
        []
    )

    const [selectedCategory, setSelectedCategory] = useState<number>()
    const [detailsId, setDetailsId] = useState<number>()
    const [selectedPhoto, setSelectedPhoto] = useState<string>()

    const [cuisineDetails] = useFetch(
        () => (detailsId ? cuisineService.findById(detailsId) : undefined),
        [detailsId]
    )

    const showDetails = (cuisineId: number) => {
        setDetailsId(cuisineId)
        setSelectedPhoto(undefined)
    }

    const closeDetails = () => {
        setDetailsId(undefined)
        setSelectedPhoto(undefined)
    }

    if (!categories || !cuisineResult) {
        return <LoadingWidget />
    }

    const cuisines = cuisineResult.contents
    const filteredCuisines = selectedCategory
        ? cuisines.filter((cuisine) => cuisine.category.id === selectedCategory)
        : cuisines

    const checkout = () => {
        router.push("/cart/checkout")
    }

    return (
        <div className="space-y-4 px-20 pb-8">
            <div className="flex flex-wrap gap-2">
                <Button
                    type="button"
                    variant={selectedCategory === undefined ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(undefined)}
                >
                    All
                </Button>
                {categories.map((category) => (
                    <Button
                        key={category.id}
                        type="button"
                        variant={selectedCategory === category.id ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedCategory(category.id)}
                    >
                        {category.name}
                    </Button>
                ))}
            </div>

            <section className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
                <div>
                    {filteredCuisines.length === 0 ? (
                        <Section>
                            <NoDataWidget message="No cuisines available." />
                        </Section>
                    ) : (
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {filteredCuisines.map((cuisine) => (
                                <CuisineCard
                                    key={cuisine.id}
                                    cuisine={cuisine}
                                    onAdd={() => cart.addItem(cuisine)}
                                    onShowDetails={() => showDetails(cuisine.id)}
                                />
                            ))}
                        </div>
                    )}
                </div>

                <div className="lg:sticky lg:top-4 lg:self-start">
                    <Section
                        className="bg-transparent"
                        title={
                            <span className="flex items-center gap-2">
                                <HugeiconsIcon icon={ShoppingBasket01Icon} size={18} /> Cart
                            </span>
                        }
                    >
                        {cart.items.length === 0 ? (
                            <div className="text-gray-600">
                                Your cart is empty. Add a dish to get started!
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div className="space-y-3">
                                    {cart.items.map((item) => (
                                        <div
                                            key={item.cuisineId}
                                            className="flex items-center gap-2"
                                        >
                                            <div className="flex-1">
                                                <p className="text-sm font-medium">{item.name}</p>
                                                <p className="text-xs text-muted-foreground">
                                                    {item.price} x {item.quantity}
                                                </p>
                                            </div>

                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="icon-sm"
                                                onClick={() =>
                                                    cart.changeQuantity(item.cuisineId, -1)
                                                }
                                            >
                                                <HugeiconsIcon icon={MinusSignIcon} size={14} />
                                            </Button>

                                            <span className="w-4 text-center text-sm">
                                                {item.quantity}
                                            </span>

                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="icon-sm"
                                                onClick={() =>
                                                    cart.changeQuantity(item.cuisineId, 1)
                                                }
                                            >
                                                <HugeiconsIcon icon={PlusSignIcon} size={14} />
                                            </Button>

                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon-sm"
                                                onClick={() => cart.removeItem(item.cuisineId)}
                                            >
                                                <HugeiconsIcon icon={Delete02Icon} size={14} />
                                            </Button>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex items-center justify-between border-t pt-3 font-medium">
                                    <span>Subtotal</span>
                                    <span>{formatCurrency(cart.subtotal)}</span>
                                </div>

                                <Button type="button" className="w-full" onClick={checkout}>
                                    <HugeiconsIcon icon={ShoppingBasket01Icon} /> Checkout
                                </Button>
                            </div>
                        )}
                    </Section>
                </div>
            </section>

            <Dialog open={detailsId !== undefined} onOpenChange={(open) => !open && closeDetails()}>
                <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
                    {!cuisineDetails ? (
                        <LoadingWidget />
                    ) : (
                        <>
                            <DialogHeader>
                                <DialogTitle>{cuisineDetails.name}</DialogTitle>
                                <DialogDescription>
                                    {cuisineDetails.spiceLevel} Spice &middot;{" "}
                                    {formatCurrency(cuisineDetails.price)}
                                </DialogDescription>
                            </DialogHeader>

                            <div className="space-y-4">
                                {(() => {
                                    const coverPhoto =
                                        selectedPhoto ??
                                        cuisineDetails.coverPhoto ??
                                        cuisineDetails.photos?.[0]

                                    return (
                                        coverPhoto && (
                                            <Image
                                                src={coverPhoto}
                                                alt={cuisineDetails.name}
                                                width={800}
                                                height={400}
                                                unoptimized
                                                className="h-64 w-full rounded-lg object-cover"
                                            />
                                        )
                                    )
                                })()}

                                {cuisineDetails.photos && cuisineDetails.photos.length > 0 && (
                                    <div className="flex gap-3 overflow-x-auto pb-1">
                                        {cuisineDetails.photos.map((photo) => {
                                            const isSelected =
                                                (selectedPhoto ?? cuisineDetails.coverPhoto) ===
                                                photo

                                            return (
                                                <button
                                                    key={photo}
                                                    type="button"
                                                    onClick={() => setSelectedPhoto(photo)}
                                                    className={`shrink-0 overflow-hidden rounded-md ${isSelected ? "ring-2 ring-primary" : "ring-1 ring-foreground/10"}`}
                                                >
                                                    <Image
                                                        src={photo}
                                                        alt={cuisineDetails.name}
                                                        width={160}
                                                        height={120}
                                                        unoptimized
                                                        className="h-24 w-32 object-cover"
                                                    />
                                                </button>
                                            )
                                        })}
                                    </div>
                                )}

                                <p className="text-sm text-muted-foreground">
                                    {cuisineDetails.description}
                                </p>

                                {cuisineDetails.ingredients &&
                                    cuisineDetails.ingredients.length > 0 && (
                                        <div className="flex flex-wrap gap-2">
                                            {cuisineDetails.ingredients.map((ingredient, index) => (
                                                <span
                                                    key={index}
                                                    className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-800"
                                                >
                                                    {ingredient.name}: {ingredient.value}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                            </div>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    )
}

function CuisineCard({
    cuisine,
    onAdd,
    onShowDetails,
}: {
    cuisine: CuisineListItem
    onAdd: VoidFunction
    onShowDetails: VoidFunction
}) {
    return (
        <Card className="flex h-full flex-col gap-3">
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

            <CardContent className="flex flex-1 flex-col gap-3">
                <p className="line-clamp-2 flex-1 text-sm text-muted-foreground">
                    {cuisine.description}
                </p>

                <div className="flex gap-2">
                    <Button type="button" size="sm" className="flex-1" onClick={onAdd}>
                        <HugeiconsIcon icon={PlusSignIcon} size={14} /> Add
                    </Button>

                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={onShowDetails}
                    >
                        Show Details <HugeiconsIcon icon={ArrowRight} size={14} />
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
