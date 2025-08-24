import axios from "axios";
import { mainAxios } from "./main-axios";

export async function getAllOrders({ from, to }: { from: string; to: string }): Promise<Array<any>> {
    const result = await mainAxios.get(`/orders`, {
        params: {},
    });
    return result.data.data as Array<any>;
}
