"use client"

import { useEffect, useState } from "react"
import { usePageTitle } from "../../../_states/page-title-provider"
import {
    CuisineForm,
    CuisineSchema,
    MASTER_STATUS,
    SPICE_LEVEL_OPTIONS,
} from "@/lib/model/form/master-data.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import Section from "@/components/widgets/section"
import FormsInput from "@/components/widgets/forms/forms-input"
import FormsSelect, { SelectOption } from "@/components/widgets/forms/forms-select"
import FormsTextarea from "@/components/widgets/forms/forms-textarea"
import FormsSwitch from "@/components/widgets/forms/forms-switch"
import AddNewBtn from "@/components/widgets/add-new-btn"
import { Button } from "@/components/ui/button"
import { HugeiconsIcon } from "@hugeicons/react"
import { Cancel, Delete02Icon, Save } from "@hugeicons/core-free-icons"
import { useRouter, useSearchParams } from "next/navigation"
import * as service from "@/lib/action/shopper/master/cuisine.action"
import * as categoryService from "@/lib/action/shopper/master/category.action"

export default function CuisineEditComponent() {

    const { setTitle } = usePageTitle()
    const form = useForm<CuisineForm>({
        resolver: zodResolver(CuisineSchema),
        defaultValues: {
            category: "",
            name: "",
            description: "",
            spiceLevel: "",
            price: 0,
            status: "",
            isRegular: true,
            ingredients: [],
        },
    })

    const params = useSearchParams()
    const cusineId = params.get("id")
    const router = useRouter()

    useEffect(() => {
        setTitle(cusineId ? "Edit Cuisine" : "Create Cuisine")
        if (cusineId) {
            const load = async () => {
                const result = await service.findForEdit(cusineId)
                const { id, ...editForm } = result
                form.reset({
                    ...editForm,
                    ingredients: editForm.ingredients || []
                })
            }
            load()
        }
    }, [cusineId, form])

    const [categories, setCategories] = useState<SelectOption[]>([])

    useEffect(() => {
        async function load() {
            const list = await categoryService.search({status : "Enable", keyword : ""})
            const options:SelectOption[] = list.map(a => ({
                label: a.name,
                value: a.id.toString()
            }))

            setCategories(options)
        }

        load()
    }, [setCategories])


    const save = async (form: CuisineForm) => {
        const result = await (cusineId ? service.update(cusineId, form) : service.create(form))
        router.replace(`/shopper/cuisine/${result.id}`)
    }

    const fieldArray = useFieldArray({
        control: form.control,
        name: "ingredients",
    })

    const ingredientArray = form.watch("ingredients")

    const addIngredient = () => {
        fieldArray.append({
            name: "",
            value: "",
        })
    }

    const removeIngredient = (index: number) => {
        fieldArray.remove(index)
    }    

    return (
        <form onSubmit={form.handleSubmit(save)} className="space-y-6">
            <Section title="Cuisine Details">
                <div className="grid grid-cols-3 gap-4">
                    <FormsInput
                        control={form.control}
                        path="name"
                        label="Cuisine Name"
                        className="col-span-2"
                    />
                    <FormsSelect
                        control={form.control}
                        path="category"
                        label="Category"
                        options={categories}
                        className="col-start-1"
                    />
                    <FormsSelect
                        control={form.control}
                        path="spiceLevel"
                        label="Spice Level"
                        options={SPICE_LEVEL_OPTIONS}
                    />
                    <FormsInput control={form.control} path="price" label="Price" type="number" />
                    <FormsSelect
                        control={form.control}
                        path="status"
                        label="Status"
                        options={MASTER_STATUS}
                    />
                    <div className="flex items-end pb-2">
                        <FormsSwitch control={form.control} path="isRegular" label="Regular" />
                    </div>
                </div>

                <FormsTextarea
                    control={form.control}
                    path="description"
                    label="Description"
                    className="mt-4"
                />
            </Section>

            {ingredientArray.length > 0 && (
                <Section title="Ingredients">
                    <div className="space-y-4">
                        {fieldArray.fields.map((field, index) => (
                            <div key={field.id} className="flex gap-4 items-end">
                                <FormsInput
                                    control={form.control}
                                    path={`ingredients.${index}.name`}
                                    label={index == 0 ? "Name" : undefined}
                                    placeholder="Enter ingredient name"
                                    className="flex-1"
                                />
                                <FormsInput
                                    control={form.control}
                                    path={`ingredients.${index}.value`}
                                    label={index == 0 ? "Value" : undefined}
                                    placeholder="Enter value"
                                    className="flex-1"
                                />

                                <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    onClick={() => removeIngredient(index)}
                                >
                                    <HugeiconsIcon icon={Delete02Icon} />
                                </Button>
                            </div>
                        ))}
                    </div>
                </Section>
            )}

            <div className="flex gap-2 justify-end">
                <AddNewBtn label="Ingredient" onClick={addIngredient} />

                <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.push("/shopper/cuisine")}
                >
                    <HugeiconsIcon icon={Cancel} /> Cancel
                </Button>

                <Button type="submit">
                    <HugeiconsIcon icon={Save} /> Save
                </Button>
            </div>
        </form>        
    )
}
