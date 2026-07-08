"use client"

import { ArrowRight } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import Link from "next/link"

export default function DetailsLink({ url, label }: { url: string; label?: string }) {
    return (
        <Link href={url} className="flex gap-1 justify-center">
            {label && <span>{label}</span>}
            <HugeiconsIcon icon={ArrowRight} size={20} />
        </Link>
    )
}
