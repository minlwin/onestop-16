"use client"

import { PencilEdit01FreeIcons } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

export default function EditLink({ onClick }: { onClick: VoidFunction }) {
    return (
        <span className="inline-block cursor-pointer px-2" onClick={onClick}>
            <HugeiconsIcon icon={PencilEdit01FreeIcons} size={20} />
        </span>
    )
}
