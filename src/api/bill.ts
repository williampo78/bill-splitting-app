import service from './api'
import type { BillPayload } from '@/type/bill.ts'


export const getBillsAPi = async (data: { groupId: string }) => {
    return service({
        method: 'GET',
        url: `/bills`,
        params: data
    })
}

export const showBillAPi = async (billId: string) => {
    return service({
        method: 'GET',
        url: `/bills/${billId}`,
    })
}

export const createBillApi = async (data: BillPayload) => {
    return service({
        method: 'POST',
        url: `/bills`,
        data
    })
}