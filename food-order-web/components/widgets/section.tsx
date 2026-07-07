import React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export default function Section({title, children, className} : {title?: string, children : React.ReactNode, className?: string}) {
    return (
        <Card className={cn("bg-emerald-50", className)}>
            {title && 
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                </CardHeader>
            }

            <CardContent>{children}</CardContent>
        </Card>
    )
}