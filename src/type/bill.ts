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


//API回傳
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
    payingTime: Date;
}


export interface Bill {
    _id: string;
    item: string;
    paidBy: { id: string; name: string };
    sharedBy: { _id: string; userId: string; name: string; amount: number }[];
    groupId: string;
    price: number;
    createdAt: string;
    updatedAt: string;
}