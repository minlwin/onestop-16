import { Button } from "@/components/ui/button";
import { House, ShoppingBag02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import React from "react";

export default function AuthLayout({children} : {children : React.ReactNode}) {

    return (
        <div className="h-screen grid grid-cols-2">

            <header className="bg-orange-400 flex justify-center items-center">
                <div className="flex flex-col items-center space-y-6">
                    <HugeiconsIcon icon={ShoppingBag02Icon} size={160} color="white" />

                    <div className="text-center uppercase space-y-2">
                        <h1 className="text-5xl text-white font-bold">Foods Order</h1>

                        <Button asChild variant={"outline"}>
                            <Link href={'/'}>
                                <HugeiconsIcon icon={House} />
                                Go Home
                            </Link>
                        </Button>
                    </div>
                </div>
            </header>

            <section className="flex items-center justify-center">
                {children}
            </section>
        </div>
    )
}