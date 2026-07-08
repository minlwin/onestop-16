import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"
import { Control, Controller, FieldValues, Path } from "react-hook-form"

type FormsTextareaProps<T extends FieldValues> = {
    control: Control<T>
    path: Path<T>
    label?: string
    placeholder?: string
    className?: string
}

export default function FormsTextarea<T extends FieldValues>({
    control,
    path,
    label,
    placeholder,
    className,
}: FormsTextareaProps<T>) {
    return (
        <Controller
            control={control}
            name={path}
            render={({ field, fieldState }) => (
                <Field className={className}>
                    {label && <FieldLabel>{label}</FieldLabel>}
                    <Textarea {...field} placeholder={placeholder || `Enter ${label || "value"}`} />

                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
            )}
        />
    )
}
