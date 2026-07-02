'use client'

import { ArrowRight } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import Link from "next/link"
import { Button } from "../ui/button"

export default function DetailsLink({url} : {url : string}) {
    return (
        <Button asChild variant={'ghost'}>
            <Link href={url}>
                <HugeiconsIcon icon={ArrowRight} />
            </Link>
        </Button>
    )
}