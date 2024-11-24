export type Contribution = {
    person: string;
    amount: number;
};

export type CustomShare = {
    person: string;
    share: number;
};

export type Expense = {
    title: string;
    contributions: Contribution[];
    customShares?: CustomShare[];
};

export type Transaction = {
    payer: string;
    receiver: string;
    amount: string;
};

export type SplitBillsResult = {
    transactions: Transaction[];
    totalContributions: Record<string, number>;
};
