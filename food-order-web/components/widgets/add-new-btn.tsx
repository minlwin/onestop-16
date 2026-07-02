'use client'

import { HugeiconsIcon } from "@hugeicons/react"
import { Button } from "../ui/button"
import { Plus } from "@hugeicons/core-free-icons"

export default function AddNewBtn({label, onClick} : {label?: string, onClick: () => void}) {
    return (
        <Button type="button" onClick={onClick} variant={'outline'}>
            <HugeiconsIcon icon={Plus} /> Add {label || 'New'}
        </Button>
    )
}