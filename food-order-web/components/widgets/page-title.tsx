import { ChefHatFreeIcons } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import Link from "next/link"
import { ReactNode } from "react"

export default function PageTitle({ title, action }: { title: string; action?: ReactNode }) {
    return (
        <header className="px-20 py-8 flex items-center justify-between gap-x-6">
            <div className="flex gap-x-6">
                <div className="flex items-center justify-center">
                    <HugeiconsIcon icon={ChefHatFreeIcons} size={60} />
                </div>
                <div>
                    <Link href={"/"} className="uppercase text-4xl">
                        Food Order
                    </Link>
                    <h3 className="text-xl">{title}</h3>
                </div>
            </div>

            {action}
        </header>
    )
}
