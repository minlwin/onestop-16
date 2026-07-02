import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export default function Section({title, children} : {title?: string, children : React.ReactNode}) {
    return (
        <Card className="bg-emerald-50">
            {title && 
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                </CardHeader>
            }

            <CardContent>{children}</CardContent>
        </Card>
    )
}