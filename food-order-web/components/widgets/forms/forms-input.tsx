import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { HTMLInputTypeAttribute } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

type FormsInputProps<T extends FieldValues> = {
    control: Control<T>
    path: Path<T>
    label?: string
    type?: HTMLInputTypeAttribute
    placeholder?: string
    className?: string
}

export default function FormsInput<T extends FieldValues>({control, path, label, type, placeholder, className} : FormsInputProps<T>) {
    return (
        <Controller control={control} name={path} render={({field, fieldState}) => 
            <Field className={className}>
                {label &&
                    <FieldLabel>{label}</FieldLabel>
                }
                <Input {...field} type={type} placeholder={placeholder || `Enter ${label || 'value'}`} />

                {fieldState.invalid &&
                    <FieldError errors={[fieldState.error]} />
                }
            </Field>
        } />
    )
}