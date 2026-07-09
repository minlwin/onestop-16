import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export type EditAction = (id: any) => void

export function formatCurrency(amount: number) {
    return amount.toLocaleString("en-US", {
        style: "currency",
        currency: "MMK",
        maximumFractionDigits: 0,
    })
}

export function foodPhotoUrl(seed: number, width: number, height: number, tag = "food") {
    return `https://loremflickr.com/${width}/${height}/${tag}?lock=${seed}`
}
