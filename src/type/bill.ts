export interface BillPayload {
    item: string,
    groupId: string,
    price: number,
    paidBy: string,
    payingTime: string | Date,
    sharedBy:
    {
        userId: string,
        amount: number
    }[]
}