import { HugeiconsIcon } from "@hugeicons/react"
import { Loading03Icon } from "@hugeicons/core-free-icons"

export default function LoadingWidget() {
    return (
        <div className="flex flex-col items-center justify-center gap-2 py-16 text-muted-foreground">
            <HugeiconsIcon icon={Loading03Icon} size={32} className="animate-spin text-primary" />
            <p className="text-sm">Loading...</p>
        </div>
    )
}