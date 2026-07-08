import { HugeiconsIcon } from "@hugeicons/react"
import { FileEmpty02Icon } from "@hugeicons/core-free-icons"

export default function NoDataWidget({ message = "No data found." }: { message?: string }) {
    return (
        <div className="flex flex-col items-center justify-center gap-2 py-16 text-muted-foreground">
            <HugeiconsIcon icon={FileEmpty02Icon} size={32} />
            <p className="text-sm">{message}</p>
        </div>
    )
}