import axios from "axios";
import { mainAxios } from "./main-axios";

export async function getExpensesCategories(): Promise<Array<any>> {
    const result = await mainAxios.get(`/expenses/categories`);
    return (result.data as any).data as Array<any>;
}
