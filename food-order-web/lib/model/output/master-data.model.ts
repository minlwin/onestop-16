import { Status } from ".."
import { CuisineForm } from "../form/master-data.schema"

export interface IdAndName {
    id: number
    name: string
}

export interface StatusInfo {
    status: Status
    createdAt: string
    modifiedAt: string
}

export type BaseModel = IdAndName & StatusInfo

export type CategoryListItem = BaseModel & {
    cusines: number
} 

export type CategoryDetails = BaseModel & {
    cusines : CuisineListItem []
}

export type CuisineListItem = BaseModel & {
    category: IdAndName
    spiceLevel: string
    isRegular: boolean
} 

export type CuisineDetails = CuisineListItem & {
    description: string
    coverPhoto?: string
    photos?: string[]
    ingredients?: Ingredient[]
}

export type CuisineForEdit = {
    id: number 
} & CuisineForm

export type Ingredient = {
    name: string
    value: string
}

export type DeliTimeListItem = BaseModel & {
    timeFrom: string
    timeTo: string
}

export type PaymentInfoListItem = BaseModel & {
    provider: string
    accountNo: string
    accountName: string
}