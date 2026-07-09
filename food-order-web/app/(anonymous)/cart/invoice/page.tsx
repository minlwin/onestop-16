"use client"

import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowRight, ShoppingBasket01Icon } from "@hugeicons/core-free-icons"
import { Button } from "@/components/ui/button"
import Section from "@/components/widgets/section"
import InvoiceResultWidget from "@/components/widgets/invoice-result-widget"

export default function InvoiceResultPage() {
    const router = useRouter()
    const params = useSearchParams()
    const id = params.get("id")

    if (!id) {
        return (
            <div className="space-y-4 px-20 pb-8">
                <Section>
                    <p className="text-sm text-muted-foreground">No invoice specified.</p>
                </Section>
            </div>
        )
    }

    return (
        <div className="space-y-6 px-20 pb-8">
            <InvoiceResultWidget
                id={id}
                actions={
                    <>
                        <Button type="button" variant="outline" asChild>
                            <Link href={`/check?id=${id}`}>
                                Track this order <HugeiconsIcon icon={ArrowRight} size={14} />
                            </Link>
                        </Button>

                        <Button type="button" onClick={() => router.push("/cart")}>
                            <HugeiconsIcon icon={ShoppingBasket01Icon} /> Order Again
                        </Button>
                    </>
                }
            />
        </div>
    )
}
