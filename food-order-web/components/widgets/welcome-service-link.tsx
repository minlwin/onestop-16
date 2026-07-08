"use client"

import { HugeiconsIcon, IconSvgElement } from "@hugeicons/react"
import { Card, CardContent } from "../ui/card"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"

type WelcomeServiceModel = {
    icon: IconSvgElement
    title: string
    subTitle: string
    route: string
    bgColor: string
    textColor: string
}

export default function WelcomeServiceLink({
    icon,
    title,
    subTitle,
    route,
    bgColor,
    textColor,
}: WelcomeServiceModel) {
    const router = useRouter()

    return (
        <Card
            onClick={() => router.push(route)}
            className={cn(
                bgColor,
                `text-${textColor}`,
                "hover:opacity-70 transition-all duration-200 cursor-pointer"
            )}
        >
            <CardContent className="h-full flex justify-center gap-4">
                <div className="flex items-center justify-center">
                    <HugeiconsIcon icon={icon} color={textColor} size={80} />
                </div>

                <div className="flex flex-col justify-center">
                    <h1 className="text-3xl">{title}</h1>
                    <h3 className="text-lg">{subTitle}</h3>
                </div>
            </CardContent>
        </Card>
    )
}
