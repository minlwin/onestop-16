import "server-only"

import { PaymentInfoSearchForm } from "@/lib/model/form/master-data.schema"
import { PaymentInfoListItem } from "@/lib/model/output/master-data.model"
import { MOCK_PAYMENT_INFOS } from "../shopper/master/payment-info.client"

export async function search(form: PaymentInfoSearchForm): Promise<PaymentInfoListItem[]> {
    return MOCK_PAYMENT_INFOS.filter((data) => {
        if (form.status && data.status != form.status) {
            return false
        }

        if (
            form.bank &&
            !data.provider.toLocaleLowerCase().includes(form.bank.toLocaleLowerCase())
        ) {
            return false
        }

        if (form.account && !data.accountNo.includes(form.account)) {
            return false
        }

        return true
    })
}
