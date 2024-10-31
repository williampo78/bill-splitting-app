export interface BillPayload {
    item: string,
    groupId: string,
    price: number | string,
    paidBy: string,
    payingTime: string | Date,
    sharedBy:
    {
        userId: string,
        amount: number | string
    }[]
}