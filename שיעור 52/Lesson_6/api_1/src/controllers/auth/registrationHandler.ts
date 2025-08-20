import { User, UserRegister, users } from ".";
import getConnection from "../../db";
// INSERT INTO`northwind`.`users`(`email`, `password`, `age`, `address`) VALUES('nerya@gmail.com', 'test1122', '25', 'eilat');
export async function register(user: UserRegister): Promise<number> {
    const params = [user.userName, user.password, user.age, user.phone];
    const result = await (await getConnection()).execute(getRegisterQuery(), params);
    console.log(result);
    // @ts-ignore
    if (result[0].insertId) return result[0].insertId;
    else return 0;
}

const getRegisterQuery = () => {
    return `INSERT INTO northwind.users (email, password, age, address) VALUES (?,?,?,?);`;
};
