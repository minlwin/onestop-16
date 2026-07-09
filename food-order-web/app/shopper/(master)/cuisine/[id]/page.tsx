"use client"

import { useEffect, useRef } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { usePageTitle } from "@/app/shopper/_states/page-title-provider"
import Section from "@/components/widgets/section"
import { Button } from "@/components/ui/button"
import { HugeiconsIcon } from "@hugeicons/react"
import { Edit02Icon, ImageUploadIcon, StarIcon } from "@hugeicons/core-free-icons"
import { CuisineDetails } from "@/lib/model/output/master-data.model"
import LoadingWidget from "@/components/widgets/loading-widget"
import { useFetch } from "@/hooks/use-fetch"

import * as service from "@/lib/action/shopper/master/cuisine.action"

function StatusBadge({ status }: { status: string }) {
    const isEnabled = status === "Enable"

    return (
        <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${isEnabled ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}
        >
            <span
                className={`h-1.5 w-1.5 rounded-full ${isEnabled ? "bg-emerald-500" : "bg-amber-500"}`}
            />
            {status}
        </span>
    )
}

/**
 * Display Cuisine Details and Photos. Editing happens on the dedicated edit page.
 * @returns
 */
export default function CuisineDetailsPage() {
    const { id } = useParams()
    const router = useRouter()
    const { setTitle } = usePageTitle()

    const [cuisine, setCuisine] = useFetch(() => (id ? service.findById(id) : undefined), [id])
    const fileInputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        setTitle("Cuisine Details")
    }, [])

    if (!cuisine) {
        return <LoadingWidget />
    }

    const photos = cuisine.photos ?? []
    const coverPhoto = cuisine.coverPhoto ?? photos[0]

    const uploadPhotos = async (files: FileList | null) => {
        if (!files || files.length === 0) return

        await service.uploadPhoto(id, files)
        const result = await service.findById(id)
        setCuisine(result)
    }

    const setCoverPhoto = async (photo: string) => {
        await service.updateCoverPhoto(id, photo)
        const result = await service.findById(id)
        setCuisine(result)
    }

    return (
        <section className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-semibold text-primary">{cuisine.name}</h2>
                    <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{cuisine.category.name}</span>
                        <span>&middot;</span>
                        <StatusBadge status={cuisine.status} />
                        {cuisine.isRegular && (
                            <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                                Regular
                            </span>
                        )}
                    </div>
                </div>

                <Button type="button" onClick={() => router.push(`/shopper/cuisine/edit?id=${id}`)}>
                    <HugeiconsIcon icon={Edit02Icon} /> Edit
                </Button>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
                <Section title="Photos" className="lg:col-span-2">
                    <div className="space-y-4">
                        <div className="overflow-hidden rounded-lg">
                            {coverPhoto ? (
                                <Image
                                    src={coverPhoto}
                                    alt={cuisine.name}
                                    width={600}
                                    height={360}
                                    unoptimized
                                    className="h-56 w-full object-cover"
                                />
                            ) : (
                                <div className="flex h-56 items-center justify-center rounded-lg border border-dashed text-sm text-muted-foreground">
                                    No photo uploaded yet
                                </div>
                            )}
                        </div>

                        {photos.length > 0 && (
                            <div className="flex gap-3 overflow-x-auto pb-1">
                                {photos.map((photo) => (
                                    <div
                                        key={photo}
                                        onClick={() => setCoverPhoto(photo)}
                                        className={`group relative h-18 w-24 shrink-0 cursor-pointer overflow-hidden rounded-md ${photo === coverPhoto ? "ring-2 ring-primary" : "ring-1 ring-foreground/10"}`}
                                    >
                                        <Image
                                            src={photo}
                                            alt={cuisine.name}
                                            width={96}
                                            height={72}
                                            unoptimized
                                            className="h-full w-full object-cover"
                                        />

                                        {photo !== coverPhoto && (
                                            <span className="absolute inset-0 hidden items-center justify-center bg-black/40 group-hover:flex">
                                                <HugeiconsIcon
                                                    icon={StarIcon}
                                                    size={16}
                                                    color="#fff"
                                                />
                                            </span>
                                        )}

                                        {photo === coverPhoto && (
                                            <span className="absolute inset-x-0 bottom-0 bg-primary py-0.5 text-center text-[10px] text-primary-foreground">
                                                Cover
                                            </span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}

                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            multiple
                            hidden
                            onChange={(e) => {
                                uploadPhotos(e.target.files)
                                e.target.value = ""
                            }}
                        />

                        <Button
                            type="button"
                            variant="outline"
                            className="w-full"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <HugeiconsIcon icon={ImageUploadIcon} /> Upload Photos
                        </Button>
                    </div>
                </Section>

                <div className="lg:col-span-3 space-y-4">
                    <Section title="Details">
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                                <div>
                                    <p className="text-sm text-muted-foreground">Spice Level</p>
                                    <p className="font-medium">{cuisine.spiceLevel}</p>
                                </div>

                                <div>
                                    <p className="text-sm text-muted-foreground">Price</p>
                                    <p className="font-medium">{cuisine.price}</p>
                                </div>

                                <div>
                                    <p className="text-sm text-muted-foreground">Created At</p>
                                    <p className="font-medium">{cuisine.createdAt}</p>
                                </div>

                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        Status Changed At
                                    </p>
                                    <p className="font-medium">{cuisine.modifiedAt}</p>
                                </div>
                            </div>

                            <div>
                                <p className="text-sm text-muted-foreground">Description</p>
                                <p className="font-medium">{cuisine.description}</p>
                            </div>
                        </div>
                    </Section>

                    {(cuisine.ingredients?.length ?? 0) > 0 && (
                        <Section title="Ingredients">
                            <div className="flex flex-wrap gap-2">
                                {cuisine.ingredients!.map((ingredient, index) => (
                                    <span
                                        key={index}
                                        className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-800"
                                    >
                                        {ingredient.name}: {ingredient.value}
                                    </span>
                                ))}
                            </div>
                        </Section>
                    )}
                </div>
            </div>
        </section>
    )
}
