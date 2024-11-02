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


export interface BillData {
    _id: string;
    groupId: string;
    item: string;
    price: number;
    paidBy: string;
    sharedBy:
    {
        _id: string;
        userId: string,
        amount: number | string
    }[]
    payingTime:  Date;
}