'use client'

import { ArrowRight } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import Link from "next/link"

export default function DetailsLink({url} : {url : string}) {
    return (
        <Link href={url}>
            <HugeiconsIcon icon={ArrowRight} size={20} />
        </Link>
    )
}