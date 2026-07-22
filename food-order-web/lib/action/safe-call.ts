import { toast, ToastT } from "sonner"
import { ClientError } from "../model"

export async function safeCall(action : () => Promise<any>) {

    try {
        await action()
    } catch(e : any) {
        const error:ClientError = JSON.parse(e.message)
        const message: Partial<ToastT> = {
            description : error.messages
        }
        switch(error.status) {
        case 400:
            message.type = "info"
            break
        case 401:
        case 403:
            message.type = "warning"
            break
        case 500:
            message.type = "error"
            break
        }

        toast("Application Message", message)
    }
}