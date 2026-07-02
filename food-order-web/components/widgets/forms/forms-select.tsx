import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

type FormsSelectProps<T extends FieldValues> = {
    control: Control<T>
    path: Path<T>
    label?: string
    placeholder?: string
    className?: string
    options: SelectOption[]
}

type SelectOption = {
    value: string
    label: string
}

export default function FormsSelect<T extends FieldValues>({control, path, options, label, placeholder, className} : FormsSelectProps<T>) {
    return (
        <Controller control={control} name={path} render={({field, fieldState}) => 
            <Field className={className}>
                {label &&
                    <FieldLabel>{label}</FieldLabel>
                }
                <NativeSelect {...field} >
                    <NativeSelectOption value="">{placeholder || `Select ${label || 'one'}`}</NativeSelectOption>
                    {options.map(item => 
                        <NativeSelectOption key={item.value} value={item.value}>{item.label}</NativeSelectOption>
                    )}
                </NativeSelect> 

                {fieldState.invalid &&
                    <FieldError errors={[fieldState.error]} />
                }
            </Field>
        } />
    )
}