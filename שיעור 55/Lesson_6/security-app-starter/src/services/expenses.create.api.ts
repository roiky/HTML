import { mainAxios } from "./main-axios";

export type CreateExpenseType = {
    amount: number;
    category: string;
    date: string;
    description?: string;
};

export async function createExpenseApi(payload: CreateExpenseType) {
    const res = await mainAxios.post("/expenses/expenses", payload);
    return res.data as { message: string; id: number };
}
