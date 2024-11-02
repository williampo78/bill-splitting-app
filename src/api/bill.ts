import service from './api'
import type { BillPayload, BillData } from '@/type/bill.ts'
import { AxiosResponse } from 'axios'


export const getBillsAPi = async (data: { groupId: string }) => {
    return service({
        method: 'GET',
        url: `/bills`,
        params: data
    })
}

export const showBillAPi = async (billId: string): Promise<AxiosResponse<BillData>> => {
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