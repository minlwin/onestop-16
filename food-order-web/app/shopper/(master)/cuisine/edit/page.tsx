'use client'

import { useEffect, useState } from "react"
import { usePageTitle } from "../../../_states/page-title-provider"
import { CATEGORY_OPTIONS, CuisineForm, CuisineSchema, MASTER_STATUS, SPICE_LEVEL_OPTIONS } from "@/lib/model/form/master-data.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import Section from "@/components/widgets/section"
import FormsInput from "@/components/widgets/forms/forms-input"
import FormsSelect from "@/components/widgets/forms/forms-select"
import FormsTextarea from "@/components/widgets/forms/forms-textarea"
import FormsSwitch from "@/components/widgets/forms/forms-switch"
import AddNewBtn from "@/components/widgets/add-new-btn"
import { Button } from "@/components/ui/button"
import { HugeiconsIcon } from "@hugeicons/react"
import { Cancel, Delete02Icon, Save } from "@hugeicons/core-free-icons"
import { useRouter, useSearchParams } from "next/navigation"
import * as service from "@/lib/action/master/cuisine.action"

export default function CuisineEditPage() {

    const {setTitle} = usePageTitle()
    const [form, setForm] = useState<CuisineForm>({
        category: '',
        name: '',
        description: '',
        spiceLevel: '',
        status: '',
        isRegular: true,
        ingredients: []
    })

    const params = useSearchParams()
    const cusineId = params.get("id")
    const router = useRouter()

    useEffect(() => {
        setTitle("Cuisine Details")
        if(cusineId) {
            const load = async () => {
                const result = await service.findForEdit(cusineId)
                const {id, ...editForm} = result
                setForm(editForm)
            }
            load()
        }
    }, [cusineId])

    const save = async (form: CuisineForm) => {
        const result = await (cusineId ? service.update(cusineId, form) : service.create(form))
        router.replace(`/shopper/cuisine/${result.id}`)
    }

    return (
        <CuisineEditForm formData={form} onSave={save} />
    )
}

function CuisineEditForm({formData, onSave} : {
    formData: CuisineForm, 
    onSave : (form : CuisineForm) => void
}) {

    const router = useRouter()
    const form = useForm<CuisineForm>({
        resolver: zodResolver(CuisineSchema),
        defaultValues: formData
    })

    const fieldArray = useFieldArray({
        control: form.control,
        name: "ingredients"
    })

    const ingredientArray = form.watch('ingredients')

    const addIngredient = () => {
        fieldArray.append({
            name: "",
            value: ""
        })
    }

    const removeIngredient = (index: number) => {
        fieldArray.remove(index)
    }

    return (
        <form onSubmit={form.handleSubmit(onSave)} className="space-y-6">
            <Section title="Cuisine Details">
                <div className="grid grid-cols-3 gap-4">
                    <FormsInput control={form.control} path="name" label="Cuisine Name" className="col-span-2" />
                    <FormsSelect control={form.control} path="category" label="Category" options={CATEGORY_OPTIONS} className="col-start-1" />
                    <FormsSelect control={form.control} path="spiceLevel" label="Spice Level" options={SPICE_LEVEL_OPTIONS} />
                    <FormsSelect control={form.control} path="status" label="Status" options={MASTER_STATUS} />
                    <FormsSwitch control={form.control} path="isRegular" label="Regular" />
                </div>

                <FormsTextarea control={form.control} path="description" label="Description" className="mt-4" />
            </Section>

            {ingredientArray.length > 0 && 
                <Section title="Ingredients">
                    <div className="space-y-4">
                        {fieldArray.fields.map((field, index) => (
                            <div key={field.id} className="flex gap-4 items-end">
                                <FormsInput control={form.control} path={`ingredients.${index}.name`} label={index == 0 ? 'Name' : undefined} placeholder="Enter ingredient name" className="flex-1" />
                                <FormsInput control={form.control} path={`ingredients.${index}.value`} label={index == 0 ? 'Value' : undefined} placeholder="Enter value" className="flex-1" />

                                <Button type="button" variant="outline" size="icon" onClick={() => removeIngredient(index)}>
                                    <HugeiconsIcon icon={Delete02Icon} />
                                </Button>
                            </div>
                        ))}

                    </div>
                </Section>
            }

            <div className="flex gap-2 justify-end">
                <AddNewBtn label="Ingredient" onClick={addIngredient} />

                <Button type="button" variant="outline" onClick={() => router.push('/shopper/cuisine')}>
                    <HugeiconsIcon icon={Cancel} /> Cancel
                </Button>

                <Button type="submit">
                    <HugeiconsIcon icon={Save} /> Save
                </Button>
            </div>
        </form>
    )    
}
