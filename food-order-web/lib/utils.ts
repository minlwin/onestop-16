import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { UserInfo } from "./model/output/security.model"

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

export function homeForUser(user: UserInfo) {
    const roles = user.roles;

    if(roles.length == 2 || roles[0] === 'Customer') {
        return "/customer"
    }

    return "/shopper"
}
