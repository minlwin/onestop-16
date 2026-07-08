"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { usePageTitle } from "../../../_states/page-title-provider"
import Section from "@/components/widgets/section"
import FormsInput from "@/components/widgets/forms/forms-input"
import FormsSelect from "@/components/widgets/forms/forms-select"
import CuisineCard from "@/components/widgets/cuisine-card"
import { Button } from "@/components/ui/button"
import { HugeiconsIcon } from "@hugeicons/react"
import { Cancel, Edit02Icon, Save } from "@hugeicons/core-free-icons"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { CategoryForm, CategorySchema, MASTER_STATUS } from "@/lib/model/form/master-data.schema"
import { CategoryDetails } from "@/lib/model/output/master-data.model"
import * as service from "@/lib/action/master/category.action"
import LoadingWidget from "@/components/widgets/loading-widget"
import { useFetch } from "@/hooks/use-fetch"

/**
 * Display Category Name and Cuisines Belong to This Category
 * @returns
 */
export default function CategoryDetailsPage() {
    const { setTitle } = usePageTitle()
    useEffect(() => setTitle("Category Details"), [])

    const { id } = useParams()
    const [category, setCategory] = useFetch(() => (id ? service.findById(id) : undefined), [id])

    const [isEditing, setEditing] = useState(false)
    const form = useForm<CategoryForm>({
        resolver: zodResolver(CategorySchema),
        defaultValues: {
            name: category?.name ?? "",
            status: category?.status ?? "",
        },
    })

    const startEdit = () => {
        form.reset()
        setEditing(true)
    }

    const save = async (values: CategoryForm) => {
        const updateResult = await service.update(id, values)
        const findResult = await service.findById(updateResult.id)
        setCategory(findResult)
        setEditing(false)
    }

    if (!category) {
        return <LoadingWidget />
    }

    return (
        <section className="space-y-6">
            <Section title="Category Details">
                {isEditing ? (
                    <form onSubmit={form.handleSubmit(save)} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <FormsInput control={form.control} path="name" label="Category Name" />
                            <FormsSelect
                                control={form.control}
                                path="status"
                                label="Status"
                                options={MASTER_STATUS}
                            />
                        </div>

                        <div className="flex justify-end gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setEditing(false)}
                            >
                                <HugeiconsIcon icon={Cancel} /> Cancel
                            </Button>

                            <Button type="submit">
                                <HugeiconsIcon icon={Save} /> Save
                            </Button>
                        </div>
                    </form>
                ) : (
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                            <div>
                                <p className="text-sm text-muted-foreground">Category Name</p>
                                <p className="font-medium">{category.name}</p>
                            </div>

                            <div>
                                <p className="text-sm text-muted-foreground">Status</p>
                                <p className="font-medium">{category.status}</p>
                            </div>

                            <div>
                                <p className="text-sm text-muted-foreground">Created At</p>
                                <p className="font-medium">{category.createdAt}</p>
                            </div>

                            <div>
                                <p className="text-sm text-muted-foreground">Status Changed At</p>
                                <p className="font-medium">{category.modifiedAt}</p>
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <Button type="button" variant="outline" onClick={startEdit}>
                                <HugeiconsIcon icon={Edit02Icon} /> Edit
                            </Button>
                        </div>
                    </div>
                )}
            </Section>

            <section className="space-y-4">
                <h3 className="text-xl font-semibold text-primary">Cuisines</h3>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {category.cusines.map((cuisine) => (
                        <CuisineCard key={cuisine.id} cuisine={cuisine} />
                    ))}
                </div>
            </section>
        </section>
    )
}
