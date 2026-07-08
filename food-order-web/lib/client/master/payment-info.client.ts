import 'server-only'

import { ModificationResult } from '@/lib/model';
import { PaymentInfoForm, PaymentInfoSearchForm } from '@/lib/model/form/master-data.schema';
import { PaymentInfoListItem } from '@/lib/model/output/master-data.model';

export async function search(form: PaymentInfoSearchForm) : Promise<PaymentInfoListItem[]> {
    return []
}

export async function findById(id: any) : Promise<PaymentInfoForm & {id : number}> {
    return {
        id: id,
        bank: "KBZ Pay",
        accountNo: "09782003098",
        accountName: "U Zaw Min Lwin",
        status: "Enable"
    }
}

export async function create(form: PaymentInfoForm) : Promise<ModificationResult<number>> {
    return {
        id: 1
    }
}

export async function update(id:any, form: PaymentInfoForm) : Promise<ModificationResult<number>> {
    return {
        id: 1
    }
}
