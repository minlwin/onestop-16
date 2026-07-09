import React from "react"
import { cn } from "@/lib/utils"
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "../ui/card"

export default function Section({
    title,
    action,
    children,
    className,
}: {
    title?: React.ReactNode
    action?: React.ReactNode
    children: React.ReactNode
    className?: string
}) {
    return (
        <Card className={cn("bg-emerald-50", className)}>
            {title && (
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                    {action && <CardAction>{action}</CardAction>}
                </CardHeader>
            )}

            <CardContent>{children}</CardContent>
        </Card>
    )
}
