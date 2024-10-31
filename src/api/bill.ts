import service from './api'
import type { BillPayload } from '@/type/bill'


export const getBillsAPi = async (data: { groupId: string }) => {
    return service({
        method: 'GET',
        url: `/bills`,
        params: data
    })
}

export const createBillApi = async (data: BillPayload) => {
    return service({
        method: 'POST',
        url: `/bills`,
        data
    })
}