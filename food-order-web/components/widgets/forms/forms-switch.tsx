import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Switch } from "@/components/ui/switch"
import { Control, Controller, FieldValues, Path } from "react-hook-form"

type FormsSwitchProps<T extends FieldValues> = {
    control: Control<T>
    path: Path<T>
    label?: string
    className?: string
}

export default function FormsSwitch<T extends FieldValues>({
    control,
    path,
    label,
    className,
}: FormsSwitchProps<T>) {
    return (
        <Controller
            control={control}
            name={path}
            render={({ field, fieldState }) => (
                <Field className={className} orientation="horizontal">
                    {label && <FieldLabel>{label}</FieldLabel>}
                    <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        ref={field.ref}
                    />

                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
            )}
        />
    )
}
