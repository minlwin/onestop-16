import { ChefHatFreeIcons } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import Link from "next/link"

export default function PageTitle({ title }: { title: string }) {
    return (
        <header className="px-20 py-8 flex gap-x-6">
            <div className="flex items-center justify-center">
                <HugeiconsIcon icon={ChefHatFreeIcons} size={60} />
            </div>
            <div>
                <Link href={"/"} className="uppercase text-4xl">
                    Food Order
                </Link>
                <h3 className="text-xl">{title}</h3>
            </div>
        </header>
    )
}
