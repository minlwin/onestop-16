import Image from "next/image"
import Section from "@/components/widgets/section"
import DetailsLink from "@/components/widgets/details-link"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"

export type CuisineSummary = {
    id: string
    name: string
    status: string
    spiceLevel: string
    isRegular: boolean
}

export default function CuisineCard({ cuisine }: { cuisine: CuisineSummary }) {
    return (
        <Card>
            <Image
                src="/images/cuisine-placeholder.svg"
                alt={cuisine.name}
                width={400}
                height={240}
                unoptimized
                className="h-60 xl:h-72 w-full object-cover"
            />

            <CardHeader className="flex justify-between">
                <CardTitle>{cuisine.name}</CardTitle>
                <DetailsLink url={`/shopper/cuisine/${cuisine.id}`} label="Show Details" />
            </CardHeader>


            <CardContent>
                <div className="space-y-1 text-sm text-muted-foreground">
                    <p>Status: {cuisine.status}</p>
                    <p>Spice Level: {cuisine.spiceLevel}</p>
                    {cuisine.isRegular && <p>Regular Item</p>}
                </div>
            </CardContent>
        </Card>
    )
}
