import type { Metadata } from "next"
import { Geist, Geist_Mono, Roboto } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"
import LoginUserProvider from "@/lib/state/login-user.provider"
import { Toaster } from "sonner"

const roboto = Roboto({ subsets: ["latin"], variable: "--font-sans" })

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
})

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
})

export const metadata: Metadata = {
    title: "Foods Order | Welcome",
    description: "Welcome to Foods Order Application.",
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html
            lang="en"
            className={cn(
                "h-full",
                "antialiased",
                geistSans.variable,
                geistMono.variable,
                "font-sans",
                roboto.variable
            )}
        >
            <LoginUserProvider>
                <body className="min-h-full flex flex-col">
                    {children}
                    <Toaster position="top-right" />
                </body>
            </LoginUserProvider>
        </html>
    )
}
