import { HugeiconsIcon, IconSvgElement } from "@hugeicons/react";

export default function AuthTitle({title, icon} : {title: string, icon : IconSvgElement}) {
    return (
        <h1 className="flex gap-2 items-center text-2xl mb-6">
            <HugeiconsIcon icon={icon} />
            {title}
        </h1>
    )
}